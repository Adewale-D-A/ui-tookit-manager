import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const AppRoute = React.lazy(() => import("./App"));
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense fallback={<p>...loading</p>}>
      <AppRoute />
    </Suspense>
  </React.StrictMode>
);
