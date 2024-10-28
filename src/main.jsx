import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './styles/index.css'
import MainLayout from "./MainLayout";


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MainLayout />
  </BrowserRouter>
);
