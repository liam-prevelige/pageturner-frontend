// api.js: wrappers for all API endpoints

const API_URL = 'http://localhost:5001';

// A test endpoint to fetch some text from the backend
export const testEndpoint = async () => {
  const response = await fetch(`${API_URL}/test_endpoint`, {
    method: 'GET',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
    },
    body: {},
    cache: 'default',
  });
  const body = await response.json();

  if (!response.ok) {
    throw new Error('Call to test_endpoint failed');
  }

  return body.test_result;
};

export const getFeed = async () => {
  const response = await fetch(`${API_URL}/feed/get`, {
    method: 'GET',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
    },
    body: {},
    cache: 'default',
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
    method: 'GET',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
    },
    cache: 'default',
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /topbooks failed');
  }
  return body.top;
};

// Returns the top recommended books
export const getTopRecs = async () => {
  const response = await fetch(`${API_URL}/toprecs`, {
    method: 'GET',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
    },
    cache: 'default',
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /toprecs failed');
  }

  return body.data;
};

// Search for a book
export const getSearch = async (query) => {
  console.log(sessionStorage.getItem('auth_token'));
  const response = await fetch(`${API_URL}/search/${query}`, {
    method: 'GET',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    // body: JSON.stringify({'Authorization': sessionStorage.getItem('auth_token')}),
    cache: 'default',
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
    method: 'GET',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
    },
    body: {},
    cache: 'default',
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /recommendations failed');
  }

  return body;
};
