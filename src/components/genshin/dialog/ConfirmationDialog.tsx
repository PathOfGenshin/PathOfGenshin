import { Fragment, MouseEventHandler, useRef } from "react"

import clsx from "clsx"

import { Dialog, Transition } from "@headlessui/react"

interface ConfirmationDialogProps {
  title?: React.ReactNode
  description: React.ReactNode
  confirmText: React.ReactNode
  confirmAction: MouseEventHandler<HTMLButtonElement>
  cancelText?: React.ReactNode
  cancelAction?: MouseEventHandler<HTMLButtonElement>
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onClose?: () => void
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  description,
  confirmText,
  confirmAction,
  cancelText,
  cancelAction,
  isOpen,
  setIsOpen,
  onClose,
}: ConfirmationDialogProps) => {
  const closeDialog = (): void => {
    setIsOpen(false)
  }

  const onConfirm = (event: React.MouseEvent<HTMLButtonElement>): void => {
    confirmAction(event)
    closeDialog()
  }

  const onCancel = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (cancelAction) {
      cancelAction(event)
    }
    closeDialog()
  }

  const confirmRef = useRef<HTMLButtonElement | null>(null)

  const onCloseHandler = onClose ? onClose : closeDialog

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="overflow-y-auto fixed inset-0 z-10"
        open={isOpen}
        onClose={onCloseHandler}
        initialFocus={confirmRef}
      >
        <div className="flex justify-center items-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-75"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0 sm:scale-95"
            enterTo="opacity-100 sm:scale-100"
            leave="ease-in duration-75"
            leaveFrom="opacity-100 sm:scale-100"
            leaveTo="opacity-0 sm:scale-95"
          >
            <div className="py-2 px-4 mx-auto w-max max-w-xs rounded-lg border-4 transition-all transform md:max-w-2xl lg:max-w-4xl md:px-8 md:py-4 bg-g-paper-dialog text-g-paper-0 border-g-paper-dialog-border font-genshin">
              <div className="w-full h-0.5 bg-g-paper-dialog-border my-2" />
              <div className="flex flex-col justify-center items-center py-2 md:py-4">
                {title && (
                  <Dialog.Title className="px-4 pb-2 text-lg text-center md:px-8 md:pb-4">
                    {title}
                  </Dialog.Title>
                )}

                <Dialog.Description
                  className={clsx("md:px-8", title ? "" : "py-2 md:py-4")}
                >
                  {description}
                </Dialog.Description>
              </div>

              <div className="w-full h-0.5 bg-g-paper-dialog-border my-2" />

              <div className="flex flex-row justify-center items-center pt-2 pb-2 space-x-2 md:pt-4 md:space-x-6 md:px-8">
                {cancelText && cancelAction && (
                  <button
                    className="py-2 px-8 h-12 rounded-full ring-inset transition duration-100 text-g-paper bg-g-dark-600 hover:ring hover:ring-g-button-hover focus:outline-none focus:ring focus:ring-g-button-focus-ring focus:bg-g-button-focus focus:text-g-button-focus"
                    onClick={onCancel}
                  >
                    {cancelText}
                  </button>
                )}
                <button
                  ref={confirmRef}
                  className="py-2 px-8 h-12 rounded-full ring-inset transition duration-100 text-g-paper bg-g-dark-600 hover:ring hover:ring-g-button-hover focus:outline-none focus:ring focus:ring-g-button-focus-ring focus:bg-g-button-focus focus:text-g-button-focus"
                  onClick={onConfirm}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ConfirmationDialog
