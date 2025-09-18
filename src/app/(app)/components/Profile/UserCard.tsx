import { NextPage } from "next";
import UserBlock from "./UserBlock";
import UserLogoutBlock from "./UserLogoutBlock";
import UserPetsBlock from "./UserPetsBlock";

interface UserCardProps {}

const UserCard: NextPage<UserCardProps> = () => {
  return (
    <div>
      <UserBlock />
      <UserPetsBlock />
      <UserLogoutBlock />
    </div>
  );
};

export default UserCard;
