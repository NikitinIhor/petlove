import { NextPage } from "next";
import UserBlockBody from "./UserBlockBody";
import UserBlockHeader from "./UserBlockHeader";

interface UserBlockProps {}

const UserBlock: NextPage<UserBlockProps> = () => {
  return (
    <div>
      <UserBlockHeader />
      <UserBlockBody />
    </div>
  );
};

export default UserBlock;
