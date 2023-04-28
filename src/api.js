import { coinId } from './__mocks__/coinId.js';
import { coinsList } from './__mocks__/coinsList.js';

export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    throw error;
  }
};

export const getBoards = async () => {
  try {
    const url = 'https://api.coingecko.com/api/v3/coins/list';
    const data = await fetchData(url); 
    return  data
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    throw error;
  }
};

export const getCoinInfo = async (id) => {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    const data = await fetchData(url); 
    return {
      ...data,
      name: data?.name?.length > 20 ? data.name.slice(0, 20) + '...' : data.name || 'Unknown',
      symbol: data?.symbol?.length > 10 ? data.symbol.slice(0, 20) + '...' : data.symbol || 'N/A',
    }
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    throw error;
  }
};
