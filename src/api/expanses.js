import { API_URL } from "@env";
import {
  storeObjectData,
  storeStringData,
  getStringData,
} from "../service/async_storage";

const apiAddExpanse = async (item_id, price, transaction, quantity) => {
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
