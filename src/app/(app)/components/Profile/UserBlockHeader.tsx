import { NextPage } from "next";
import { FaUserAlt } from "react-icons/fa";
import EditUserBtn from "./EditUserBtn";

interface UserBlockHeaderProps {}

const UserBlockHeader: NextPage<UserBlockHeaderProps> = () => {
  return (
    <div className="flex items-center justify-between mb-10 md:mb-15">
      <div className="p-3 bg-[var(--yellow)] rounded-[30px] flex items-center gap-1 text-white">
        <span>User</span>
        <div>
          <FaUserAlt size={18} />
        </div>
      </div>
      <EditUserBtn />
    </div>
  );
};

export default UserBlockHeader;
