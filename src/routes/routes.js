import routes from "../config/routes";
import CategoryManagePage from "../pages/CategoryManagePage";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import NewsManagePage from "../pages/NewsManagePage";
import PostManagePage from "../pages/PostManagePage";
import RegisterPage from "../pages/RegisterPage";
import ReportManagePage from "../pages/ReportManagePage";
import ReviewManagePage from "../pages/ReviewManagePage";
import UserManagePage from "../pages/UserManagePage";

export const publicRoutes = [
  {
    path: routes.home,
    component: <DashboardPage />,
  },
  {
    path: routes.login,
    component: <LoginPage />,
    layout: null,
  },
  {
    path: routes.register,
    component: <RegisterPage />,
    layout: null,
  },
  {
    path: routes.post_manage,
    component: <PostManagePage />,
  },
  {
    path: routes.user_manage,
    component: <UserManagePage />,
  },
  {
    path: routes.report_manage,
    component: <ReportManagePage />,
  },
  {
    path: routes.review_manage,
    component: <ReviewManagePage />,
  },

  {
    path: routes.news_manage,
    component: <NewsManagePage />,
  },

  {
    path: routes.category_manage,
    component: <CategoryManagePage />,
  },
];
