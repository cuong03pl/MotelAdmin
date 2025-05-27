import { deleteMethod, get, post, put } from "../utils/request";

// get all
export const GetPostsByCategory = async (slug, params) => {
  const res = await get(`Posts/GetPostsByCategory/${slug}`, params);
  return res;
};
export const GetCategories = async () => {
  const res = await get(`Categories`);
  return res;
};
export const GetLoginHistories = async (params) => {
  const res = await get(`Auth/GetLoginHistory`, params);
  return res;
};
export const GetUsers = async (params) => {
  const res = await get(`Users`, params);
  return res;
};

export const GetPostById = async (id) => {
  const res = await get(`Posts/${id}`);
  return res;
};
export const GetUserByToken = async (token) => {
  const res = await get(`Users/${token}`);
  return res;
};
export const GetUserById = async (id) => {
  const res = await get(`Users/${id}`);
  return res;
};
export const GetPostsByProvinceSlug = async (id, params) => {
  const res = await get(`Posts/GetPostsByProvinceSlug/${id}`, { params });
  return res;
};

export const GetUserPosts = async (id) => {
  const res = await get(`Users/GetUserPosts/${id}`);
  return res;
};
export const GetCountPost = async (id) => {
  const res = await get(`Posts/GetCount`);
  return res;
};
export const GetCountUser = async (id) => {
  const res = await get(`Users/GetCount`);
  return res;
};
export const GetCountReport = async (id) => {
  const res = await get(`Reports/GetCount`);
  return res;
};
export const GetCountUserPost = async (id) => {
  const res = await get(`Users/countPost/${id}`);
  return res;
};

export const GetPostCountsByMonth = async () => {
  const res = await get(`Users/GetPostCountsByMonth`);
  return res;
};

export const GetReportsByReason = async () => {
  const res = await get(`Reports/GetReportsByReason`);
  return res;
};

export const CheckFavorite = async (params) => {
  const res = await get(`Users/CheckFavorite`, params);
  return res;
};

export const CheckHasPaid = async (params) => {
  const res = await get(`Booking/CheckPayed`, params);
  return res;
};

export const GetUserFavorite = async (id) => {
  const res = await get(`Users/GetUserFavorite/${id}`);
  return res;
};
export const GetApprovedPosts = async (params) => {
  const res = await get(`Posts/GetApprovedPosts`, { params });
  return res;
};
export const GetPosts = async (params) => {
  const res = await get(`Posts`, params);
  return res;
};
export const GetBookings = async (params) => {
  const res = await get(`Booking`, params);
  return res;
};
export const GetBookingById = async (id) => {
  const res = await get(`Booking/${id}`);
  return res;
};
export const GetNewsById = async (id) => {
  const res = await get(`News/${id}`);
  return res;
};

export const GetReviewsByPost = async (slug) => {
  const res = await get(`Reviews/GetReviewsByPost/${slug}`);
  return res;
};

export const GetReviews = async (params) => {
  const res = await get(`Reviews`, params);
  return res;
};
export const GetReports = async (params) => {
  const res = await get(`Reports`, params);
  return res;
};

export const GetNews = async (params) => {
  const res = await get(`News`, params);
  return res;
};

export const GetLatestPosts = async () => {
  const res = await get(`Posts/GetLatestPosts`);
  return res;
};

export const GetLocations = async () => {
  const res = await get(`Posts/GetLocations`);
  return res;
};
export const GetRoles = async () => {
  const res = await get(`Auth/GetRoles`);
  return res;
};
// post

export const AddFavoritePost = async (params) => {
  const res = await post(`Users/AddFavoritePost`, null, params);
  return res;
};
export const CreatePost = async (params) => {
  const res = await post(`Posts`, params, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
};
export const CreateNews = async (params) => {
  const res = await post(`News`, params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
export const CreateRole = async (params) => {
  const res = await post(`Auth/CreateRole`, params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
export const CreateComment = async (params) => {
  const res = await post(`Reviews`, params);
  return res;
};
export const CreateCategory = async (params) => {
  const res = await post(`Categories`, params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
export const SetRole = async (id, params) => {
  const res = await post(`Auth/SetRole/${id}`, params);
  return res;
};

export const UpdatePost = async (id, params) => {
  const res = await put(`Posts/${id}`, params, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
};
export const UpdateNews = async (id, params) => {
  const res = await put(`News/${id}`, params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
export const UpdateUser = async (id, params) => {
  const res = await put(`Users/${id}`, params, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
};

export const UpdateCategory = async (id, params) => {
  const res = await put(`Categories/${id}`, params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
export const UpdateRole = async (id, params) => {
  const res = await put(`Auth/UpdateRole/${id}`, params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
// delete
export const DeletePost = async (id, params) => {
  const res = await deleteMethod(`Posts/${id}`, params, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
};
export const DeleteReport = async (id) => {
  const res = await deleteMethod(`Reports/${id}`);
  return res;
};
export const DeleteCategory = async (id) => {
  const res = await deleteMethod(`Categories/${id}`);
  return res;
};
export const DeleteNews = async (id) => {
  const res = await deleteMethod(`News/${id}`);
  return res;
};

export const DeleteUser = async (id) => {
  const res = await deleteMethod(`Users/${id}`);
  return res;
};

export const DeleteReview = async (id) => {
  const res = await deleteMethod(`Reviews/${id}`);
  return res;
};
export const DeleteRole = async (id) => {
  const res = await deleteMethod(`Auth/DeleteRole/${id}`);
  return res;
};
// login
export const Login = async (params) => {
  const res = await post(`Auth/login`, params);
  return res;
};

export const Register = async (params) => {
  const res = await post(`Auth/register`, params);
  return res;
};

// browse
export const BrowsePost = async (id) => {
  const res = await put(`Posts/Browse?id=${id}`);
  return res;
};
export const BlockUser = async (id, status) => {
  const res = await put(`Users/block?id=${id}&is_block=${status}`);
  return res;
};

export const ApproveUser = async (id, status) => {
  const res = await put(`Users/verify?id=${id}&isVerified=${status}`);
  return res;
};

export const BrowseReport = async (id) => {
  const res = await put(`Reports/Browse?id=${id}`);
  return res;
};

export const ExportReport = async (params) => {
  const res = await get(`Reports/export-pdf`, {
    params,
    responseType: 'blob',
    headers: {
      'Accept': 'application/pdf'
    }
  });
  return res;
};

export const ExportBooking = async () => {
  const res = await get(`Booking/export-pdf`, {
    responseType: 'blob',
    headers: {
      'Accept': 'application/pdf'
    }
  });
  return res;
};
