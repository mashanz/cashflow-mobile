import { API_URL } from "@env";
import { API_URL } from "@env";
import {
  storeObjectData,
  storeStringData,
  getStringData,
} from "../service/async_storage";

export default async function categories() {
  const jwt = await getStringData("@jwt");
  const req = await fetch(`${API_URL}/api/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  const res = await req.json();
  console.log(res);
  return res;
}
