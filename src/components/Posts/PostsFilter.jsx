import React from 'react';

const PostsFilter = ({ filters, onFilterChange }) => {
  const handlePriceChange = (e) => {
    const value = e.target.value;
    onFilterChange({ ...filters, price: value });
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    onFilterChange({ ...filters, status: value });
  };


  return (
    <div className="mb-4 bg-white p-4 rounded-lg shadow-xs dark:bg-gray-800">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bộ lọc</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Lọc theo khoảng giá */}
        <div>
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Khoảng giá</span>
            <select
              value={filters.price || ''}
              onChange={handlePriceChange}
              className="block w-full mt-1 text-sm border border-gray-200 p-2 rounded-md focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
            >
              <option value="">Tất cả giá</option>
              <option value="0-1">Dưới 1 triệu</option>
              <option value="1-2">1 - 2 triệu</option>
              <option value="2-3">2 - 3 triệu</option>
              <option value="3-5">3 - 5 triệu</option>
              <option value="5-1000000">Trên 5 triệu</option>
            </select>
          </label>
        </div>

        {/* Lọc theo trạng thái */}
        <div>
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Trạng thái</span>
            <select
              value={filters.status || ''}
              onChange={handleStatusChange}
              className="block w-full mt-1 text-sm border border-gray-200 p-2 rounded-md focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="1">Đã duyệt</option>
              <option value="0">Chưa duyệt</option>
            </select>
          </label>
        </div>

      
      </div>
    </div>
  );
};

export default PostsFilter; 