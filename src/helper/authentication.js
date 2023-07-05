const API = process.env.API;

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
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
  }
  next();
};

export const signout = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }
  next();
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    //to check whether this is the same user that is
    // there in the database
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const isAuthorised = (author) => {
  // check if the same use or not
  return isAuthenticated()?.user?.penname === author;
};
