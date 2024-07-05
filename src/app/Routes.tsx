import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import type { ReactElement } from "react";

import { Home } from "../features/Home/Home";
import { Workspace } from "../features/Workspace/index";
import { Glossary } from "../features/Help/Glossary/Glossary";
import { Guide } from "../features/Help/Guide/Guide";
import { Resources } from "../features/Help/Resources/Resources";
import { About } from "../features/About/About";
import { E404 } from "../features/E404/E404";
import onlineResources from "../assets/files/onlineResources";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Home />} />
      <Route path="lessons" element={<Workspace />} />
      <Route path="lessons/:id" element={<Workspace />} />
      <Route path="glossary" element={<Glossary />} />
      <Route path="guide" element={<Guide />} />
      <Route
        path="online-resources"
        element={
          <Resources resources={onlineResources} title="Online resources" />
        }
      />
      <Route path="about" element={<About />} />
      <Route path="*" element={<E404 />} />
    </Route>,
  ),
);

export const Routes = (): ReactElement => <RouterProvider router={router} />;
