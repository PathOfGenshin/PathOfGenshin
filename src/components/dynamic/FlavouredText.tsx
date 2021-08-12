import { memo, useCallback } from "react"
import clsx from "clsx"
import { identity } from "lodash"

import {
  FlavouredText as FlavouredTextData,
  FlavouredTextType,
  formatFlavouredText,
} from "@/genshin/formatting/flavouredText"
import coloredText from "@/styles/coloredText.module.scss"

type AsComponent = keyof JSX.IntrinsicElements

const defaultReturn = (text: string): React.ReactNode[] => [text]

interface FlavouredTextProps {
  id: number
  text: string
  as?: AsComponent
}

const FlavouredText: React.FC<FlavouredTextProps> = ({
  text,
  as: Component = "span",
}: FlavouredTextProps) => {
  const componentReducer = useCallback(
    (outputs: FlavouredTextData[]): React.ReactNode[] =>
      outputs.map(
        (
          { text, type, colour, italicized }: FlavouredTextData,
          index: number,
        ): React.ReactNode => {
          switch (type) {
            case FlavouredTextType.TEXT:
            case FlavouredTextType.LIST_ENTRY:
              return !colour && !italicized && type != FlavouredTextType.LIST_ENTRY ? (
                text
              ) : (
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

const compareFlavouredText = (
  a: Readonly<FlavouredTextProps>,
  b: Readonly<FlavouredTextProps>,
): boolean => {
  return a.id === b.id
}

export const MemoizedFlavouredText = memo(FlavouredText, compareFlavouredText)
