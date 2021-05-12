import clsx from "clsx"

const Footer: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <footer
      className={clsx(
        "flex justify-between items-center px-8 bg-gray-300 dark:bg-g-dark-800",
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
