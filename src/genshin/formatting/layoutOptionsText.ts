import { identity } from "lodash"

import { DeviceLayout } from "../device/layout"
import { defaultStringProcessor, formatter, stringReducer } from "./regexBasedFormatter"

export const LAYOUT_OPTIONS_PREFIX = "#"

const LAYOUT_DEVICE_REGEX =
  /{LAYOUT_([A-Z]+)#(.*?)}{LAYOUT_([A-Z]+)#(.*?)}{LAYOUT_([A-Z]+)#(.*?)}/g

export const layoutOptionProcessor = (match: RegExpMatchArray): string => {
  const deviceLayoutPCIndex = match.findIndex(
    (value: string) => value === DeviceLayout.PC,
  )
  return match[deviceLayoutPCIndex + 1]
}

export const formatLayoutOptionsText: (text: string) => string = formatter<
  null,
  string,
  string
>(
  LAYOUT_DEVICE_REGEX,
  identity,
  defaultStringProcessor,
  layoutOptionProcessor,
  stringReducer,
  LAYOUT_OPTIONS_PREFIX,
)
