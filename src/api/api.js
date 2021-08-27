// import axios from 'axios';

export const getData = async (postId) => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getMockData = async () => {
  try {
    const res = await axios.get(`../public/mockdata/gltf.json`);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

// export const addPost = async (authUserId, post) => {
//   const { data } = await axios.post(`/api/posts/new/${authUserId}`, post)
//   return data
// }

// export const getComments = async (postId) {
//   return await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
// }

// export const postData = async (postParam) => {
//   return await axios(url, postParam);
// };
