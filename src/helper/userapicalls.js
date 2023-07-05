import { isAuthenticated } from "./authentication";

const API = process.env.API;
export const getAuthorBlog = async (name) => {
  try {
    const response = await fetch(`${API}/getauthorblogs/${name}`, {
      method: "GET",
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateLinks = async (links) => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/links/${user._id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(links),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updatePic = async (pic) => {
  const { user, token } = isAuthenticated();
  pic = { photo: pic };
  try {
    const response = await fetch(`${API}/updatepic/${user._id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(pic),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
