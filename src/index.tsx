/* eslint-disable import/no-unassigned-import */
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Layout } from "./components/Layout/Layout";
import { Home } from "./components/Home/Home";
import { Workspace } from "./components/Workspace/index";
import { Glossary } from "./components/Help/Glossary";
import { Guide } from "./components/Help/Guide";
import { Resources } from "./components/Help/Resources";
import { About } from "./components/About/About";
import { E404 } from "./components/E404/E404";
import onlineResources from "./libraries/onlineResources";
import furtherReading from "./libraries/furtherReading";

const container = document.getElementById("app");
const root = createRoot(container);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="lessons" element={<Workspace />} />
        <Route path="glossary" element={<Glossary />} />
        <Route path="guide" element={<Guide />} />
        <Route
          path="online-resources"
          element={
            <Resources resource={onlineResources} title="Online resources" />
          }
        />
        <Route
          path="further-reading"
          element={
            <Resources resource={furtherReading} title="Further reading" />
          }
        />
        <Route path="about" element={<About />} />
        <Route path="*" element={<E404 />} />
      </Route>
    </Route>,
  ),
);

root.render(<RouterProvider router={router} />);
