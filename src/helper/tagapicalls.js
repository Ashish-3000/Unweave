const API = process.env.API;



export const getTaggedBlogs = async (name) => {
  try {
    const response = await fetch(`${API}/tag/${name}`, {
      method: "GET",
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
