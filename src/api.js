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

export const getFeed = async () => {
  const response = await fetch(`${API_URL}/feed/get`, {
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
    throw new Error('Call to /feed/get failed');
  }

  return body.data;
};

// Returns the top rated books
export const getTopBooks = async () => {
  const response = await fetch(`${API_URL}/topbooks`, {
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
    throw new Error('Call to /topbooks/get failed');
  }

  return body.data;
};

// Search for a book
export const getSearch = async (query) => {
  console.log(sessionStorage.getItem('auth_token'));
  const response = await fetch(`${API_URL}/search/${query}`, {
    Method: 'GET',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    // body: JSON.stringify({'Authorization': sessionStorage.getItem('auth_token')}),
    Cache: 'default',
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /search failed');
  }

  return body;
};

// Get recommendations for a book (given its title)
export const getRecs = async (title) => {
  const response = await fetch(`${API_URL}/recommendations/${title}`, {
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
    throw new Error('Call to /recommendations failed');
  }

  return body;
};
