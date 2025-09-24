import { selectLoading, selectNews } from "@/app/redux/news/slice";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import NewsItem from "./NewsItem";

interface NewsListProps {}

const NewsList: NextPage<NewsListProps> = () => {
  const news = useSelector(selectNews);
  const loading = useSelector(selectLoading);

  if (loading || news === null) {
    return <Loader />;
  }

  if (!news || news.length === 0) {
    return (
      <p className="text-center text-gray-500 text-base md:text-2xl">
        No news found
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-6 pb-15 md:flex-row md:flex-wrap md:gap-8">
      {news.map((newsItem) => (
        <li key={newsItem._id} className="w-[335px] md:h-[476px] mx-auto ">
          <NewsItem newsData={newsItem} />
        </li>
      ))}
    </ul>
  );
};

export default NewsList;
