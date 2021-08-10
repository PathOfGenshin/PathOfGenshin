import { layoutOptionProcessor, LAYOUT_OPTIONS_PREFIX } from "./layoutOptionsText"
import { formatter } from "./regexBasedFormatter"

const FLAVOURED_TEXT_REGEX =
  /<color=#([0-9A-F]+)>|<\/color>|\n|<\/?i>|·|{LAYOUT_([A-Z]+)#(.*?)}{LAYOUT_([A-Z]+)#(.*?)}{LAYOUT_([A-Z]+)#(.*?)}/g

export enum FlavouredTextType {
  TEXT,
  LIST_ENTRY,
  NEW_LINE,
}

export interface FlavouredText {
  text: string
  type: FlavouredTextType
  colour?: string
  italicized?: boolean
}

interface FlavouredParserState {
  colour: string | undefined
  italicized: boolean
}

enum State {
  TEXT,
  NEW_LINE,
  COLOUR_START,
  COLOUR_END,
  ITALICIZE_START,
  ITALICIZE_END,
  LIST_ENTRY,
  LAYOUT_OPTIONS,
}

const STATE_MAPPING: Record<string, State> = {
  "\n": State.NEW_LINE,
  "<i>": State.ITALICIZE_START,
  "</i>": State.ITALICIZE_END,
  "</color>": State.COLOUR_END,
  "·": State.LIST_ENTRY,
}

const getMatchState = (match: RegExpMatchArray): State => {
  if (match[0].startsWith("<color=")) return State.COLOUR_START
  if (match[0].startsWith("{LAYOUT")) return State.LAYOUT_OPTIONS
  return STATE_MAPPING[match[0]] ?? State.TEXT
}

export const flavouredTextProcessor = (
  text: string,
  startIndex: number,
  endIndex: number,
  localState?: FlavouredParserState,
): FlavouredText => {
  return {
    text: text.substring(startIndex, endIndex),
    colour: localState?.colour,
    italicized: localState?.italicized,
    type: FlavouredTextType.TEXT,
  }
}

export const flavouredTextMatchProcessor = (
  match: RegExpMatchArray,
  localState?: FlavouredParserState,
): FlavouredText | null => {
  if (localState) {
    const state: State = getMatchState(match)

    switch (state) {
      case State.NEW_LINE:
        return { text: match[0], type: FlavouredTextType.NEW_LINE }
      case State.COLOUR_START:
        localState.colour = match[1]
        break
      case State.COLOUR_END:
        localState.colour = undefined
        break
      case State.ITALICIZE_START:
        localState.italicized = true
        break
      case State.ITALICIZE_END:
        localState.italicized = false
        break
      case State.LIST_ENTRY:
        return { text: "• ", type: FlavouredTextType.LIST_ENTRY }
      case State.LAYOUT_OPTIONS:
        return {
          text: layoutOptionProcessor(match),
          colour: localState.colour,
          italicized: localState.italicized,
          type: FlavouredTextType.TEXT,
        }
    }
  }
  return null
}

export function formatFlavouredText<T>(
  reducer: (outputs: FlavouredText[]) => T,
  defaultReturn: (text: string) => T,
): (text: string) => T {
  const fn = formatter<FlavouredParserState, FlavouredText, T>(
    FLAVOURED_TEXT_REGEX,
    defaultReturn,
    flavouredTextProcessor,
    flavouredTextMatchProcessor,
    reducer,
    LAYOUT_OPTIONS_PREFIX,
    {
      colour: undefined,
      italicized: false,
    },
    true,
  )
  return fn
}
