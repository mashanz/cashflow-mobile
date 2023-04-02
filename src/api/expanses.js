import { API_URL } from "@env";
import {
  storeObjectData,
  storeStringData,
  getStringData,
} from "../service/async_storage";

export async function getExpanse() {
  const jwt = await getStringData("@jwt");
  const req = await fetch(
    `${API_URL}/api/expanses?populate=*&sort=price%3Adesc`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  const res = await req.json();
  return res;
}

const apiAddExpanse = async (
  item_id,
  category_id,
  price,
  transaction,
  quantity
) => {
  console.log("API TRIGER");
  const jwt = await getStringData("@jwt");
  const req = await fetch(`${API_URL}/api/expanses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      data: {
        item: item_id,
        category: category_id,
        price: price,
        transaction: transaction,
        quantity: quantity,
      },
    }),
  });

  const res = await req.json();
  return res;
};

export default apiAddExpanse;
