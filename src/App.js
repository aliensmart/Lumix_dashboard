import React from "react";
import componentQueries from "react-component-queries";
import { QueryClient, QueryClientProvider } from "react-query";
import "./styles/reduction.scss";
import LumixRoute from "./LumixRoute";
import { MainLayout } from "./components/Layout";
import PageSpinner from "./components/PageSpinner";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();
const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split("/").pop()}`;
};

const App = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={getBasename()}>
        <LumixRoute breakpoint={props.breakpoint} />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

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
