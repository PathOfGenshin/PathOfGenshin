import { SVGProps } from "react"

// The curvature at the bottom-right of the avatar icon, which overlays on top of the
// existing character image.
export const SVGRoundBorder = ({
  className,
}: SVGProps<SVGSVGElement>): React.ReactElement<SVGSVGElement> => {
  return (
    <svg
      version="1.1"
      viewBox="0 0 177 32"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="m147 32c17.965-4.5716 27.189-15.211 30-32l0.11165 32h-0.11165z"
        fill="currentColor" // inherits passed-in text color
      />
    </svg>
  )
}
