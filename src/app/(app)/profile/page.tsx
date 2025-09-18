import { NextPage } from "next";
import PrivateRoute from "../components/PrivateRoute";

interface profileProps {}

const profile: NextPage<profileProps> = () => {
  return (
    <PrivateRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Welcome to your profile!</h1>
      </div>
    </PrivateRoute>
  );
};

export default profile;
