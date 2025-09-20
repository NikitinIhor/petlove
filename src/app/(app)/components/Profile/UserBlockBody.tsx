"use client";

import {
  selectUserAvatar,
  selectUserEmail,
  selectUserName,
  selectUserPhone,
} from "@/app/redux/auth/slice";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import ModalWrapper from "../ModalWrapper";
import EditModal from "./EditModal";

interface UserBlockBodyProps {}

const UserBlockBody: NextPage<UserBlockBodyProps> = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userPhone = useSelector(selectUserPhone);
  const userAvatar = useSelector(selectUserAvatar);

  return (
    <div className="mb-10">
      <button
        type="button"
        onClick={handleOpenModal}
        className="cursor-pointer w-full flex justify-center mb-7"
      >
        {!userAvatar ? (
          <div className="flex flex-col gap-2 items-center">
            <div className="w-[94px] h-[94px] rounded-full bg-[var(--yellow-light)] flex justify-center items-center">
              <FaUserAlt color="var(--yellow)" size={30} />
            </div>
            <span>Upload photo</span>
          </div>
        ) : (
          <span>
            <Image
              src={userAvatar}
              alt="User avatar"
              width={110}
              height={110}
            />
          </span>
        )}
      </button>

      <h3 className="text-[18px] font-extrabold mb-7">My information</h3>

      <ul className="flex flex-col gap-3">
        <li className="w-full p-3 md:p-4 rounded-[30px] border border-[var(--yellow)]">
          {userName || "Name"}
        </li>
        <li className="w-full p-3 md:p-4 rounded-[30px] border border-[var(--yellow)]">
          {userEmail || "name@gmail.com"}
        </li>
        <li className="w-full p-3 md:p-4 rounded-[30px] border border-[var(--yellow)]">
          {userPhone || "+380"}
        </li>
      </ul>

      {openModal && (
        <ModalWrapper onClose={handleCloseModal}>
          <EditModal />
        </ModalWrapper>
      )}
    </div>
  );
};

export default UserBlockBody;
