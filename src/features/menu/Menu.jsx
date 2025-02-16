import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// Fast refresh only works when a file only exports components. To make fast refresh work we need to use a new file to share constants or functions between components.
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
