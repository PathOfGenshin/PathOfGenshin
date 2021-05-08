import React, { Fragment, MouseEventHandler, useCallback, useRef } from "react"

import clsx from "clsx"

import { Dialog, Transition } from "@headlessui/react"

interface ConfirmationDialogProps {
  title?: string
  description: string
  confirmText: string
  confirmAction: MouseEventHandler<HTMLButtonElement>
  cancelText?: string
  cancelAction?: MouseEventHandler<HTMLButtonElement>
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
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
}: ConfirmationDialogProps) => {
  const closeDialog = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const onConfirm = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      confirmAction(event)
      closeDialog()
    },
    [confirmAction, closeDialog],
  )
  const onCancel = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (cancelAction) {
        cancelAction(event)
      }
      closeDialog()
    },
    [cancelAction, closeDialog],
  )

  const confirmRef = useRef<HTMLButtonElement | null>(null)

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-10 overflow-y-auto"
        open={isOpen}
        onClose={closeDialog}
        initialFocus={confirmRef}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-75"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-black bg-opacity-30" />
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
            <div className="max-w-xs px-4 py-2 mx-auto transition-all transform border-4 rounded-lg md:max-w-2xl lg:max-w-4xl md:px-8 md:py-4 w-max bg-g-paper-dialog text-g-paper-0 border-g-paper-dialog-border font-genshin">
              <div className="w-full h-0.5 bg-g-paper-dialog-border my-2" />
              <div className="flex flex-col items-center justify-center py-2 md:py-4">
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

              <div className="flex flex-row items-center justify-center pt-2 pb-2 space-x-2 md:pt-4 md:space-x-6 md:px-8">
                {cancelText && cancelAction && (
                  <button
                    className="h-12 px-8 py-2 transition duration-100 rounded-full text-g-paper bg-g-dark-600 ring-inset hover:ring hover:ring-g-button-hover focus:outline-none focus:ring focus:ring-g-button-focus-ring focus:bg-g-button-focus focus:text-g-button-focus"
                    onClick={onCancel}
                  >
                    {cancelText}
                  </button>
                )}
                <button
                  ref={confirmRef}
                  className="h-12 px-8 py-2 transition duration-100 rounded-full text-g-paper bg-g-dark-600 ring-inset hover:ring hover:ring-g-button-hover focus:outline-none focus:ring focus:ring-g-button-focus-ring focus:bg-g-button-focus focus:text-g-button-focus"
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