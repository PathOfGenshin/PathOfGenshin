import coloredText from "@/styles/coloredText.module.scss"

const DESCRIPTION_REGEX = /<color=#([0-9A-F]+)>|<\/color>|\\n/g

enum State {
  STANDARD,
  COLOR_START,
  COLOR_END,
  NEW_LINE,
}

const getNextState = (currentState: State, match: RegExpMatchArray): State => {
  if (match[1]) {
    return State.COLOR_START
  } else if (currentState === State.COLOR_START) {
    if (match[0] !== "</color>") {
      throw "Expected a closing color tag! Previous state was an opening color tag."
    }
    return State.COLOR_END
  } else if (match[0] === "\\n") {
    return State.NEW_LINE
  } else {
    return State.STANDARD
  }
}

const coloredSpan = (
  id: number,
  color: string | null,
  text: string,
): React.ReactNode => {
  return (
    <span key={id} className={color ? coloredText[`c${color}`] : undefined}>
      {text}
    </span>
  )
}

export const parseDescription = (desc: string): React.ReactNode[] => {
  const outputs: React.ReactNode[] = []
  const matches = desc.matchAll(DESCRIPTION_REGEX)

  let state: State = State.STANDARD
  let start = 0
  let end = desc.length
  let color: string | null = null

  for (const match of matches) {
    const startIndex: number = match.index ?? 0
    const endIndex: number = startIndex + match[0].length

    // Begin stateful iteration check
    const nextState: State = getNextState(state, match)

    // Update previous end index
    end = startIndex

    // Set up for next iteration
    outputs.push(coloredSpan(outputs.length, color, desc.substring(start, end)))
    start = endIndex
    end = desc.length
    if (nextState === State.COLOR_START) {
      color = match[1]
    } else {
      color = null
    }
    if (nextState === State.NEW_LINE) {
      outputs.push(<br key={outputs.length} />)
    }
    state = nextState
  }
  // End case
  outputs.push(coloredSpan(outputs.length, color, desc.substring(start, end)))

  return outputs
}
