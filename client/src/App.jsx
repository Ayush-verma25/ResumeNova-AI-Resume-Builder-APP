import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "./configs/api";
import { login, logout, setLoading } from "./app/features/authSlice";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home"));
const Layout = lazy(() => import("./pages/Layout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ResumeBuilder = lazy(() => import("./pages/ResumeBuilder"));
const Preview = lazy(() => import("./pages/Preview"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        if (token) {
          const { data } = await api.get("/api/users/data", {
            headers: { Authorization: token },
          });
          if (data.user) {
            dispatch(login({ token, user: data.user }));
          } else {
            dispatch(logout());
          }
          dispatch(setLoading(false));
        } else {
          dispatch(setLoading(false));
        }
      } catch (error) {
        if (error.response?.status === 401) {
          dispatch(logout());
        }
        dispatch(setLoading(false));
        console.log(error.message);
      }
    };

    getUserData();
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="app" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="builder/:resumeId" element={<ResumeBuilder />} />
          </Route>

          <Route path="view/:resumeId" element={<Preview />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
