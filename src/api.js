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

  return body.recs;
};

// Search for a book
export const getSearch = async (query) => {
  const response = await fetch(`${API_URL}/search/${query}`, {
    method: 'GET',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
    },
    cache: 'default',
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /search failed');
  }

  return body;
};

// Get recommendations for a book (given its title)
export const getRecs = async (isbn) => {
  const response = await fetch(`${API_URL}/recommendations/${isbn}`, {
    method: 'GET',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
    },
    cache: 'default',
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /recommendations failed');
  }

  return body;
};
