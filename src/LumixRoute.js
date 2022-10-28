import { MainLayout } from "./components/Layout";
import PageSpinner from "./components/PageSpinner";
import React from "react";
import { useAuthQuery } from "./hooks/useAuthQuery";
import { Routes, Route } from "react-router-dom";
import "./styles/reduction.scss";
import AuthPage from "./pages/AuthPage";
import { useAdminCheckerQuery } from "./hooks/useAminCheckerQuery";
import Contact from "./pages/Contact";

const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const UsersPage = React.lazy(() => import("./pages/UsersPage"));
const Challengers = React.lazy(() => import("./pages/Challengers"));
const Paries = React.lazy(() => import("./pages/Paries"));
const SingleUser = React.lazy(() => import("./pages/UserPage"));
const NoAdminPage = React.lazy(() => import("./pages/NoAdminPage"));

function LumixRoute({ breakpoint }) {
  const { data } = useAuthQuery();
  const { data: adminData } = useAdminCheckerQuery();

  return (
    <>
      {!data?.uid ? (
        <Routes>
          <Route exact path="/" element={<Contact />} />
          <Route exact path="/toutAdm" element={<AuthPage />} />
        </Routes>
      ) : adminData?.ref?.id ? (
        <MainLayout breakpoint={breakpoint}>
          <React.Suspense fallback={<PageSpinner />}>
            <Routes>
              <Route exact path="/" element={<DashboardPage />} />
              <Route exact path="/users" element={<UsersPage />} />
              <Route path="/users/:userId" element={<SingleUser />} />
              <Route exact path="/challengers" element={<Challengers />} />
              <Route exact path="/paries" element={<Paries />} />
            </Routes>
          </React.Suspense>
        </MainLayout>
      ) : (
        <MainLayout breakpoint={breakpoint}>
          <React.Suspense fallback={<PageSpinner />}>
            <Routes>
              <Route exact path="/" element={<NoAdminPage />} />
            </Routes>
          </React.Suspense>
        </MainLayout>
      )}
    </>
  );
}

export default LumixRoute;
