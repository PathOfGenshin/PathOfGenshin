import React, { MouseEventHandler, useCallback, useEffect, useRef } from "react"

import clsx from "clsx"

import { Dialog } from "@headlessui/react"

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
  const cancelRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      cancelRef.current?.blur()
      confirmRef.current?.blur()
    }
  }, [confirmRef, cancelRef, isOpen])

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      className="fixed inset-0 overflow-y-auto text-current"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="z-10 max-w-4xl px-8 py-4 mx-auto border-4 rounded-lg w-max bg-g-paper-dialog text-g-paper-0 border-g-paper-dialog-border font-genshin">
          <div className="w-full h-0.5 bg-g-paper-dialog-border my-2" />
          <div className="flex flex-col items-center justify-center py-4">
            {title && (
              <Dialog.Title className="px-8 pb-4 text-lg text-center">
                {title}
              </Dialog.Title>
            )}

            <Dialog.Description className={clsx("px-8", title ? "" : "py-4")}>
              {description}
            </Dialog.Description>
          </div>

          <div className="w-full h-0.5 bg-g-paper-dialog-border my-2" />

          <div className="flex flex-row items-center justify-center px-8 pt-4 pb-2 space-x-6">
            {cancelText && cancelAction && (
              <button
                ref={cancelRef}
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
      </div>
    </Dialog>
  )
}

export default ConfirmationDialog
