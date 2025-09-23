import { selectLoading, selectNotices } from "@/app/redux/notices/slice";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import NoticesItem from "./NoticesItem";

interface NoticesListProps {}

const NoticesList: NextPage<NoticesListProps> = () => {
  const noticesItems = useSelector(selectNotices);
  const loading = useSelector(selectLoading);

  if (loading || noticesItems === null) {
    return <Loader />;
  }

  if (!noticesItems || noticesItems.length === 0) {
    return (
      <p className="text-center text-gray-500 text-base md:text-2xl">
        No noticesItems found
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {noticesItems.map((noticesItem) => (
        <li key={noticesItem._id}>
          <NoticesItem noticeData={noticesItem} />
        </li>
      ))}
    </ul>
  );
};

export default NoticesList;
