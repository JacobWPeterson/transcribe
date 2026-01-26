import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import type { ReactElement } from 'react';

import { ManifestSets } from '../files/manifests';
import { Home } from '../pages/Home/Home';
import { Workspace } from '../pages/Workspace/Workspace';
import { Glossary } from '../pages/Help/Glossary/Glossary';
import { Guide } from '../pages/Help/Guide/Guide';
import { Resources } from '../pages/Help/Resources/Resources';
import { About } from '../pages/About/About';
import { E404 } from '../pages/E404/E404';
import onlineResources from '../files/onlineResources';
import { Dashboard } from '../pages/Dashboard/Dashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Home />} />
      <Route path="lessons" element={<Workspace set={ManifestSets.CORE} />} />
      <Route path="UoEDiv" element={<Workspace set={ManifestSets.UoEDiv} />} />
      <Route path="UoEDiv/:id" element={<Workspace set={ManifestSets.UoEDiv} />} />
      <Route path="lessons/:id" element={<Workspace set={ManifestSets.CORE} />} />
      <Route path="glossary" element={<Glossary />} />
      <Route path="guide" element={<Guide />} />
      <Route
        path="online-resources"
        element={<Resources resources={onlineResources} title="Online resources" />}
      />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<E404 />} />
    </Route>
  )
);

export const Routes = (): ReactElement => <RouterProvider router={router} />;
