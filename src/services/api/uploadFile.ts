// @ts-ignore
/* eslint-disable */

const isDev = process.env.NODE_ENV === 'development';
const API_DEV = 'http://127.0.0.1:7001/';
const API_PRO = 'https://api.limeetpet.com/';

export const uploadFileURL = () => {
  const baseURL = isDev ? API_DEV : API_PRO;
  return baseURL + 'api/material/upload';
};
