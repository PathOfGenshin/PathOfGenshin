import { memo } from "react"

import clsx from "clsx"
import { identity } from "lodash"

import coloredText from "@/styles/coloredText.module.scss"

import { formatLabel } from "../genshin/characters/skills/skillLabel"

type AsComponent = keyof JSX.IntrinsicElements

const DESCRIPTION_REGEX = /<color=#([0-9A-F]+)>|<\/color>|\n|<\/?i>|·/g

enum State {
  TEXT,
  COLOR_START,
  COLOR_END,
  ITALICIZE_START,
  ITALICIZE_END,
  BULLET_POINT,
  NEW_LINE,
}

const STATE_MAPPING: Record<string, State> = {
  "\n": State.NEW_LINE,
  "<i>": State.ITALICIZE_START,
  "</i>": State.ITALICIZE_END,
  "</color>": State.COLOR_END,
  "·": State.BULLET_POINT,
}

const getNextState = (match: RegExpMatchArray): State => {
  if (match[1]) {
    return State.COLOR_START
  }
  const state: State | undefined = STATE_MAPPING[match[0]]
  return state ?? State.TEXT
}

const coloredComponent = (
  id: number,
  color: string | null,
  italicized: boolean,
  text: string,
  Component: AsComponent,
): React.ReactNode => {
  if (!color && !italicized) return formatLabel(text)
  return (
    <Component
      key={id}
      className={clsx(
        color ? coloredText[`c${color}`] : undefined,
        italicized ? "italic" : "",
      )}
    >
      {formatLabel(text)}
    </Component>
  )
}

const parseDescription = (desc: string, as: AsComponent): React.ReactNode[] => {
  const outputs: React.ReactNode[] = []
  const matches = desc.matchAll(DESCRIPTION_REGEX)

  let start = 0
  let end = desc.length
  let color: string | null = null
  let italicized = false

  for (const match of matches) {
    const startIndex: number = match.index ?? 0
    const endIndex: number = startIndex + match[0].length

    // Begin stateful iteration check
    const nextState: State = getNextState(match)

    // Update previous end index
    end = startIndex

    // Set up for next iteration
    if (start != end) {
      outputs.push(
        coloredComponent(
          outputs.length,
          color,
          italicized,
          desc.substring(start, end),
          as,
        ),
      )
    }
    start = endIndex
    end = desc.length

    switch (nextState) {
      case State.COLOR_START:
        color = match[1]
        break
      case State.COLOR_END:
        color = null
        break
      case State.ITALICIZE_START:
        italicized = true
        break
      case State.ITALICIZE_END:
        italicized = false
        break
      case State.NEW_LINE:
        outputs.push(<br key={outputs.length} />)
        break
      case State.BULLET_POINT:
        outputs.push(<span key={outputs.length}>• </span>)
        break
    }
  }

  // End case
  if (start != end) {
    outputs.push(
      coloredComponent(
        outputs.length,
        color,
        italicized,
        desc.substring(start, end),
        as,
      ),
    )
  }

  return outputs
}

interface ColoredTextProps {
  id: number
  text: string
  as?: AsComponent
}

const ColoredText: React.FC<ColoredTextProps> = ({
  text,
  as = "span",
}: ColoredTextProps) => {
  const textComponents = parseDescription(text.trim(), as)
  return <>{textComponents.map(identity)}</>
}

const compareColoredText = (
  a: Readonly<ColoredTextProps>,
  b: Readonly<ColoredTextProps>,
): boolean => {
  return a.id === b.id
}

export const MemoizedColoredText = memo(ColoredText, compareColoredText)
