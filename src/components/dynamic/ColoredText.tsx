import { memo, useCallback } from "react"

import clsx from "clsx"
import { identity } from "lodash"

import {
  FlavouredText,
  FlavouredTextType,
  formatFlavouredText,
} from "@/genshin/formatting/flavouredText"
import coloredText from "@/styles/coloredText.module.scss"

type AsComponent = keyof JSX.IntrinsicElements

const defaultReturn = (text: string): React.ReactNode[] => [text]

interface ColoredTextProps {
  id: number
  text: string
  as?: AsComponent
}

const ColoredText: React.FC<ColoredTextProps> = ({
  text,
  as: Component = "span",
}: ColoredTextProps) => {
  const componentReducer = useCallback(
    (outputs: FlavouredText[]): React.ReactNode[] =>
      outputs.map(
        (
          { text, type, colour, italicized }: FlavouredText,
          index: number,
        ): React.ReactNode => {
          switch (type) {
            case FlavouredTextType.TEXT:
            case FlavouredTextType.LIST_ENTRY:
              if (!colour && !italicized && type != FlavouredTextType.LIST_ENTRY)
                return text
              return (
                <Component
                  key={index}
                  className={clsx(
                    colour ? coloredText[`c${colour}`] : undefined,
                    italicized ? "italic" : "",
                  )}
                >
                  {text}
                </Component>
              )
            case FlavouredTextType.NEW_LINE:
              return <br key={index} />
          }
        },
      ),
    [Component],
  )

  const formatTextComponents = useCallback(
    (t: string) => {
      const formatterFn = formatFlavouredText(componentReducer, defaultReturn)
      return formatterFn(t)
    },
    [componentReducer],
  )

  return <>{formatTextComponents(text).map(identity)}</>
}

const compareColoredText = (
  a: Readonly<ColoredTextProps>,
  b: Readonly<ColoredTextProps>,
): boolean => {
  return a.id === b.id
}

export const MemoizedColoredText = memo(ColoredText, compareColoredText)
