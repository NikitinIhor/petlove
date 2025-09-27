import type { NewsItem as NewsItemType } from "@/app/redux/news/types";

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
    <article className="md:w-[320px] flex flex-col md:h-[476px]">
      <div className="mb-7">
        <img
          src={imgUrl}
          alt={title}
          width="361"
          height="226"
          loading="lazy"
          className="md:w-[340px] h-[226px] rounded-[16px]"
        />
      </div>
      <h3 className="font-bold mb-3 md:text-[18px] leading-snug">{title}</h3>
      <p className="text-[14px] mb-5 md:text-base md:mb-7">{text}</p>
      <div className="flex items-center justify-between mt-auto">
        <time
          className="text-[14px] text-[rgba(38,38,38,0.5)] md:text-base"
          dateTime={date}
        >
          {formattedDate}
        </time>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14px] text-[rgba(246,184,61,1)] md:text-base underline
          focus:no-underline hover:no-underline"
        >
          Read more
        </a>
      </div>
    </article>
  );
};

export default NewsItem;
