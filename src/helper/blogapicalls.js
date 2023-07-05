import { isAuthenticated } from "./authentication";

const API = process.env.API;

export const createBlog = async (blog) => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/createblog/${user._id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blog),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateBlog = async ({ blog, _id }) => {
  const { user, token } = isAuthenticated();

  try {
    const response = await fetch(`${API}/updateblog/${_id}/${user._id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blog),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const deleteBlog = async (id) => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/removeblog/${id}/${user._id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getAllBlogs = async () => {
  try {
    const response = await fetch(`${API}/allblogs`, { method: "GET" });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getSpecficBlog = async (id) => {
  try {
    const response = await fetch(`${API}/getblog/${id}`, {
      method: "GET",
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getLatestBlogs = async () => {
  try {
    const response = await fetch(`${API}/latestblogs`, { method: "GET" });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getPopularBlogs = async () => {
  try {
    const response = await fetch(`${API}/popularblogs`, { method: "GET" });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getInitials = async () => {
  const [latestblogs, popularblogs] = await Promise.all([
    getLatestBlogs(),
    getPopularBlogs(),
  ]);
  return { latestblogs, popularblogs };
};
