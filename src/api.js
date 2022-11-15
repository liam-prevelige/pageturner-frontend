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

// Search for a user
export const searchUsers = async (query) => {
  const response = await fetch(`${API_URL}/user/search/${query}`, {
    method: 'GET',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    cache: 'default',
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /search failed');
  }

  return body.result;
};

// Get a user's books
export const getUserBooks = async (email) => {
  const response = await fetch(`${API_URL}/user/books/${email}`, {
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

  return body;
};

/**
 * Add a friend
 * @param {string} email - email of user to add as a friend
 * @return {boolean} success
 */
export async function addFriend(email) {
  const response = await fetch(`${API_URL}/user/friend/add`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    body: JSON.stringify({friend_email: email}),
  });
  const body = await response.json();
  return body.success;
}

/**
 * Remove a friend
 * @param {string} email - email of user to add as a friend
 * @return {boolean} success
 */
export async function removeFriend(email) {
  const response = await fetch(`${API_URL}/user/friend/add`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    body: JSON.stringify({friend_email: email}),
  });
  const body = await response.json();
  return body.success;
}

export const getFeed = async (query) => {
  const response = await fetch(`${API_URL}/feed/get/${query}`, {
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

  return body;
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

// Search for a book
export const getBookInfo = async (query) => {
  const response = await fetch(`${API_URL}/book-info/${query}`, {
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
  isbn = isbn.replace('$', '');
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

// Add a book to a user's list of bookmarks (saved)
export const updateBookmarks = async (userEmail, isbn, exists) => {
  const response = await fetch(`${API_URL}/user/update_bookmarks/${userEmail}/${isbn}/${exists}`, {
    method: 'POST',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
    },
    cache: 'default',
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /user/update_bookmarks failed');
  }

  return body;
};

// Gets a user's list of bookmarked books' content (saved)
export const getBookmarks = async (userEmail) => {
  const response = await fetch(`${API_URL}/user/get_bookmarks/${userEmail}`, {
    method: 'POST',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
    },
    cache: 'default',
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /user/get_bookmarks failed');
  }

  return body;
};

// Add a book to a user's list of read books
export const updateRead = async (userEmail, isbn, exists) => {
  const response = await fetch(`${API_URL}/user/update_read/${userEmail}/${isbn}/${exists}`, {
    method: 'POST',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
    },
    cache: 'default',
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /user/update_read failed');
  }

  return body;
};

// Gets a user's list of read books' content
export const getRead = async (userEmail) => {
  const response = await fetch(`${API_URL}/user/get_read/${userEmail}`, {
    method: 'GET',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
    },
    cache: 'default',
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /user/get_read failed');
  }

  return body;
};

// Gets a user's friend list
export const getFriends = async () => {
  const response = await fetch(`${API_URL}/user/friends`, {
    method: 'GET',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    cache: 'default',
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /user/friends failed');
  }

  return body.friends;
};
