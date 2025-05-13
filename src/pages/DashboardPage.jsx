import React, { useEffect, useState } from "react";
import CardDataStats from "../components/CardDataStats";
import axios from "axios";
import { PostIcon, ReportIcon, UserIcon } from "../components/Icon/Icon";
import { Chart } from "../components/Chart/Chart";
import { BarChart } from "../components/Chart/BarChart";
import LatestPosts from "../components/LatestPosts";
import {
  GetCountPost,
  GetCountReport,
  GetCountUser,
  GetPostCountsByMonth,
  GetLatestPosts,
  GetCategories,
  GetReportsByReason,
} from "../services/fetchAPI";

export default function DashboardPage() {
  const [statsData, setStatsData] = useState([]);
  const [monthCount, setMonthCount] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reportsByReason, setReportsByReason] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setIsLoading(true);
        const [postsRes, usersRes, reportsRes, latestPostsRes, categoriesRes, reportsByReasonRes] = await Promise.all([
          GetCountPost(),
          GetCountUser(),
          GetCountReport(),
          GetLatestPosts(),
          GetCategories(),
          GetReportsByReason(),
        ]);

        setStatsData([
          {
            title: "Bài viết",
            count: postsRes?.data,
            icon: <PostIcon className="w-[22px] h-[16px] fill-primary" />,
           
          },
          {
            title: "Người dùng",
            count: usersRes?.data,
            icon: <UserIcon className="w-[22px] h-[16px] fill-primary" />,
            
          },
          {
            title: "Báo cáo",
            count: reportsRes?.data,
            icon: <ReportIcon className="w-[22px] h-[16px] fill-primary" />,
            
          },
        ]);

        if (latestPostsRes?.data) {
          setLatestPosts(latestPostsRes.data.slice(0, 5));
        }

        if (categoriesRes?.data) {
          // Thêm trường số lượng bài đăng mẫu vào danh mục để hiển thị biểu đồ
          const categoriesWithPostCount = categoriesRes.data.map(category => ({
            ...category,
            postCount: Math.floor(Math.random() * 30) + 5, // Mẫu số lượng bài đăng (5-35)
          }));
          setCategories(categoriesWithPostCount);
        }

        if (reportsByReasonRes?.data) {
          setReportsByReason(reportsByReasonRes.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setIsLoading(false);
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
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-black dark:text-white">Tổng quan hệ thống</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Thống kê và phân tích dữ liệu</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-6">
        {statsData.map((res, index) => (
          <CardDataStats 
            key={index} 
            title={res.title} 
            total={res.count}
            rate={res.rate}
            levelUp={res.levelUp}
            levelDown={res.levelDown}
          >
            {res.icon}
          </CardDataStats>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 mb-6">
        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">
            Số lượng bài đăng theo tháng
          </h4>
          <Chart monthCount={monthCount} />
        </div>
      </div>

      {/* Content Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Latest Posts */}
        <div className="md:col-span-1">
          <LatestPosts posts={latestPosts} />
        </div>
        
        {/* Reports Chart */}
        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">
            Báo cáo theo loại
          </h4>
          <BarChart reports={reportsByReason} />
        </div>
      </div>
    </div>
  );
}
