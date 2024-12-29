export const fetchPosts = async (filters) => {
  try {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(
      `http://localhost:5000/filtered-posts?${query}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // return data;
    return data.fetchPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
