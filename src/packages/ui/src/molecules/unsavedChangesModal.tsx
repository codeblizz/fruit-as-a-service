"use client";

import React from "react";
import Section from "@/packages/ui/src/atoms/section";
import { motion, AnimatePresence } from "framer-motion";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import { Button } from "@/packages/ui/src/atoms/button";
import { Card, CardTitle, CardHeader, CardFooter, CardContent } from "./card";

export interface UnsavedChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onDiscard: () => void;
  title?: string;
  message?: string;
  isLoading?: boolean;
}

function UnsavedChangesModal({
  isOpen,
  onClose,
  onSave,
  onDiscard,
  title = "Unsaved Changes",
  message = "You have unsaved changes. Do you want to save them before proceeding?",
  isLoading = false,
}: UnsavedChangesModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
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
            className="absolute inset-0 bg-blackcurrant/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative z-10 w-full max-w-md mx-4"
          >
            <Card
              variant="elevated"
              size="default"
              className="w-full shadow-2xl"
            >
              <CardHeader className="pb-4">
                <Section className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <span className="text-yellow-600 text-lg">⚠️</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {title}
                  </CardTitle>
                </Section>
              </CardHeader>

              <CardContent className="py-0">
                <Paragraph className="text-gray-600 leading-relaxed">
                  {message}
                </Paragraph>
              </CardContent>

              <CardFooter className="pt-6 flex justify-end gap-3">
                <Button
                  type="button"
                  onClick={onDiscard}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-ghost-apple border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50"
                >
                  Discard Changes
                </Button>

                <Button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-ghost-apple border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50"
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  onClick={onSave}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Section className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      Saving...
                    </Section>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default UnsavedChangesModal;
