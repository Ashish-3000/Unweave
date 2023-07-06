const API = process.env.API;
import Cookies from "js-cookie";

export const signup = async (user) => {
  try {
    const response = await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const signin = async (user) => {
  try {
    const res = await fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "appliaction/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const authenticate = (data, next) => {
  Cookies.set("token", JSON.stringify(data), { expires: 7 });
  next();
};

export const signout = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }
  next();
};

export const isAuthenticated = () => {
  // console.log(JSON.parse(name).user);
  try {
    const name = Cookies.get("token");
    return JSON.parse(name);
  } catch (err) {
    return false;
  }
};

export const isAuthorised = (author) => {
  // check if the same use or not
  return isAuthenticated()?.user?.penname === author;
};
