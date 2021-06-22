import clsx from "clsx"

interface DividerProps {
  horizontal?: boolean
}

const Divider: React.FC<DividerProps> = ({ horizontal }: DividerProps) => {
  return (
    <div
      className={clsx(
        "flex",
        horizontal ? "align-center w-full px-8" : "items-center h-full py-4",
      )}
    >
      <div
        className={clsx(
          "bg-gray-300 dark:bg-g-dark-750",
          horizontal ? "h-0.5 w-full" : "w-0.5 h-full",
        )}
      />
    </div>
  )
}

export default Divider
