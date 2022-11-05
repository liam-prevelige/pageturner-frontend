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

// endpoint to add a new post to the database from the book-info page
export const postBookReview = async (user, isbn, text) => {
  const data = {
    user: user,
    isbn: isbn,
    text: text,
  };

  fetch(`${API_URL}/book-info/submit-post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  console.log('reached api');
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
    throw new Error('Call to /search failed');
  }

  return body;
};
