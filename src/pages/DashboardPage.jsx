import React, { useEffect, useState } from "react";
import CardDataStats from "../components/CardDataStats";
import axios from "axios";
import { PostIcon, ReportIcon, UserIcon } from "../components/Icon/Icon";
import { Chart } from "../components/Chart/Chart";
import {
  GetCountPost,
  GetCountReport,
  GetCountUser,
  GetPostCountsByMonth,
} from "../services/fetchAPI";

export default function DashboardPage() {
  const [statsData, setStatsData] = useState([]);
  const [monthCount, setMonthCount] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const [postsRes, usersRes, reportsRes] = await Promise.all([
          GetCountPost(),
          GetCountUser(),
          GetCountReport(),
        ]);

        setStatsData([
          {
            title: "Total posts",
            count: postsRes?.data,
            icon: <PostIcon className="w-[22px] h-[16px] fill-primary" />,
          },
          {
            title: "Total users",
            count: usersRes?.data,
            icon: <UserIcon className="w-[22px] h-[16px] fill-primary" />,
          },
          {
            title: "Total reports",
            count: reportsRes?.data,
            icon: <ReportIcon className="w-[22px] h-[16px] fill-primary" />,
          },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      await GetPostCountsByMonth()
        .then((res) => {
          setMonthCount(res?.data);
        })
        .catch((err) => console.log(err));
    };
    fetchAPI();
  }, []);
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {statsData.map((res, index) => (
          <CardDataStats key={index} title={res.title} total={res.count}>
            {res.icon}
          </CardDataStats>
        ))}
      </div>
      <div className="mt-5">
        <Chart monthCount={monthCount} />
      </div>
    </div>
  );
}
