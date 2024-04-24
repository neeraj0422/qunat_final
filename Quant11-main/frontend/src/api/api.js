const apiRequest = async (url, method, data = {}, headers = {}) => {
  try {
    const queryString = new URLSearchParams(data).toString();
    const apiUrl = `https://qunat-final-1.onrender.com/${url}${
      method === 'GET' && queryString ? `?${queryString}` : ''
    }`;
    let token = localStorage.getItem('authToken');
    const response = await fetch(apiUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 6024,
        Authorization: `Bearer ${token}`,
        ...headers
      },
      body: method !== 'GET' ? JSON.stringify(data) : undefined
    });

    const responseData = await response.json();

    if (response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('isVerified');
      window.location.href = '/sign-in';
    }

    return { response, responseData };
  } catch (error) {
    return { error };
  }
};

export default apiRequest;
