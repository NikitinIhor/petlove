import { NoticesItem as NoticesItemType } from "@/app/redux/notices/types";
import { AppDispatch } from "@/app/redux/store";
import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../hooks/useModal";

interface NoticesItemProps {
  noticeData: NoticesItemType;
  variant?: string;
  isBtnFunc?: boolean;
}

const NoticesItem: NextPage<NoticesItemProps> = ({
  noticeData,
  variant = "default",
  isBtnFunc = true,
}) => {
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

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoadingCurrentUser = useSelector(selectIsLoadingCurrentUser);
  const userFavoriteNotices = useSelector(selectAuthUserPetsNoticesFavorites);

  const dispatch = useDispatch<AppDispatch>();

  const priceFormatted = typeof price === "number" ? price.toFixed(2) : "0.00";

  let birthdayFormatted = "Unknown";
  if (birthday) {
    const [year, month, day] = birthday.split("-");
    birthdayFormatted = `${day}.${month}.${year}`;
  }

  const isFavorite = userFavoriteNotices.some(
    (favorite) => favorite._id === _id
  );

  const { openModal, closeModal, isModalOpen } = useModal();

  const handleClickFavorite = async (): Promise<void> => {
    if (!isLoggedIn) {
      openModal("attention");
      return;
    }
    try {
      if (!isFavorite) {
        await dispatch(addNoticeToFavorites(_id)).unwrap();

        if (userFavoriteNotices.length === 0) {
          openModal("first-favorite");
        }
      } else {
        await dispatch(removeNoticeFromFavorites(_id)).unwrap();
      }

      await dispatch(getCurrentUserInfo()).unwrap();
    } catch (error) {
      enqueueSnackbar(`Error: ${error}`, { variant: "error" });
    }
  };

  const handleClickLearnMore = (): void => {
    if (!isLoggedIn) {
      openModal("attention");
    } else {
      openModal("notice");
    }
  };

  let iconName = isFavorite ? "heart" : "heart-empty";
  if (variant === "profile") {
    iconName = "trash";
  }

  return <div>NoticesItem</div>;
};

export default NoticesItem;
