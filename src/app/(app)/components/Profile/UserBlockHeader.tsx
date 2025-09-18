import { NextPage } from "next";
import { FaUserAlt } from "react-icons/fa";
import EditUserBtn from "./EditUserBtn";

interface UserBlockHeaderProps {}

const UserBlockHeader: NextPage<UserBlockHeaderProps> = () => {
  return (
    <div>
      <div>
        <span>User</span>
        <div>
          <FaUserAlt color="var(--yellow)" size={20} />
        </div>
      </div>
      <EditUserBtn />
    </div>
  );
};

export default UserBlockHeader;
