// api.js: wrappers for all API endpoints

const API_URL = 'http://localhost:5001';

/**
 * Checks if auth_code is within 5 minutes of expiration and calls for token refresh if necessary
 * Essentially middleware for all API calls
 * TODO: if possible, convert to actual middleware
 */
export async function refreshToken() {
  const expiryDate = sessionStorage.getItem('expiry_date');
  if (!expiryDate) return;

  const diff = expiryDate - Date.now();
  if (diff < 300000) { // 5 minutes
    const response = await fetch(`${API_URL}/user/refresh_token`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('auth_token'),
        'refreshrequest': true,
      },
    });

    const body = await response.json();
    if (!response.ok) {
      throw new Error('Call to /refresh_token failed');
    }

    if (body.result.tokens && body.result.tokens.id_token != sessionStorage.getItem('auth_token')) {
      sessionStorage.setItem('auth_token', body.result.tokens.id_token);
      sessionStorage.setItem('expiry_date', body.result.tokens.expiry_date);
    }
  }
}

/**
 * TODO
 */
export async function onLogin() {
  const response = await fetch(`${API_URL}/user/on_login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorizationCode': sessionStorage.getItem('authorizationCode'),
    },
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /on_login failed');
  }

  sessionStorage.setItem('auth_token', body.result.tokens.id_token);
  sessionStorage.setItem('expiry_date', body.result.tokens.expiry_date);
  console.log('expiry date', body.result.tokens.expiry_date);

  console.log('onLogin body', body);

  return body.result;
}

/**
 * Updates a profile after being edited
 *
 * @param {dict} newProfile - new profile to be set as current user's profile
 */
export const updateProfile = async (newProfile) => {
  await refreshToken();
  const response = await fetch(`${API_URL}/user/update_profile`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    body: JSON.stringify({newProfile}),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /update_profile failed');
  }
  return body.result;
};

/**
 * /comments/postComment
 *
 * Gets all comments on the requested parent object
 * Requires user is logged in
 *
 * @param {string} pType - type of parent object to comment on
 * @param {string} pid - ID of parent object to comment on
 * @param {string} text - Content of the comment
 */
export const postComment = async (pType, pid, text) => {
  await refreshToken();
  await fetch(`${API_URL}/comments/post_comment`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    body: JSON.stringify({pid, pType, text}),
  });
};

// Search for a user based on a given query
export const searchUsers = async (query) => {
  await refreshToken();

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

// Get a user's books given their email
// This gives both their bookshelf and their read books
export const getUserBooks = async (email) => {
  await refreshToken();

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
  await refreshToken();

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
 * @param {string} email - email of user to remove as a friend
 * @return {boolean} success
 */
export async function removeFriend(email) {
  await refreshToken();

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

// Returns list of posts, which represent the feed to be displayed
export const getFeed = async (query) => {
  await refreshToken();

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
  await refreshToken();

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
};

// Search for a book given a query
export const getSearch = async (query) => {
  await refreshToken();

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
// Does this funtion only work if the query is submit-post? How is it different from getSearch?
export const getBookInfo = async (query) => {
  await refreshToken();

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
  await refreshToken();

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
  await refreshToken();

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
  await refreshToken();

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
  await refreshToken();

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
  await refreshToken();

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
  await refreshToken();

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

// Given a certain id, I want to get all *children* of that comment (and the original comment)
export const getComments = async (pid) => {
  await refreshToken();

  const response = await fetch(`${API_URL}/comments/get_comments`, {
    method: 'POST',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    cache: 'default',
    body: JSON.stringify({pid: pid}),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /user/friends failed');
  }
  return body.comments;
};

// Given a certain id, I want to get all *children* of that comment (and the original comment)
export const getComment = async (id) => {
  await refreshToken();

  if (!id) {
    throw new Error('No id provided');
  }
  const response = await fetch(`${API_URL}/comments/get_comment`, {
    method: 'POST',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    cache: 'default',
    body: JSON.stringify({id: id}),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /user/friends failed');
  }
  return body.comment;
};

/**
 * Fetches profile information
 *
 * @param {string} uid - new profile to be set as current user's profile
 */
export const getProfile = async (uid) => {
  await refreshToken();

  const response = await fetch(`${API_URL}/user/get_profile`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    body: JSON.stringify({uid: uid}),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /get_profile failed');
  }
  return body.result;
};

/**
 * Fetches replies to a comment, given the comment's id
 *
 * @param {string} id - new profile to be set as current user's profile
 * @return {array} replies - array of comment IDs replying to the comment
 */
export const getReplies = async (id) => {
  await refreshToken();

  if (!id) {
    throw new Error('No id provided');
  }
  const response = await fetch(`${API_URL}/comments/get_replies`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    body: JSON.stringify({id: id}),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error('Call to /get_replies failed');
  }
  return body.replies;
};

/**
 * Fetches all trends stored in databse
 *
 * @return {array} trends - array of trends
 */
export const getTrends = async () => {
  const response = await fetch(`${API_URL}/get_trends`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /get_trends failed');
  }
  return body.trends;
};

/**
 * Search all PageTurner content
 *
 * @param {string} searchString - the string to search with
 */
export const searchContent = async (searchString) => {
  await refreshToken();
  const response = await fetch(`${API_URL}/search/${searchString}`, 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
  });

  const body = await response.json();
  {
  if (!response.ok) {
    throw new Error('Call to /search failed');
  }
  return body;
}

