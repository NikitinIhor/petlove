import { NextPage } from "next";

interface newsProps {}

const news: NextPage<newsProps> = () => {
  return (
    <div className="container">
      <h2>News</h2>
    </div>
  );
};

export default news;
