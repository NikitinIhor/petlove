"use client";

import { logoutUser } from "@/app/redux/auth/ops";
import { selectUserName } from "@/app/redux/auth/slice";
import { AppDispatch } from "@/app/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../ModalWrapper";
import UserBlock from "./UserBlock";

const UserCard = () => {
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const userName = useSelector(selectUserName);
  const router = useRouter();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());

      toast.success(`${userName} was successfully logged out`, {
        duration: 4000,
        position: "top-right",
      });

      router.push("/home");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message, {
        duration: 4000,
        position: "top-right",
      });
    } finally {
      handleCloseModal();
    }
  };

  return (
    <div>
      <UserBlock />

      <button
        className="flex justify-center items-center text-[#F6B83D] uppercase w-1/2 md:w-[150px] h-10 bg-[var(--yellow-light)] rounded-full"
        onClick={handleOpenModal}
      >
        Log out
      </button>

      {openModal && (
        <ModalWrapper onClose={handleCloseModal}>
          <div className="mx-auto mb-4 w-[80px] h-[80px] rounded-full bg-[var(--yellow-light)] flex items-center justify-center">
            <Image
              src="/images/cat.png"
              alt="image of a cat"
              width={80}
              height={80}
            />
          </div>

          <p className="text-center mb-6 text-[20px] font-extrabold">
            Already leaving?
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleLogout}
              className="cursor-pointer w-[137px] h-[42px] rounded-full bg-[var(--yellow)] text-white hover:bg-[#f9b020]"
            >
              Yes
            </button>
            <button
              onClick={handleCloseModal}
              className="cursor-pointer w-[137px] h-[42px] rounded-full bg-[rgba(38,38,38,0.05)] hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
};

export default UserCard;
