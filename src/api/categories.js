import { API_URL } from "@env";
import { getStringData } from "../service/async_storage";

export async function addCategories(name) {
  const jwt = await getStringData("@jwt");
  const req = await fetch(`${API_URL}/api/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      data: {
        name: name,
      },
    }),
  });

  const res = await req.json();
  return res;
}

export default async function categories(name) {
  const jwt = await getStringData("@jwt");
  const req = await fetch(
    `${API_URL}/api/categories?filters[name][$containsi]=${name}`,
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
