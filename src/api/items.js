import { API_URL } from "@env";
import {
  storeObjectData,
  storeStringData,
  getStringData,
} from "../service/async_storage";

export default async function items(name) {
  const jwt = await getStringData("@jwt");
  const req = await fetch(
    `${API_URL}/api/items?filters[name][$containsi]=${name}`,
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
