import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import type { ReactElement } from "react";

import { Layout } from "../features/Layout/Layout";
import { Home } from "../features/Home/Home";
import { Workspace } from "../features/Workspace/index";
import { Glossary } from "../features/Help/Glossary";
import { Guide } from "../features/Help/Guide";
import { Resources } from "../features/Help/Resources";
import { About } from "../features/About/About";
import { E404 } from "../features/E404/E404";
import onlineResources from "../assets/files/onlineResources";

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
        <Route path="about" element={<About />} />
        <Route path="*" element={<E404 />} />
      </Route>
    </Route>,
  ),
);

export const Routes = (): ReactElement => <RouterProvider router={router} />;
