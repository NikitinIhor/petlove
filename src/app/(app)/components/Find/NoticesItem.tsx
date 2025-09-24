"use client";

import { NoticesItem as NoticesItemType } from "@/app/redux/notices/types";
import { NextPage } from "next";
import { useState } from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";
import ModalWrapper from "../ModalWrapper";
import LearnMoreModal from "./LearnMoreModal";

interface NoticesItemProps {
  noticeData: NoticesItemType;
  variant?: string;
  isBtnFunc?: boolean;
}

const NoticesItem: NextPage<NoticesItemProps> = ({ noticeData }) => {
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
  } = noticeData;

  const priceFormatted = typeof price === "number" ? price.toFixed(2) : "0.00";

  let birthdayFormatted = "Unknown";
  if (birthday) {
    const [year, month, day] = birthday.split("-");
    birthdayFormatted = `${day}.${month}.${year}`;
  }

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
    <article
      className="p-6 bg-white rounded-[16px] flex flex-col gap-6
   "
    >
      <div className="w-[287px] h-[178px] md:w-[294px] xl:w-[315px] rounded-[16px] overflow-hidden">
        <img src={imgURL} alt={title} width="315" height="178" loading="lazy" />
      </div>

      <div className="flex justify-between items-center">
        <h3 className="md:text-[18px]">{title}</h3>
        <div className="flex justify-between items-center">
          <MdOutlineStarPurple500 size={18} color="var(--yellow)" />
          <span>{popularity}</span>
        </div>
      </div>

      <ul className="flex gap-3 items-center justify-between">
        {list.map((item) => (
          <li key={item.label} className="flex flex-col gap-1 ">
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
          cursor-pointer
          hover:bg-[#F9B020] transition-colors duration-200 ease-in"
        >
          Learn more
        </button>
      </div>

      {openModal && (
        <ModalWrapper onClose={handleCloseModal}>
          <LearnMoreModal onClose={handleCloseModal} />
        </ModalWrapper>
      )}
    </article>
  );
};

export default NoticesItem;
