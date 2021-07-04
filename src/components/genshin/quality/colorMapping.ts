import { StarQuality } from "@/generated/model/type_aliases"

type DefaultColor = {
  0: string
}

export const QUALITY_BG_COLORS: Record<StarQuality, string> & DefaultColor = {
  0: "",
  1: "bg-gray-600",
  2: "bg-green-600",
  3: "bg-blue-600",
  4: "bg-purple-600",
  5: "bg-yellow-600",
}

export const QUALITY_TEXT_COLORS: Record<StarQuality, string> & DefaultColor = {
  0: "",
  1: "text-gray-600",
  2: "text-green-600",
  3: "text-blue-600",
  4: "text-purple-600",
  5: "text-yellow-600",
}
