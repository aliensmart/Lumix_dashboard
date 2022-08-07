import { STATE_LOGIN, STATE_SIGNUP } from "./components/AuthForm";
import { EmptyLayout, LayoutRoute, MainLayout } from "./components/Layout";
import PageSpinner from "./components/PageSpinner";
import AuthPage from "./pages/AuthPage";
import React from "react";
import componentQueries from "react-component-queries";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./styles/reduction.scss";

const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const UsersPage = React.lazy(() => import("./pages/UsersPage"));
const Challengers = React.lazy(() => import("./pages/Challengers"));
const Paries = React.lazy(() => import("./pages/Paries"));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split("/").pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <Switch>
          {/* <LayoutRoute
            exact
            path="/login"
            layout={EmptyLayout}
            component={props => <AuthPage {...props} authState={STATE_LOGIN} />}
          />
          <LayoutRoute
            exact
            path="/signup"
            layout={EmptyLayout}
            component={props => (
              <AuthPage {...props} authState={STATE_SIGNUP} />
            )}
          /> */}

          <MainLayout breakpoint={this.props.breakpoint}>
            <React.Suspense fallback={<PageSpinner />}>
              <Route exact path="/" component={DashboardPage} />
              <Route exact path="/users" component={UsersPage} />
              <Route exact path="/challengers" component={Challengers} />
              <Route exact path="/paries" component={Paries} />
            </React.Suspense>
          </MainLayout>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: "xs" };
  }

  if (576 < width && width < 767) {
    return { breakpoint: "sm" };
  }

  if (768 < width && width < 991) {
    return { breakpoint: "md" };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: "lg" };
  }

  if (width > 1200) {
    return { breakpoint: "xl" };
  }

  return { breakpoint: "xs" };
};

export default componentQueries(query)(App);
