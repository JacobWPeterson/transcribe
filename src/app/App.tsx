/* eslint-disable import/no-unassigned-import */
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.scss";

import { createRoot } from "react-dom/client";

import { Routes } from "./Routes";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(<Routes />);
