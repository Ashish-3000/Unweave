import { isAuthenticated } from "./authentication";

const API = process.env.API;

export const addSubscriber = async (email) => {
  const { user, token } = isAuthenticated();

  try {
    const response = await fetch(`${API}/addSubscriber`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
