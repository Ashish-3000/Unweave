import { isAuthenticated } from "./authentication";

const API = process.env.API;

export const addSubscriber = async (subscriber) => {
  try {
    const response = await fetch(`${API}/addsubscriber`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriber),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const verifySubscriber = async (user) => {
  try {
    const res = await fetch(`${API}/verifySubscriber`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};
