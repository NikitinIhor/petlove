import type { NewsItem as NewsItemType } from "@/app/redux/types";
import { NextPage } from "next";

interface NewsItemProps {
  newsData: NewsItemType;
}

const NewsItem: NextPage<NewsItemProps> = ({ newsData }) => {
  const { imgUrl, title, text, date, url } = newsData;

  const rawDate = date;
  const newDate = new Date(rawDate);
  const formattedDate = newDate.toLocaleDateString("en-GB");

  return (
    <article>
      <div>
        <img src={imgUrl} alt={title} width="361" height="226" loading="lazy" />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      <div>
        <time dateTime={date}>{formattedDate}</time>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </div>
    </article>
  );
};

export default NewsItem;
