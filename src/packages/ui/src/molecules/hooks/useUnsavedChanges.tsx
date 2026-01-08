"use client";

import { useState, useCallback } from "react";
import { useCreateStore } from "@/packages/store/src";

export interface UnsavedChangesState {
  hasUnsavedChanges: boolean;
  currentEditingCard: string | null;
  pendingAction: (() => void) | null;
}

export function useUnsavedChanges() {
  const [state, setState] = useState<UnsavedChangesState>({
    hasUnsavedChanges: false,
    currentEditingCard: null,
    pendingAction: null,
  });

  const { updateModal, clearModal } = useCreateStore((store) => ({
    updateModal: store.updateModal,
    clearModal: store.clearModal,
  }));

  // Set the currently editing card
  const setEditingCard = useCallback((cardId: string | null) => {
    setState(prev => ({
      ...prev,
      currentEditingCard: cardId,
      hasUnsavedChanges: cardId !== null,
    }));
  }, []);

  // Check if user tries to switch cards without saving
  const checkUnsavedChanges = useCallback((newAction: () => void) => {
    if (state.hasUnsavedChanges && state.currentEditingCard) {
      setState(prev => ({ ...prev, pendingAction: newAction }));
      
      // Show modal using the existing modal store
      updateModal({
        title: "Unsaved Changes",
        message: "You have unsaved changes on the current card. Do you want to continue without saving?",
        isOpen: true,
        status: false,
      });
      
      return false; // Block the action
    }
    newAction();
    return true; // Allow the action
  }, [state.hasUnsavedChanges, state.currentEditingCard, updateModal]);

  // Handle save and proceed (to be called from the component using this hook)
  const handleSaveAndProceed = useCallback((saveCallback: () => Promise<void>) => {
    return saveCallback().then(() => {
      setState({
        hasUnsavedChanges: false,
        currentEditingCard: null,
        pendingAction: null,
      });
      clearModal();
      if (state.pendingAction) {
        state.pendingAction();
      }
    });
  }, [state.pendingAction, clearModal]);

  // Handle discard changes
  const handleDiscardChanges = useCallback(() => {
    setState({
      hasUnsavedChanges: false,
      currentEditingCard: null,
      pendingAction: null,
    });
    clearModal();
    if (state.pendingAction) {
      state.pendingAction();
    }
  }, [state.pendingAction, clearModal]);

  // Handle modal close (cancel)
  const handleCloseModal = useCallback(() => {
    setState(prev => ({ ...prev, pendingAction: null }));
    clearModal();
  }, [clearModal]);

  // Clear unsaved changes (after successful save)
  const clearUnsavedChanges = useCallback(() => {
    setState(prev => ({
      ...prev,
      hasUnsavedChanges: false,
    }));
  }, []);

  return {
    // State
    hasUnsavedChanges: state.hasUnsavedChanges,
    currentEditingCard: state.currentEditingCard,
    
    // Actions
    setEditingCard,
    checkUnsavedChanges,
    clearUnsavedChanges,
    
    // Modal handlers
    handleSaveAndProceed,
    handleDiscardChanges,
    handleCloseModal,
  };
}
