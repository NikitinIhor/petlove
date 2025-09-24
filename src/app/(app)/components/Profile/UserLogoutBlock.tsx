"use client";

import { NextPage } from "next";
import { useState } from "react";

interface UserLogoutBlockProps {}

const UserLogoutBlock: NextPage<UserLogoutBlockProps> = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <button onClick={handleOpenModal}>Log out</button>

      {openModal && <Modal onClose={handleCloseModal}></Modal>}
    </>
  );
};

export default UserLogoutBlock;
