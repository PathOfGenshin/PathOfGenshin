import { identity } from "lodash"

import { defaultStringProcessor, formatter, stringReducer } from "./regexBasedFormatter"

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

const paramsProcessor = (
  match: RegExpMatchArray,
  _?: Record<string, unknown> | null,
  optionalMappings?: Record<string, number>,
): string => {
  const [full, paramId, roundingFormat] = match

  if (!optionalMappings) {
    console.log(`Failed to receive values dictionary for params formatting: ${full}`)
    return "ERR"
  }

  const value: number = optionalMappings[paramId] as number
  const formatted: string = formatValue(value, roundingFormat)
  return formatted
}

export const formatParamsText: (
  text: string,
  optionalMappings?: Record<string, number>,
) => string = formatter<null, string, string, number>(
  PARAM_FORMAT_REGEX,
  identity,
  defaultStringProcessor,
  paramsProcessor,
  stringReducer,
)
