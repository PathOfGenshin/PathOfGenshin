import clsx from "clsx"

interface SideIconProps {
  icon: string
  isSelected?: boolean
}

const SideIcon: React.FC<SideIconProps> = ({ icon, isSelected }: SideIconProps) => {
  return (
    <div>
      <button className="relative flex items-center justify-center w-24 h-24">
        <div
          className={clsx(
            "border-4 rounded-full w-18 h-18",
            isSelected
              ? "border-g-char-selected bg-g-char-selected-fill"
              : "border-g-char",
          )}
        ></div>
        <img
          className="absolute w-24 h-24 select-none -top-4"
          src={icon}
          alt="Avatar"
        />
      </button>
    </div>
  )
}

export const PartyPanel: React.FC = () => {
  return (
    <div className="flex flex-row py-2 mx-auto">
      <SideIcon icon="/static/avatar_icon/UI_AvatarIcon_Side_Keqing.png" isSelected />
      <SideIcon icon="/static/avatar_icon/UI_AvatarIcon_Side_Ambor.png" />
      <SideIcon icon="/static/avatar_icon/UI_AvatarIcon_Side_Mona.png" />
      <SideIcon icon="/static/avatar_icon/UI_AvatarIcon_Side_Xiao.png" />
    </div>
  )
}
