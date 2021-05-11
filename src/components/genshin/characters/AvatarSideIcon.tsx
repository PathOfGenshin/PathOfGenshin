import { forwardRef, HTMLProps } from "react"

import clsx from "clsx"

import { avatarIcon } from "@/assets/static"
import styles from "@/styles/image.module.scss"

import { AvatarIconProps } from "./icon"

const AvatarSideIcon: React.FC<AvatarIconProps> = forwardRef<
  HTMLAnchorElement,
  AvatarIconProps
>(
  (
    {
      iconName,
      charName,
      isSelected,
      onClick,
      href,
    }: AvatarIconProps & HTMLProps<HTMLAnchorElement>,
    ref,
  ) => {
    return (
      <div className="block w-24 h-24 transition-all">
        <a
          href={href}
          onClick={onClick}
          ref={ref}
          className={clsx(
            "flex relative justify-center items-center w-24 h-24 transition-transform duration-100 transform focus:outline-none hover:scale-110",
            isSelected ? "scale-110" : "scale-100",
          )}
        >
          <div
            className={clsx(
              "rounded-full border-4 transition-colors duration-100 w-18 h-18",
              isSelected
                ? "border-g-char-selected bg-g-char-selected-fill"
                : "border-g-char",
            )}
          ></div>
          <img
            className={clsx(
              "absolute -top-4 w-24 h-24 pointer-events-none select-none",
              styles.imgCrisp,
            )}
            src={avatarIcon(iconName)}
            alt={charName}
          />
          <div
            className={clsx(
              "absolute bottom-0 transition duration-100 h-1.5",
              isSelected ? "w-full bg-g-char-selected-fill" : "w-0 opacity-0",
            )}
          ></div>
        </a>
      </div>
    )
  },
)
AvatarSideIcon.displayName = "AvatarSideIcon"

export default AvatarSideIcon
