// api.js: wrappers for all API endpoints

const API_URL = 'http://localhost:5001';

// A test endpoint to fetch some text from the backend
export const testEndpoint = async () => {
  const response = await fetch(`${API_URL}/test_endpoint`, {
    Method: 'GET',
    Headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
    },
    Body: {},
    Cache: 'default',
  });
  const body = await response.json();

  if (!response.ok) {
    throw new Error('Call to test_endpoint failed');
  }

  return body.test_result;
};

// A test endpoint to fetch some text from the backend
export const getSearch = async (query) => {
  const response = await fetch(`${API_URL}/search/${query}`, {
    Method: 'GET',
    Headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
    },
    Body: {},
    Cache: 'default',
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to test_endpoint failed');
  }

  return body;
};
