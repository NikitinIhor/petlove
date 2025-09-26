"use client";

import Image from "next/image";
import { FC, useState } from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useSelector } from "react-redux";

import {
  selectAuthUserPetsNoticesFavorites,
  selectIsLoggedIn,
} from "@/app/redux/auth/slice";
import { NoticesItem as NoticesItemType } from "@/app/redux/notices/types";

import ModalWrapper from "../ModalWrapper";
import AttentionModal from "./AttentionModal";
import LearnMoreModal from "./LearnMoreModal";

interface NoticesItemProps {
  noticeData: NoticesItemType;
  variant?: string;
  isBtnFunc?: boolean;
}

const NoticesItem: FC<NoticesItemProps> = ({ noticeData }) => {
  const {
    imgURL,
    title,
    popularity,
    name,
    birthday,
    sex,
    species,
    category,
    comment,
    price,
    _id,
  } = noticeData;

  const priceFormatted = typeof price === "number" ? price.toFixed(2) : "0.00";

  const birthdayFormatted = birthday
    ? birthday.split("-").reverse().join(".")
    : "Unknown";

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userFavoriteNotices = useSelector(selectAuthUserPetsNoticesFavorites);

  const isFavorite = userFavoriteNotices.some(
    (favorite) => favorite._id === _id
  );

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const list = [
    { label: "Name", value: name },
    { label: "Birthday", value: birthdayFormatted },
    { label: "Sex", value: sex },
    { label: "Species", value: species },
    { label: "Category", value: category },
  ];

  return (
    <article className="p-6 bg-white rounded-[16px] flex flex-col gap-6">
      <div className="h-[178px] md:w-[294px] xl:w-[315px] rounded-[16px] overflow-hidden">
        <Image
          src={imgURL}
          alt={title}
          width={315}
          height={178}
          className="object-cover rounded-[16px]"
          priority={false}
        />
      </div>

      <div className="flex justify-between items-center">
        <h3 className="md:text-[18px]">{title}</h3>
        <div className="flex justify-between items-center gap-1">
          <MdOutlineStarPurple500
            size={18}
            color={isFavorite ? "var(--yellow)" : "gray"}
          />
          <span>{popularity}</span>
        </div>
      </div>

      <ul className="flex gap-3 items-center justify-between">
        {list.map((item) => (
          <li key={item.label} className="flex flex-col gap-1">
            <div className="text-[10px] text-[rgba(38,38,38,0.5)]">
              {item.label}
            </div>
            <div className="text-[12px]">{item.value}</div>
          </li>
        ))}
      </ul>

      <p className="text-[14px] h-[60px] md:text-[18px] leading-5">{comment}</p>

      <p className="font-black text-[18px] xl:text-[20px]">${priceFormatted}</p>

      <div>
        <button
          onClick={handleOpenModal}
          className="text-white rounded-full bg-[var(--yellow)] h-[46px] flex justify-center items-center w-full
          cursor-pointer hover:bg-[#F9B020] transition-colors duration-200 ease-in"
        >
          Learn more
        </button>
      </div>

      {openModal && (
        <ModalWrapper onClose={handleCloseModal}>
          {isLoggedIn ? (
            <LearnMoreModal onClose={handleCloseModal} noticeId={_id} />
          ) : (
            <AttentionModal />
          )}
        </ModalWrapper>
      )}
    </article>
  );
};

export default NoticesItem;
