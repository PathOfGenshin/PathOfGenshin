import Link from "next/link"
import { useRouter } from "next/router"
import clsx from "clsx"

import type { Route } from "@/routes"

export interface NavbarLinkProps extends Route {
  isSmall: boolean
}

export const NavbarLink: React.FC<NavbarLinkProps> = ({
  name,
  path,
  isSmall,
}: NavbarLinkProps) => {
  const router = useRouter()

  return (
    <Link href={path}>
      <a
        className={clsx(
          "block py-2 px-3 font-medium text-white rounded-md hover:bg-gray-700 dark:hover:bg-g-dark-700",
          isSmall ? "text-sm" : "text-base",
          router.asPath === path ? "bg-gray-900 dark:bg-g-dark-900" : "",
        )}
      >
        {name}
      </a>
    </Link>
  )
}
