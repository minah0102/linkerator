import axios from 'axios';

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLinks() {
  try {
    const { data } = await axios.get(`api/links`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function  getLinkById(linkId) {
  try {
    const { data } = await axios.get(`api/links/${linkId}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createLink({ link, comment, tagId }) {
  try {
    const { data } = await axios.post("/api/links", {
      tagId,
      link,
      clickCount: 0,
      comment,
      date: new Date();
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// export async function getTagsByLink(userId) {
//   try {
//     const { data } = await axios.get(`${ BASE }/links/${ linkId }/tags`);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }