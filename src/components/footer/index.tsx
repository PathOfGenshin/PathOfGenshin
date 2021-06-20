import clsx from "clsx"

const Footer: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <footer
      className={clsx(
        "flex flex-col items-center p-2 bg-gray-400 lg:px-8 lg:py-0 dark:bg-g-dark-800 lg:flex-row lg:justify-between",
        className,
      )}
    >
      <p className="text-sm text-left text-gray-900 dark:text-gray-400">
        Genshin Impact™ is a registered trademark of miHoYo Co., Ltd. Images and data
        &copy; miHoYo Co., Ltd.
        <br />
        &copy; 2021 Path of Genshin - Genshin Impact Calculator. This website was made
        for educational and research purposes.
      </p>
      <a href="https://vercel.com/?utm_source=path-of-genshin&utm_campaign=oss">
        <img className="h-8" src="/powered-by-vercel.svg" alt="Powered By Vercel" />
      </a>
    </footer>
  )
}

export default Footer
