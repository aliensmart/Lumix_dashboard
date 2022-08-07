import { EmptyLayout, LayoutRoute, MainLayout } from "./components/Layout";
import PageSpinner from "./components/PageSpinner";
import React from "react";
import { useAuthQuery } from "./hooks/useAuthQuery";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./styles/reduction.scss";
import { useAuthUser } from "@react-query-firebase/auth";
import { auth } from "./services";
import AuthPage from "./pages/AuthPage";

const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const UsersPage = React.lazy(() => import("./pages/UsersPage"));
const Challengers = React.lazy(() => import("./pages/Challengers"));
const Paries = React.lazy(() => import("./pages/Paries"));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split("/").pop()}`;
};

function LumixRoute({ breakpoint }) {
  const { data } = useAuthQuery();
  const user = useAuthUser(["user"], auth);
  console.log(auth);
  return (
    <BrowserRouter basename={getBasename()}>
      <Switch>
        {!data?.uid ? (
          <LayoutRoute
            exact
            path="/"
            layout={EmptyLayout}
            component={(props) => <AuthPage />}
          />
        ) : (
          <MainLayout breakpoint={breakpoint}>
            <React.Suspense fallback={<PageSpinner />}>
              <Route exact path="/" component={DashboardPage} />
              <Route exact path="/users" component={UsersPage} />
              <Route exact path="/challengers" component={Challengers} />
              <Route exact path="/paries" component={Paries} />
            </React.Suspense>
          </MainLayout>
        )}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default LumixRoute;
