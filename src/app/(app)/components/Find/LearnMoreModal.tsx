"use client";

import {
  addNoticeToFavorites,
  getCurrentUserInfo,
  removeNoticeFromFavorites,
} from "@/app/redux/auth/ops";
import {
  selectAuthUserPetsNoticesFavorites,
  selectIsLoadingCurrentUser,
} from "@/app/redux/auth/slice";
import { getNotice } from "@/app/redux/noticeDetails/ops";
import {
  resetNoticeDetails,
  selectNotice,
} from "@/app/redux/noticeDetails/slice";
import { AppDispatch } from "@/app/redux/store";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";

interface LearnMoreModalProps {
  onClose: () => void;
  noticeId: string;
}

const LearnMoreModal: NextPage<LearnMoreModalProps> = ({
  onClose,
  noticeId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const noticeDetails = useSelector(selectNotice);
  const isLoadingCurrentUser = useSelector(selectIsLoadingCurrentUser);
  const userFavoriteNotices = useSelector(selectAuthUserPetsNoticesFavorites);

  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    dispatch(getNotice(noticeId))
      .unwrap()
      .catch((error) => {
        console.error("Error fetching notice:", error);
        onClose();
      });

    return () => {
      dispatch(resetNoticeDetails());
    };
  }, [dispatch, noticeId, onClose]);

  if (!noticeDetails) return <Loader />;

  const {
    imgURL,
    category,
    title,
    popularity,
    name,
    birthday,
    sex,
    species,
    comment,
    price,
  } = noticeDetails;

  const list = [
    { label: "Name", value: name },
    { label: "Birthday", value: birthday },
    { label: "Sex", value: sex },
    { label: "Species", value: species },
    { label: "Category", value: category },
  ];

  let birthdayFormatted = "Unknown";

  if (birthday) {
    const [year, month, day] = birthday.split("-");
    if (year && month && day) {
      birthdayFormatted = `${day}.${month}.${year}`;
    }
  }

  const priceFormatted = typeof price === "number" ? price.toFixed(2) : "0.00";

  const isFavorite =
    userFavoriteNotices?.some((fav) => fav._id === noticeId) ?? false;

  const handleClick = async (): Promise<void> => {
    setActionLoading(true);
    try {
      if (!isFavorite) {
        await dispatch(addNoticeToFavorites(noticeId)).unwrap();
      } else {
        await dispatch(removeNoticeFromFavorites(noticeId)).unwrap();
      }
      await dispatch(getCurrentUserInfo()).unwrap();
    } catch (error) {
      console.error("Error updating favorites:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const btnLabel = isFavorite ? "Removing..." : "Adding...";

  return (
    <div>
      <div
        className="relative w-[120px] h-[120px] flex mx-auto mb-5
      md:w-[150px] md:h-[150px]"
      >
        <div
          className="absolute left-0 top-0 text-[12px] md:text-[14px] text-[var(--yellow)] w-12 h-8 md:w-[54px] md:h-9 rounded-[30px] bg-[var(--yellow-light)]
        flex justify-center items-center"
        >
          {category}
        </div>
        <img
          src={imgURL}
          alt={title || "Pet photo"}
          width={150}
          height={150}
          loading="lazy"
          className="rounded-full"
        />
      </div>

      <h3 className="font-extrabold mb-3 text-center md:text-[18px]">
        {title}
      </h3>

      <div className="flex items-center justify-center gap-2 mb-7">
        <div className="flex items-center justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i}>
              <MdOutlineStarPurple500 color="rgba(255,197,49,1)" />
            </span>
          ))}
        </div>
        <div>{popularity}</div>
      </div>

      <ul className="flex gap-3 items-center justify-between mb-4">
        {list.map((item) => (
          <li key={item.label} className="flex flex-col gap-1 text-center">
            <div className="text-[10px] text-[rgba(38,38,38,0.5)]">
              {item.label}
            </div>
            <div className="text-[12px]">{item.value}</div>
          </li>
        ))}
      </ul>

      <p className="text-[14px] mb-8 md:text-center">{comment}</p>

      <p className="font-extrabold text-center text-[18px] mb-5">
        ${priceFormatted}
      </p>

      <button
        onClick={handleClick}
        className="h-11 w-full rounded-[30px] bg-[var(--yellow)] text-white
        flex justify-center items-center gap-3"
      >
        {isLoadingCurrentUser || actionLoading ? (
          btnLabel
        ) : (
          <>
            <span>{isFavorite ? "Remove from" : "Add to"}</span>
            <FaRegHeart />
          </>
        )}
      </button>
    </div>
  );
};

export default LearnMoreModal;
