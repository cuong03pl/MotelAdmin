import routes from "../config/routes";
import BookingManagePage from "../pages/BookingManagePage";
import CategoryManagePage from "../pages/CategoryManagePage";
import DashboardPage from "../pages/DashboardPage";
import LoginHistoryPage from "../pages/LoginHistoryPage";
import LoginPage from "../pages/LoginPage";
import NewsManagePage from "../pages/NewsManagePage";
import PostManagePage from "../pages/PostManagePage";
import RegisterPage from "../pages/RegisterPage";
import ReportManagePage from "../pages/ReportManagePage";
import ReviewManagePage from "../pages/ReviewManagePage";
import UserManagePage from "../pages/UserManagePage";
import RoleManagePage from "../pages/RoleManagePage";
import ProtectedRoute from "../components/ProtectedRoute";
import RedirectIfLoggedIn from "../components/RedirectIfLoggedIn";

export const publicRoutes = [
  {
    path: routes.home,
    component: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: routes.login,
    component: (
      <RedirectIfLoggedIn>
        <LoginPage />
      </RedirectIfLoggedIn>
    ),
    layout: null,
  },
  {
    path: routes.register,
    component: (
      <RedirectIfLoggedIn>
        <RegisterPage />
      </RedirectIfLoggedIn>
    ),
    layout: null,
  },
  {
    path: routes.post_manage,
    component: (
      <ProtectedRoute>
        <PostManagePage />
      </ProtectedRoute>
    ),
  },
  {
    path: routes.user_manage,
    component: (
      <ProtectedRoute>
        <UserManagePage />
      </ProtectedRoute>
    ),
  },
  {
    path: routes.report_manage,
    component: (
      <ProtectedRoute>
        <ReportManagePage />
      </ProtectedRoute>
    ),
  },
  {
    path: routes.review_manage,
    component: (
      <ProtectedRoute>
        <ReviewManagePage />
      </ProtectedRoute>
    ),
  },

  {
    path: routes.news_manage,
    component: (
      <ProtectedRoute>
        <NewsManagePage />
      </ProtectedRoute>
    ),
  },

  {
    path: routes.category_manage,
    component: (
      <ProtectedRoute>
        <CategoryManagePage />
      </ProtectedRoute>
    ),
  },
  {
    path: routes.booking,
    component: (
      <ProtectedRoute>
        <BookingManagePage />
      </ProtectedRoute>
    ),
  },
  {
    path: routes.login_history,
    component: (
      <ProtectedRoute>
        <LoginHistoryPage />
      </ProtectedRoute>
    ),
  },
  {
    path: routes.role_manage,
    component: (
      <ProtectedRoute>
        <RoleManagePage />
      </ProtectedRoute>
    ),
  },
];
