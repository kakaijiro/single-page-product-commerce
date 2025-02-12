import { Outlet } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";

// Outlet componet represents a child componet defined in App.jsx

function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
