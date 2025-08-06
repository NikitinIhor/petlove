import { NextPage } from "next";
import MainLoader from "./(app)/components/MainLoader";

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  return (
    <div>
      <MainLoader />
    </div>
  );
};

export default Home;
