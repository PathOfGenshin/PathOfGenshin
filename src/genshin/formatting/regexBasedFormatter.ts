export const defaultStringProcessor = (
  text: string,
  startIndex: number,
  endIndex: number,
): string => text.substring(startIndex, endIndex)

export const stringReducer = (outputs: string[]): string => outputs.join("")

const getPrefixLength = (
  text: string,
  forceRun: boolean | undefined,
  prefix: string | undefined,
): number => {
  if (!prefix) return 0

  if (forceRun) {
    return text.startsWith(prefix) ? prefix.length : 0
  }
  return prefix.length
}

export function formatter<
  State extends unknown | null = null,
  ProcessOutput = string,
  FinalOutput = string,
  AuxiliaryMap = unknown,
>(
  regex: RegExp,
  defaultReturn: (text: string) => FinalOutput,
  textProcessor: (
    text: string,
    startIndex: number,
    endIndex: number,
    localState?: State,
  ) => ProcessOutput,
  matchProcessor: (
    match: RegExpMatchArray,
    localState?: State,
    optionalMappings?: Record<string, AuxiliaryMap>,
  ) => ProcessOutput | null,
  reducer: (outputs: ProcessOutput[]) => FinalOutput,
  prefixToIgnore?: string,
  localState?: State,
  forceRun?: boolean,
): (text: string, optionalMappings?: Record<string, AuxiliaryMap>) => FinalOutput {
  return (
    text: string,
    optionalMappings?: Record<string, AuxiliaryMap>,
  ): FinalOutput => {
    if (prefixToIgnore && !text.startsWith(prefixToIgnore) && !forceRun) {
      return defaultReturn(text)
    }

    const prefixLength: number = getPrefixLength(text, forceRun, prefixToIgnore)

    const matches = [...text.matchAll(regex)]
    if (!matches.length) {
      return defaultReturn(text)
    }

    const output: ProcessOutput[] = []

    // Include all text from before the first match
    const firstMatch = matches[0]
    const firstIndex = firstMatch.index ?? 0
    if (firstIndex > prefixLength) {
      output.push(textProcessor(text, prefixLength, firstIndex, localState))
    }

    // Begin iterating over all matches
    let nextIndex = firstIndex

    for (const match of matches) {
      const startIndex: number = match.index ?? 0
      const endIndex: number = startIndex + match[0].length

      // Include text from inbetween current match and previous match, if any
      if (nextIndex < startIndex) {
        output.push(textProcessor(text, nextIndex, startIndex, localState))
      }

      const processedMatch: ProcessOutput | null = matchProcessor(
        match,
        localState,
        optionalMappings,
      )
      if (processedMatch) {
        output.push(processedMatch)
      }

      nextIndex = endIndex
    }

    // Include remaining text from after the last match, if any
    if (nextIndex > 0 && nextIndex < text.length) {
      output.push(textProcessor(text, nextIndex, text.length, localState))
    }

    return reducer(output)
  }
}
