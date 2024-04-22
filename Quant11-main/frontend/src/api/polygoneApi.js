// const polygonApiRequest = async (url, method, data = {}, headers = {}) => {
//   try {
//     const queryString = new URLSearchParams(data).toString();
//     const apiUrl = `https://api.polygon.io/v2${url}${
//       method === 'GET' && queryString ? `?${queryString}` : ''
//     }`;
//     const response = await fetch(apiUrl, {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//         'ngrok-skip-browser-warning': 6024
//       },
//       body: method !== 'GET' ? JSON.stringify(data) : undefined
//     });

//     const responseData = await response.json();

//     return { response, responseData };
//   } catch (error) {
//     return { error };
//   }
// };

// export default polygonApiRequest;

import { websocketClient } from '@polygon.io/client-js';

const createWebSocket = (options) => {
  const stocksWS = websocketClient(process.env.REACT_APP_POLYGON_API, options).stocks();

  stocksWS.onerror = (err) => console.log('Failed to connect', err);
  stocksWS.onclose = (code, reason) => console.log('Connection closed', code, reason);

  return stocksWS;
};

export default createWebSocket;
