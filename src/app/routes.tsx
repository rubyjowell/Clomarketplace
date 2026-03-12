import { createBrowserRouter } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import Marketplace from "./pages/Marketplace";
import ItemDetail from "./pages/ItemDetail";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import ListItem from "./pages/ListItem";
import Profile from "./pages/Profile";
import BuyCredits from "./pages/BuyCredits";
import Favourites from "./pages/Favourites";
import UserProfile from "./pages/UserProfile";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Landing />
      </Layout>
    ),
  },
  {
    path: "/signin",
    element: (
      <Layout>
        <SignIn />
      </Layout>
    ),
  },
  {
    path: "/marketplace",
    element: (
      <Layout>
        <Marketplace />
      </Layout>
    ),
  },
  {
    path: "/item/:id",
    element: (
      <Layout>
        <ItemDetail />
      </Layout>
    ),
  },
  {
    path: "/checkout/:id",
    element: (
      <Layout>
        <Checkout />
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "/list-item",
    element: (
      <Layout>
        <ListItem />
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: "/favourites",
    element: (
      <Layout>
        <Favourites />
      </Layout>
    ),
  },
  {
    path: "/buy-credits",
    element: (
      <Layout>
        <BuyCredits />
      </Layout>
    ),
  },
  {
    path: "/user-profile",
    element: (
      <Layout>
        <UserProfile />
      </Layout>
    ),
  },
  {
    path: "*",
    element: (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="font-['Libre_Caslon_Display',sans-serif] text-4xl mb-4">
              404
            </h1>
            <p className="font-['Inter',sans-serif] text-gray-600">
              Page not found
            </p>
          </div>
        </div>
      </Layout>
    ),
  },
]);