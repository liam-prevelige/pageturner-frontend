// api.js: wrappers for all API endpoints

const API_URL = 'http://localhost:5001';


/**
 * TODO
 */
export async function onLogin() {
  const response = await fetch(`${API_URL}/user/on_login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /on_login failed');
  }
  console.log(body);
  return body.result;
}

/**
 * Updates a profile after being edited
 *
 * @param {dict} newProfile - new profile to be set as current user's profile
 */
export const updateProfile = async (newProfile) => {
  console.log('new profile', newProfile);
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
  console.log('End updateProfile', body.result);
  return body.result;
};

/**
 * /comments/get_comments
 *
 * Gets all comments on the requested parent object
 *
 * @param {string} pid - ID of parent
 */
export const getComments = async (pid) => {
  await fetch(`${API_URL}/comments/get_comments`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    body: JSON.stringify({pid}),
  });
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
 * @param {string} email - email of user to remove as a friend
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

// Returns list of posts, which represent the feed to be displayed
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

// Returns the top rated books stored in the database
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

// Currently: Returns the books with the most ratings
// Eventually, we hope to return an individual user's top recommendations from the algorithm
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

// Search for a book given a query
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
// Does this funtion only work if the query is submit-post? How is it different from getSearch?
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
  console.log(body);
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

// Given a certain id, I want to get all *children* of that comment (and the original comment)
export const getComments = async (pid) => {
  const response = await fetch(`${API_URL}/coomments/get_comments`, {
    method: 'POST',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    cache: 'default',
    body: {pid: pid},
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /user/friends failed');
  }

  return body.comments;
};

// Given a certain id, I want to get all *children* of that comment (and the original comment)
export const getComment = async (id) => {
  const response = await fetch(`${API_URL}/coomments/get_comment`, {
    method: 'POST',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    cache: 'default',
    body: {id: id},
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /user/friends failed');
  }

  return body.comment;
};
