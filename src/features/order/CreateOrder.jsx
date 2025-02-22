import { useState } from "react";
import {
  Form,
  Navigate,
  redirect,
  useActionData,
  useNavigation
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const username = useSelector((state) => state.user.username);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority
    ? Math.round(totalCartPrice * 0.2 * 100) / 100
    : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length > 0) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">{`Ready to order? Let's go!`}</h2>

      {/* <Form method="POST" action="/order/new"> */}
      {/* defaultValue={} is subject to change, but value={} is not.  */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? "Placing order now ..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// React Router can work just with <Form></Form> and action function. No need for javascript code and submit handlers, futhermore, no need for creating state variables here

// Whenever the Form is submitted behind the scenes, the Router calls this function action and passes in the submitted request.
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // parse data
  try {
    const parsedData = JSON.parse(data.cart);
    if (!Array.isArray(parsedData)) throw new Error("Invalid cart data");

    const finalData = {
      ...data,
      cart: parsedData,
      priority: data.priority === "true"
    };

    const errors = {};
    if (!isValidPhone(finalData.phone))
      errors.phone =
        "Please enter your correct phone number. We might need it to contact you.";
    if (Object.keys(errors).length > 0) return errors;

    // if appropriate data is presented, create a new order and redirect it
    const newOrder = await createOrder(finalData);

    // Get the cart empty. This way of manipulating data is a burden. Do not overuse.
    store.dispatch(clearCart());

    return redirect(`/order/${newOrder.id}`);
  } catch (error) {
    console.error("Error parsing cart data", error);
  }

  return null;
}

export default CreateOrder;
