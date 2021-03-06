import { memo } from "react"

import { SkillParam } from "@/generated/model/character_skills"
import { formatLayoutOptionsText } from "@/genshin/formatting/layoutOptionsText"
import { formatParamsText } from "@/genshin/formatting/paramsText"

interface TalentSkillAttributesProps {
  level: number
  params: SkillParam[]
}

const TalentSkillAttributes: React.FC<TalentSkillAttributesProps> = ({
  params,
}: TalentSkillAttributesProps) => {
  return (
    <table className="w-full table-fixed font-genshin">
      <tbody>
        {params.map((param: SkillParam) => (
          <tr
            key={param.name}
            className="flex flex-row justify-between px-4 my-1 h-8 leading-8 bg-black bg-opacity-20"
          >
            <td className="text-g-dark-2">{formatLayoutOptionsText(param.name)}</td>
            <td className="text-g-dark-1">
              {formatParamsText(param.format, param.values)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const compareTalentSkillAttributes = (
  a: Readonly<TalentSkillAttributesProps>,
  b: Readonly<TalentSkillAttributesProps>,
): boolean => {
  return a.level === b.level
}

export const MemoizedTalentSkillAttributes = memo(
  TalentSkillAttributes,
  compareTalentSkillAttributes,
)
