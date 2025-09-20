"use client";

import { NextPage } from "next";
import { useState } from "react";
import { GoPencil } from "react-icons/go";
import ModalWrapper from "../ModalWrapper";
import EditModal from "./EditModal";

interface EditUserBtnProps {}

const EditUserBtn: NextPage<EditUserBtnProps> = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <button
        type="button"
        className="cursor-pointer w-10 h-10 flex justify-center items-center rounded-full bg-[var(--yellow-light)]
      hover:bg-[rgba(246,184,61,0.5)] transition-colors duration-200 ease-in"
      >
        <GoPencil
          onClick={handleOpenModal}
          size={20}
          color="rgba(246,184,61,1)"
        />
      </button>
      {openModal && (
        <ModalWrapper onClose={handleCloseModal}>
          <EditModal />
        </ModalWrapper>
      )}
    </>
  );
};

export default EditUserBtn;
