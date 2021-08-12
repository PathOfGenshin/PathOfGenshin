import Image from "next/image"

import { propertyIcon } from "@/assets/static"

interface PropertyIconProps {
  iconName: string
  property: string
}

export const PropertyIcon: React.FC<PropertyIconProps> = ({
  iconName,
  property,
}: PropertyIconProps) => {
  return (
    <div className="w-4 h-4 pointer-events-none select-none">
      <Image src={propertyIcon(iconName)} alt={property} width={32} height={32} />
    </div>
  )
}
