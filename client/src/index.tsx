import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout.jsx';
import Home from './components/Home.jsx';
import Workspace from './components/Workspace/index.jsx';
import Glossary from './components/Help/Glossary.jsx';
import Guide from './components/Help/Guide.jsx';
import Resources from './components/Help/Resources.jsx';
import About from './components/About.jsx';
import { E404 } from './components/E404.jsx';
import onlineResources from './libraries/onlineResources.js';
import furtherReading from './libraries/furtherReading.js';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="lessons" element={<Workspace />} />
        <Route path="glossary" element={<Glossary />} />
        <Route path="guide" element={<Guide />} />
        <Route path="online-resources" element={<Resources resource={onlineResources} title="Online resources" />} />
        <Route path="further-reading" element={<Resources resource={furtherReading} title="Further reading" />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<E404 />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
