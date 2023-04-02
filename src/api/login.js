import { API_URL } from "@env";
import { storeObjectData, storeStringData } from "../service/async_storage";

const login = async (identifier, password) => {
  const req = await fetch(`${API_URL}/api/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: identifier,
      password: password,
    }),
  });

  const res = await req.json();

  await storeStringData("@jwt", res?.jwt || "");
  await storeObjectData("@user", res?.user || {});

  return res;
};

export default login;
