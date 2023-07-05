import { isAuthenticated } from "./authentication";

const API = process.env.API;
export const addTag = async (tag) => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/createtag/${user._id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tag),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const removeThisTag = async (tag) => {
  const { user, token } = isAuthenticated();
  try {
    const resposne = await fetch(`${API}/removetag/${user._id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tag),
    });
    return await resposne.json();
  } catch (err) {
    console.log(err);
  }
};
