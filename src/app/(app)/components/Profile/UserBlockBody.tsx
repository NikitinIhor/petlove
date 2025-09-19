import {
  selectUserEmail,
  selectUserName,
  selectUserPhone,
} from "@/app/redux/auth/slice";
import { NextPage } from "next";
import { useSelector } from "react-redux";

interface UserBlockBodyProps {}

const UserBlockBody: NextPage<UserBlockBodyProps> = () => {
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userPhone = useSelector(selectUserPhone);

  return (
    <div className="mb-10">
      <h3 className="text-[18px] font-extrabold mb-7">My information</h3>

      <ul className="flex flex-col gap-3">
        <li className="w-full p-3 md:p-4 rounded-[30px] border border-[var(--yellow)]">
          {userName || "Name"}
        </li>
        <li className="w-full p-3 md:p-4 rounded-[30px] border border-[var(--yellow)]">
          {userEmail || "name@gmail.com"}
        </li>
        <li className="w-full p-3 md:p-4 rounded-[30px] border border-[var(--yellow)]">
          {userPhone || "+380"}
        </li>
      </ul>
    </div>
  );
};

export default UserBlockBody;
