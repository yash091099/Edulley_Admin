import { useEffect } from "react";
import { useNavigate, createBrowserRouter, RouterProvider, useRoutes } from "react-router-dom";
import Root from "./pages/Root";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import ProfileManagement from "./components/ProfileManagement";
import UserManagement from "./components/UserManagement";
import AdminDashboard from "./components/AdminDashboard";
import Reports from "./components/Reports";
import ViewUser from "./components/ViewUser";
import VendorManagement from "./components/VendorManagement";
import ViewVendor from "./components/ViewVendor";
import InstituteManagement from "./components/institute-management";
import StudentManagement from "./components/Student-management";
import CourseManagement from "./components/course-management";
import ScholarshipManagement from "./components/Scholarship-management";
import ApplicationManagement from "./components/Applications-management";
import BlogManagement from "./components/Blog-management";
import CareerManagement from "./components/Career-management";
import ApplicationList from "./components/ApplicationList";

function AuthGuard({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if userData exists in local storage
    const userData = localStorage.getItem("userData");
    if (!userData) {
      // Redirect to login page if userData does not exist
      navigate("/"); // Assuming your login page route is "/"
    }
  }, [navigate]);

  // Render children if user is logged in
  return <>{children}</>;
}

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [{ path: "/", element: <Login /> }],
    },
    {
      path: "/dashboard",
      element: <AuthGuard><Dashboard /></AuthGuard>,
      children: [
        { path: "", element: <AdminDashboard /> },
        { path: "profile-management", element: <ProfileManagement /> },
        { path: "user-management", element: <UserManagement /> },
        { path: "institute-management", element: <InstituteManagement /> },
        { path: "student-management", element: <StudentManagement /> },
        { path: "course-management", element: <CourseManagement /> },
        { path: "view-user", element: <ViewUser /> },
        { path: "vendor-management", element: <VendorManagement /> },
        { path: "reports", element: <Reports /> },
        { path: "Scholarship-management", element: <ScholarshipManagement /> },
        { path: "Applications-management", element: <ApplicationManagement /> },
        // application by userId
        { path:"application-management/:userId", element: <ApplicationList /> },
        { path: "Blog-management", element: <BlogManagement /> },
        { path: "Career-management", element: <CareerManagement /> },
      ],
    },
  ]);

  return (
<>
<Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            backgroundColor: '#FF6477',
            color: '#FFFFFF',
          },
        }}
      />
<RouterProvider router={routes} />;
</>
  )
}

export default App;
