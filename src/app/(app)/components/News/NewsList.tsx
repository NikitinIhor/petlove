import { selectNews } from "@/app/redux/news/slice";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import NewsItem from "./NewsItem";

interface NewsListProps {}

const NewsList: NextPage<NewsListProps> = () => {
  const news = useSelector(selectNews);

  return (
    news.length > 1 && (
      <ul>
        {news.map((newsItem) => (
          <li key={newsItem._id}>
            <NewsItem newsData={newsItem} />
          </li>
        ))}
      </ul>
    )
  );
};

export default NewsList;
