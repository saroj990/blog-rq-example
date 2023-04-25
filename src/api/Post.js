import axios from "axios";

const posts = [
  {
    title: "Introduction to React",
    description: "desc",
    author: "Saroj Sasamal",
    id: 1,
    likes: 12,
    views: 100,
  },
  {
    title: "Introduction to Vue",
    description: "desc",
    author: "Saroj Sasamal1",
    id: 2,
    likes: 100,
    views: 120,
  },
];
export async function getPosts() {
  // place to do mongo call
  const response = await axios.get("http://localhost:3001/posts");
  return response.data;
}

export async function getPost(id) {
  const response = await axios.get(`http://localhost:3001/posts/${id}`);
  return response.data;
}

export async function updatePost({ id, title, description }) {
  const response = await axios.put(`http://localhost:3001/posts?id=${id}`, {
    title,
    description,
  });
  return response.data;
}
export async function deletePost(id) {
  const response = await axios.delete(`http://localhost:3001/posts/${id}`);
  return response.data;
}
export async function createPost({ title, description }) {
  const response = await axios.post("http://localhost:3001/posts", {
    title,
    description,
  });
  return response.data;
}
