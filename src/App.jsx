import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import { action as updateorderaction } from "./features/order/UpdateOrder";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />, // that affects entire pages (inc. cildren)
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader, // data fetching is fired off when loading, not rendering
        errorElement: <Error /> // this makes an error page be affected by AppLayout
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateorderaction
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
