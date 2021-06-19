import axios from 'axios';

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

// export async function getLinks() {
//   try {
//     const { data } = await axios.get(`${ BASE }/links`);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function getTagsByLink(userId) {
//   try {
//     const { data } = await axios.get(`${ BASE }/links/${ linkId }/tags`);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }