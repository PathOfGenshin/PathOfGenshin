import { forwardRef, HTMLProps } from "react"
import Image from "next/image"
import clsx from "clsx"

import { avatarIcon } from "@/assets/static"
import image from "@/styles/image.module.scss"
import partyIcon from "@/styles/partyIcon.module.scss"

import { AvatarIconProps } from "./icon"

export const AvatarSideIcon: React.FC<AvatarIconProps> = forwardRef<
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
      <div className="block w-16 h-16 md:w-18 md:h-18 lg:w-24 lg:h-24">
        <a
          href={href}
          onClick={onClick}
          ref={ref}
          className={clsx(
            "flex relative justify-center items-center w-16 h-16 transition duration-100 transform md:w-18 md:h-18 lg:w-24 lg:h-24",
            partyIcon.border,
          )}
        >
          <div
            className={clsx(
              "w-12 h-12 rounded-full border-2 transition duration-100 md:border-3 md:w-13.5 md:h-13.5 lg:w-18 lg:h-18 lg:border-4",
              isSelected
                ? "border-g-char-selected bg-g-char-selected-fill"
                : "border-g-char",
            )}
          />
          <div className="absolute w-16 h-16 pointer-events-none select-none -top-8/3r md:-top-3 lg:-top-4 md:w-18 md:h-18 lg:w-24 lg:h-24">
            <Image
              className={clsx("pointer-events-none select-none", image.imgCrisp)}
              src={avatarIcon(iconName)}
              alt={charName}
              quality={100}
              width={128}
              height={128}
            />
          </div>
          <div
            className={clsx(
              "absolute bottom-0 transition duration-100 h-0.5 md:h-1",
              isSelected ? "w-full bg-g-char-selected-fill" : "w-0 opacity-0",
            )}
          />
        </a>
      </div>
    )
  },
)
AvatarSideIcon.displayName = "AvatarSideIcon"
