import type {
  FriendsItem as FriendsItemType,
  WorkDaysItem,
} from "@/app/redux/friends/types";

import { NextPage } from "next";

interface FriendsItemProps {
  friendsData: FriendsItemType;
}

const FriendsItem: NextPage<FriendsItemProps> = ({
  friendsData,
}: FriendsItemProps) => {
  const { imageUrl, workDays, title, email, address, phone } = friendsData;

  function getWorkingHoursLabel(workDays: WorkDaysItem[] | null): string {
    if (!workDays || workDays.length === 0) {
      return "Day and night";
    }

    const openDays = workDays.filter((day) => day.isOpen);

    if (openDays.length === 0) {
      return "Day and night";
    }

    const sameHours = openDays.every(
      (day) => day.from === openDays[0].from && day.to === openDays[0].to
    );

    if (sameHours) {
      if (openDays.length === 7) {
        return "Day and night";
      }

      return `${openDays[0].from} - ${openDays[0].to}`;
    }

    return `${openDays[0].from} - ${openDays[0].to}`;
  }

  return (
    <div className="w-[335px] h-[184px] md:w-[342px] md:h-[196px] xl:w-[371px] p-5 rounded-[15px] bg-[rgba(255,255,255,1)] relative flex items-center gap-4">
      <div className="rounded-full">
        <img src={imageUrl} alt={title} width="90" height="90" loading="lazy" />
      </div>
      <div
        className="absolute top-3 right-3 p-2 rounded-[30px] bg-[rgba(255,244,223,1)] text-[12px] text-[rgba(246,184,61,1)]
      md:text-[14px]"
      >
        {getWorkingHoursLabel(workDays)}
      </div>
      <div>
        <h3
          className="font-extrabold mb-4
        md:text-[20px] md:mb-5"
        >
          {title}
        </h3>
        <div>
          {email && (
            <p className="text-[14px] mb-2">
              <span className="text-[rgba(38,38,38,0.5)]">Email:</span>
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          )}

          {address && (
            <p className="text-[14px] mb-2">
              <span className="text-[rgba(38,38,38,0.5)]">Address:</span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${address}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {address}
              </a>
            </p>
          )}
          {phone && (
            <p className="text-[14px]">
              <span className="text-[rgba(38,38,38,0.5)]">Phone:</span>
              <a href={`tel:${phone}`}>{phone}</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsItem;
