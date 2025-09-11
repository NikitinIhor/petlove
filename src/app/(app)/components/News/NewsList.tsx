import { selectNews } from "@/app/redux/news/slice";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import NewsItem from "./NewsItem";

interface NewsListProps {}

const NewsList: NextPage<NewsListProps> = () => {
  const news = useSelector(selectNews);

  return (
    news.length > 1 && (
      <ul className="flex flex-col gap-6 mb-11 md:flex-row md:flex-wrap md:gap-8">
        {news.map((newsItem) => (
          <li key={newsItem._id} className="w-[335px] md:h-[476px] mx-auto ">
            <NewsItem newsData={newsItem} />
          </li>
        ))}
      </ul>
    )
  );
};

export default NewsList;
