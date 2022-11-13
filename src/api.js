// api.js: wrappers for all API endpoints

const API_URL = 'http://localhost:5001';

/**
 * TODO
 */
export async function onLogin() {
  await fetch(`${API_URL}/user/on_login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
  });
  // We don't care about the result here
}

export const getFeed = async () => {
  const response = await fetch(`${API_URL}/feed/get`, {
    method: 'GET',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
    },
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
    method: 'GET',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
    },
    cache: 'default',
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /topbooks/get failed');
  }

  return body.data;
};

// Search for a book
export const getSearch = async (query) => {
  const response = await fetch(`${API_URL}/search/${query}`, {
    Method: 'GET',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
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
