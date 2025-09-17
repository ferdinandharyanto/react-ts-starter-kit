import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import DefaultLayout from "@/layout/DefaultLayout";
import { Home } from "@features/Feature1/pages";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <DefaultLayout title="My App">
              <Outlet />
            </DefaultLayout>
          }
        >
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter
