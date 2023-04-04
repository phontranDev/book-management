import axios from './axiosInstance';

export const getBookByCategoryId = async id => {
  try {
    const response = await axios.get(`/books/findByCategory`, {
      params: {id},
    });
    return response.data.dataList;
  } catch (error) {
    console.log(error);
  }
};
