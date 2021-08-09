const PARAM_FORMAT_REGEX = /{(param\d+)(?::([FPI\d]+))}/g

enum Rounding {
  P = "P", // percentage
  F1P = "F1P", // percentage as float with 1 decimal place
  F1 = "F1", // float with 1 decimal place
  I = "I", // integer
}

const ROUNDING_FORMATTER: Record<Rounding, (value: number) => string> = {
  [Rounding.P]: (value: number) => `${Math.round(value * 100)}%`,
  [Rounding.F1P]: (value: number) => `${(value * 100).toFixed(1)}%`,
  [Rounding.F1]: (value: number) => value.toFixed(1),
  [Rounding.I]: (value: number) => Math.round(value).toString(),
}

export const formatParams = (
  format: string,
  values: Record<string, number>,
): string => {
  const matches = [...format.matchAll(PARAM_FORMAT_REGEX)]
  const output: string[] = []

  if (!matches.length) {
    console.error(`Could not run PARAM_FORMAT_REGEX match on input "${format}"`)
    return "UNKNOWN"
  }

  // Check beginning
  const firstMatch = matches[0]

  // Push "prefix" before first match if it exists
  const firstIndex = firstMatch.index ?? 0
  if (firstIndex > 0) {
    output.push(format.substring(0, firstIndex))
  }

  // Begin iterating over all matches
  let nextIndex = firstIndex

  for (const match of matches) {
    const startIndex = match.index ?? 0
    const endIndex = startIndex + match[0].length

    // Push middle "text"
    if (nextIndex < startIndex) {
      output.push(format.substring(nextIndex, startIndex))
    }

    const [, paramId, roundFormat] = match
    const value: number = values[paramId]
    const formatted: string = ROUNDING_FORMATTER[roundFormat as Rounding](value)
    output.push(formatted)

    nextIndex = endIndex
  }

  // Finally push "suffix" after last match if it exists
  if (nextIndex > 0 && nextIndex < format.length) {
    output.push(format.substring(nextIndex, format.length))
  }

  console.log(format, values, output.join(""))

  return output.join("")
}
