import { useCallback, useState } from "react";

export const useModal = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = useCallback((modalId: string) => {
    setActiveModal(modalId);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const isModalOpen = useCallback(
    (modalId: string) => activeModal === modalId,
    [activeModal]
  );

  return {
    activeModal,
    openModal,
    closeModal,
    isModalOpen,
  };
};
