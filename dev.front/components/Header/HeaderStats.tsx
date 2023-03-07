import React, { useEffect } from "react";
import { statisticDataSelector } from "../../redux/userRequests/selectors";
import CardStats from "../Cards/CardStats";
import { useSelector } from "react-redux";

export default function HeaderStats() {
  const statisticData = useSelector(statisticDataSelector);

  useEffect(() => {
    if (statisticData) {
      console.log("stat data header", statisticData.data.result);
    }
  }, [statisticData]);

  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-32">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="PER WEEK (pdf/ppt)"
                  statTitle={
                    statisticData?.data
                      ? statisticData.data.result.perWeekDownload
                      : ""
                  }
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-heart"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="PER MONTH (pdf/ppt)"
                  statTitle={
                    statisticData?.data
                      ? statisticData.data.result.perMonthDownload
                      : ""
                  }
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="far fa-calendar"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="LATEST LOGIN"
                  statTitle="12.12.2022"
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
