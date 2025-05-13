import React from 'react';
import { Link } from 'react-router-dom';
import { convertTime } from '../utils/convertTime';

const LatestPosts = ({ posts }) => {
  console.log(posts);
  
  if (!posts || posts.length === 0) {
    return (
      <div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Bài đăng mới nhất
        </h4>
        <p className="text-center py-4">Không có bài đăng nào</p>
      </div>
    );
  }

  // Tạo URL dẫn đến trang chi tiết ở front-end
  const generateFrontendUrl = (post) => {
    return `https://motel-user-nine.vercel.app/details/${post.slug}`;
  };

  return (
    <div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Bài đăng mới nhất
      </h4>
      <div className="flex flex-col gap-5">
        {posts.map((post, index) => (
          <div
            key={post.postId || index}
            className="flex items-center gap-5 pb-5 border-b border-stroke dark:border-strokedark last:border-0 last:pb-0"
          >
            <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
              <img
                src={`${process.env.REACT_APP_API_URL}/${post?.imageUrls[0]}`}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h5 className="font-medium text-black dark:text-white line-clamp-1">
                <a href={generateFrontendUrl(post)} className="hover:text-primary" target="_blank" rel="noopener noreferrer">
                  {post.title}
                </a>
              </h5>
              <p className="text-sm text-gray-500 mt-1">{post.category}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <span>Ngày đăng: {convertTime(post.createAt)}</span>
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <span className={`${post.is_Browse ? 'text-meta-3' : 'text-meta-5'}`}>
                  {post.is_Browse ? 'Đã duyệt' : 'Chưa duyệt'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 text-center">
        <Link
          to="/posts"
          className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-5 text-center font-medium text-primary hover:bg-primary hover:text-white"
        >
          Xem tất cả
        </Link>
      </div>
    </div>
  );
};

export default LatestPosts; 