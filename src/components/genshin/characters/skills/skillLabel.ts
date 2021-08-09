const LAYOUT_LABEL_REGEX =
  /{LAYOUT_([A-Z]+)#(.*?)}{LAYOUT_([A-Z]+)#(.*?)}{LAYOUT_([A-Z]+)#(.*?)}/g

enum DeviceLayout {
  MOBILE = "MOBILE",
  PS = "PS",
  PC = "PC",
}

export const formatLabel = (label: string): string => {
  const matches = [...label.matchAll(LAYOUT_LABEL_REGEX)]
  if (!matches.length) return label.startsWith("#") ? label.substring(1) : label

  const output: string[] = []

  // Push "prefix" before first match if it exists
  const firstMatch = matches[0]
  const firstIndex = firstMatch.index ?? 0
  if (firstIndex > 0) {
    output.push(label.substring(0, firstIndex))
  }

  // Begin iterating over all matches
  let nextIndex = firstIndex

  // TODO: select based on device layout
  for (const match of matches) {
    const startIndex = match.index ?? 0
    const endIndex = startIndex + match[0].length

    // Push middle "text"
    if (nextIndex < startIndex) {
      output.push(label.substring(nextIndex, startIndex))
    }

    const deviceLayoutPCIndex = match.findIndex(
      (value: string) => value === DeviceLayout.PC,
    )
    output.push(match[deviceLayoutPCIndex + 1])

    nextIndex = endIndex
  }

  // Finally push "suffix" after last match if it exists
  if (nextIndex > 0 && nextIndex < label.length) {
    output.push(label.substring(nextIndex, label.length))
  }

  const finalOutput = output.join("")
  return finalOutput.startsWith("#") ? finalOutput.substring(1) : finalOutput
}
