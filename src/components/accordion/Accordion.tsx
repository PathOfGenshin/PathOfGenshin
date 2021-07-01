import clsx from "clsx"
import { AnimatePresence, motion, Variant } from "framer-motion"

import { Disclosure, Transition as HeadlessTransition } from "@headlessui/react"
import { ChevronUpIcon } from "@heroicons/react/solid"

interface AccordionSectionProps {
  title: string
  children: React.ReactNode
  animatedHeight?: boolean
}

type VariantType = "in" | "out"
const variants: Record<VariantType, Variant> = {
  in: {
    height: "auto",
    transition: { duration: 0.1 },
  },
  out: {
    height: 0,
    transition: { duration: 0.075 },
  },
}

const Accordion: React.FC<AccordionSectionProps> = ({
  title,
  children,
  animatedHeight,
}: AccordionSectionProps) => {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex justify-between py-1 my-1 text-xl text-left font-genshin">
            <span>{title}</span>
            <ChevronUpIcon
              className={clsx("w-5 h-5", open ? "transform rotate-180" : "")}
            />
          </Disclosure.Button>
          {animatedHeight ? (
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial="out"
                  animate={open ? "in" : "out"}
                  exit="out"
                  variants={variants}
                >
                  <Disclosure.Panel static className="overflow-hidden h-inherit">
                    {children}
                  </Disclosure.Panel>
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <HeadlessTransition
              appear={false}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel>{children}</Disclosure.Panel>
            </HeadlessTransition>
          )}
        </>
      )}
    </Disclosure>
  )
}

export default Accordion
