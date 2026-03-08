import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import Homepage from "./pages/Homepage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";
// import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { FakeAuthProvider } from "./contexts/FakeAuth";
import SpinnerFullPage from "./components/SpinnerFullPage";
import ProductedRoute from "./pages/ProtectedRoute";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <FakeAuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/pricing" element={<Pricing />} />

              <Route path="/login" element={<Login />} />

              {/*  */}
              <Route
                path="/app"
                element={
                  <ProductedRoute>
                    <AppLayout />
                  </ProductedRoute>
                }
              >
                <Route index element={<Navigate to="cities" replace />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
                <Route path="*" element={<h2>App Page Not Found</h2>} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </FakeAuthProvider>
  );
}

export default App;
