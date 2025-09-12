import { selectFriends, selectLoading } from "@/app/redux/friends/slice";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import FriendsItem from "./FriendsItem";

interface FriendsListProps {}

const FriendsList: NextPage<FriendsListProps> = () => {
  const friends = useSelector(selectFriends);
  const loading = useSelector(selectLoading);

  if (loading || friends === null) {
    return <Loader />;
  }

  if (!friends || friends.length === 0) {
    return (
      <p className="text-center text-gray-500 text-base md:text-2xl">
        No friends found
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-y-5 xl:gap-x-5 md:grid-cols-2 xl:grid-cols-3 pb-[80px]">
      {friends.map((friendsItem) => (
        <li key={friendsItem._id}>
          <FriendsItem friendsData={friendsItem} />
        </li>
      ))}
    </ul>
  );
};

export default FriendsList;
