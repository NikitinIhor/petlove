"use client";

import { ReactNode } from "react";

interface ModalWrapperProps {
  children: ReactNode;
  onClose: () => void;
}

export default function ModalWrapper({ children, onClose }: ModalWrapperProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative w-[90%] max-w-md p-10 rounded-2xl bg-white shadow-lg">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-5 right-5 text-lg text-black font-extrabold hover:text-gray-700"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
