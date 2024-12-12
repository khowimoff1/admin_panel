import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import App from "../App";
import CategoriesPage from "../pages/CategoriesPage/CategoriesPage";
import BrandsPage from "../pages/BrandsPage/BrandsPage";
import ModelsPage from "../pages/ModelsPage/ModelsPage";
import PlacesPage from "../pages/PlacesPage/PlacesPage";
import CitiesPage from "../pages/CitiesPage/CitiesPage";
import CarsPage from "../pages/CarsPage/CarsPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <LoginPage /> },
      {
        path: "",
        element: <HomePage />,
        children: [
          { path: "dashboard", element: <DashboardPage />},
          { path: "categories", element: <CategoriesPage /> },
          { path: "brands", element: <BrandsPage />},
          { path: "models", element: <ModelsPage />},
          { path: "places", element: <PlacesPage />},
          { path: "cities", element: <CitiesPage />},
          { path: "cars", element: <CarsPage />},

        ],
      },
    ],
  },
]);
