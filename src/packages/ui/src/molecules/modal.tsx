"use client";

import React from "react";
import Section from "@/packages/ui/src/atoms/section";
import { useCreateStore } from "@/packages/store/src";
import { motion, AnimatePresence } from "framer-motion";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import { Button } from "@/packages/ui/src/atoms/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "./card";

interface ModalProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

function Modal({
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
}: ModalProps) {
  const { modal, clearModal } = useCreateStore((state) => state);

  const handleClose = () => {
    clearModal();
    onCancel?.();
  };

  const handleConfirm = () => {
    onConfirm?.();
    if (!isLoading) {
      clearModal();
    }
  };

  return (
    <AnimatePresence>
      {modal.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-blackcurrant/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative z-10 w-full max-w-md mx-4 bg-quaternary rounded-3xl"
          >
            <Card
              size="default"
              variant="elevated"
              className="w-full shadow-2xl rounded-3xl"
            >
              {modal.title && (
                <CardHeader className="pb-4">
                  <Section className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <span className="text-yellow-600 text-lg">⚠️</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {modal.title}
                    </CardTitle>
                  </Section>
                </CardHeader>
              )}

              {modal.message && (
                <CardContent className={modal.title ? "py-0" : "pt-6"}>
                  <Paragraph className="text-gray-600 leading-relaxed">
                    {modal.message}
                  </Paragraph>
                </CardContent>
              )}

              <CardFooter className="pt-6 flex justify-end gap-3">
                <Button
                  type="button"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-ghost-apple bg-gradient-to-br from-orange via-cherry to-lychee border border-gray-300 rounded-md hover:bg-gray-200 hover:ring-1 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50"
                >
                  {cancelText}
                </Button>

                {onConfirm && (
                  <Button
                    type="button"
                    onClick={handleConfirm}
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Section className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Processing...
                      </Section>
                    ) : (
                      confirmText
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
