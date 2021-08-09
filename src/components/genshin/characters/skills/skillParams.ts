const PARAM_FORMAT_REGEX = /{(param\d+)(?::([FPI\d]+))}/g

const formatValue = (value: number, roundingFormat: string): string => {
  if (roundingFormat === "I") return Math.round(value).toString()

  const isPercentage = roundingFormat.endsWith("P")
  const numDecimals = roundingFormat.length > 1 ? parseInt(roundingFormat[1]) : 0

  const outNum: number = isPercentage ? value * 100 : value
  const outString: string =
    numDecimals > 0 ? outNum.toFixed(numDecimals) : Math.round(outNum).toString()
  return isPercentage ? outString + "%" : outString
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
    const [full, paramId, roundingFormat] = match
    const startIndex = match.index ?? 0
    const endIndex = startIndex + full.length

    // Push middle "text"
    if (nextIndex < startIndex) {
      output.push(format.substring(nextIndex, startIndex))
    }

    const value: number = values[paramId]
    const formatted: string = formatValue(value, roundingFormat)
    output.push(formatted)

    nextIndex = endIndex
  }

  // Finally push "suffix" after last match if it exists
  if (nextIndex > 0 && nextIndex < format.length) {
    output.push(format.substring(nextIndex, format.length))
  }

  return output.join("")
}
