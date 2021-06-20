import coloredText from "@/styles/coloredText.module.scss"

export interface ColoredText {
  id: number
  value: React.ReactNode
}

enum State {
  STANDARD,
  COLOR_START,
  COLOR_END,
  NEW_LINE,
}

const DESCRIPTION_REGEX = /<color=#([0-9A-F]+)>|<\/color>|\\n/g

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

export const parseDescription = (desc: string): React.ReactNode[] => {
  const outputs: React.ReactNode[] = []
  const matches = desc.matchAll(DESCRIPTION_REGEX)
  let result = matches.next()

  let state: State = State.STANDARD
  let s = 0
  let e = desc.length
  let c: string | null = null

  while (!result.done) {
    const match: RegExpMatchArray = result.value
    const value: string = match[0]
    const index: number = match.index ?? 0
    const lastIndex: number = index + value.length

    // Begin stateful iteration check
    const nextState: State = getNextState(state, match)

    // Update previous end index
    e = index

    // Set up for next iteration
    outputs.push(
      <span key={outputs.length} className={c ? coloredText[`c${c}`] : undefined}>
        {desc.substring(s, e)}
      </span>,
    )
    s = lastIndex
    e = desc.length
    if (nextState === State.COLOR_START) {
      c = match[1]
    } else {
      c = null
    }
    if (nextState === State.NEW_LINE) {
      outputs.push(<br key={outputs.length} />)
    }
    state = nextState
    result = matches.next()
  }

  // End case
  outputs.push(
    <span key={outputs.length} className={c ? coloredText[`c${c}`] : undefined}>
      {desc.substring(s, e)}
    </span>,
  )

  return outputs
}
