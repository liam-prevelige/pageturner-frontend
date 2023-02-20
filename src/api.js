/* eslint-disable valid-jsdoc */
// api.js: wrappers for all API endpoints

const API_URL = (process.env.NODE_ENV === 'development') ? 'http://localhost:5001' : 'https://pageturner-backend.herokuapp.com';

/**
 * Checks if auth_code is within 5 minutes of expiration and calls for token refresh if necessary
 * Essentially middleware for all API calls
 * TODO: if possible, convert to actual middleware
 */
export async function refreshToken() {
  const expiryDate = sessionStorage.getItem('expiry_date');
  if (!expiryDate) {
    return;
  }

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
 * /:user/update_likes
 *
 * Update the likes on a post. Adds comment ID to user's liked list and updates post's metadata
 *
 */
export const updateLikes = async (cid) => {
  await refreshToken();

  const response = await fetch(`${API_URL}/comments/update_likes`, {
    method: 'POST',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    body: JSON.stringify({cid: cid}),
  });

  const res = await response.json();
  if (!response.ok) {
    throw new Error('Call to /user/update_likes failed');
  }
  return res.likedPosts;
};

/**
 * /:user/update_bookmarks
 *
 * Update a user's bookmarked posts. Adds comment ID to user's bookmarked list
 *
 */
export const updateBookmarks = async (cid) => {
  await refreshToken();

  const response = await fetch(`${API_URL}/user/update_bookmarks`, {
    method: 'POST',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    body: JSON.stringify({cid: cid}),
  });

  const res = await response.json();
  if (!response.ok) {
    throw new Error('Call to /user/update_likes failed');
  }
  return res.bookmarks;
};

/**
 * /:user/get_feed
 *
 * Gets all comments of user and user's following list
 * Requires user is logged in
 *
 */
export const getFeed = async (pageNumber) => {
  await refreshToken();

  const response = await fetch(`${API_URL}/user/get_feed`, {
    method: 'POST',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    body: JSON.stringify({pageNumber: pageNumber}),
    cache: 'default',
  });

  const res = await response.json();
  if (!response.ok) {
    throw new Error('Call to /user/get_feed failed');
  }
  return res.feed;
};

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
 * Creates a new group
 *
 * @param {dict} newGroupProfile - new group profile
 */
export const createGroup = async (newGroupProfile) => {
  await refreshToken();
  const response = await fetch(`${API_URL}/groups/create`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    body: JSON.stringify({newGroupProfile}),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /create failed');
  }
  return body.result;
};

/**
 * Updates a group profile after being edited
 *
 * @param {dict} newProfile - new group profile to be set as current group's profile
 */
export const updateGroupProfile = async (newProfile) => {
  await refreshToken();
  const response = await fetch(`${API_URL}/groups/update_profile`, {
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
 * Removes a member/admin from a group
 *
 * @param {dict} groupProfile - profile of the group that the given user is leaving
 * @param {string} memberId - Id of member being removed
 */
export const removeGroupMember = async (groupProfile, memberId) => {
  await refreshToken();
  const response = await fetch(`${API_URL}/groups/remove_member`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    body: JSON.stringify({groupProfile, memberId}),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /update_profile failed');
  }
  return body.result;
};

/**
 * /comments/post_comment
 *
 * Gets all comments on the requested parent object
 * Requires user is logged in
 *
 * @param {string} scope - type of parent object to comment on
 * @param {string} pid - ID of parent object to comment on. Sometimes just empty string
 * @param {string} ptype - the type of parent object. Can be 'book', 'bookshelf', 'comment', or ''
 * @param {string} text - Content of the comment
 */
export const postComment = async (scope, pid, ptype, text, otherData={}) => {
  await refreshToken();
  console.log('otherData', otherData);
  const response = await fetch(`${API_URL}/comments/post_comment`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    body: JSON.stringify(Object.assign({}, {pid, scope, ptype, text}, otherData)),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /search failed');
  }
  return body;
};

/**
 * /notifications/get_notification
 *
 * Gets all notifications on the requested parent object
 * Requires user is logged in
 *
 * @param {string} commenterId - id of user who replied to post
 * @param {string} cId - id of comment
 */
export const getNotifications = async () => {
  await refreshToken();

  const response = await fetch(`${API_URL}/notifications/get_notification`, {
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
  });
  const notifications = await response.json();
  if (!response.ok) {
    throw new Error('Failed to get notifications');
  }
  return notifications;
};

/**
 * /notifications/post_notification
 *
 * Sends notifications on replied posts
 * Requires user is logged in
 *
 * @param {string} recipientId - id of person to send notification
 * @param {string} cId - id of replied comment
 */
export const postNotification = async (recipientId, cId) => {
  await refreshToken();

  const response = await fetch(`${API_URL}/notifications/post_notification`, {
    method: 'POST',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    body: JSON.stringify({
      recipientId: recipientId,
      cId: cId,
    }),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /search failed');
  }
  return body;
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
 * Follow a user
 * @param {string} uid - uid of user to start following
 * @return {boolean} success
 */
export async function addFollower(uid) {
  await refreshToken();

  const response = await fetch(`${API_URL}/user/follower/add`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    cache: 'default',
    body: JSON.stringify({uid: uid}),
  });

  const body = await response.json();
  return body.success;
}

/**
 * Unfollow a user
 * @param {string} uid - uid of user to start following
 * @return {boolean} success
 */
export async function removeFollower(uid) {
  await refreshToken();

  const response = await fetch(`${API_URL}/user/follower/remove`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    cache: 'default',
    body: JSON.stringify({uid: uid}),
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
 * Fetches a user's posts using their token
 */
export const getPosts = async (uid) => {
  await refreshToken();

  const response = await fetch(`${API_URL}/user/get_posts`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    body: JSON.stringify({uid: uid}),
  });

  const res = await response.json();
  if (!response.ok) {
    throw new Error('Call to /get_posts failed');
  }
  return res.posts;
};

/**
 * Fetches a user's posts using their token
 */
export const getLikedPosts = async (uid) => {
  await refreshToken();

  const response = await fetch(`${API_URL}/user/get_liked_posts`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    body: JSON.stringify({uid: uid}),
  });

  const res = await response.json();
  if (!response.ok) {
    throw new Error('Call to /get_liked_posts failed');
  }
  return res.likedPosts;
};

/**
 * Fetches the accounts a user follows
 */
export const getFollowing = async (uid) => {
  await refreshToken();

  const response = await fetch(`${API_URL}/user/get_following`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    body: JSON.stringify({uid: uid}),
  });

  const res = await response.json();
  if (!response.ok) {
    throw new Error('Call to /user/get_following failed');
  }
  return res;
};

/**
 * Fetches a user's followers
 */
export const getFollowers = async (uid) => {
  await refreshToken();

  const response = await fetch(`${API_URL}/user/get_followers`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    body: JSON.stringify({uid: uid}),
  });

  const res = await response.json();
  if (!response.ok) {
    throw new Error('Call to /user/get_followers failed');
  }
  return res;
};

/**
 * Fetches profile information
 *
 * @param {string} id - new profile to be set as current user's profile
 */
export const getGroupProfile = async (id) => {
  await refreshToken();


  const response = await fetch(`${API_URL}/groups/get_profile`, {
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
    throw new Error('Call to /groups/get_profile failed');
  }
  return body.result;
};

/**
 * Fetches replies to a comment, given the comment's id
 *
 * @param {string} id - id of comment
 * @return {array} replies - array of comment IDs replying to the comment
 */
export const getReplies = async (id) => {
  await refreshToken();

  if (!id) {
    throw new Error('No id provided');
  }

  const response = await fetch(`${API_URL}/comments/replies/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error('Call to /get_replies failed');
  }
  return body.replies;
};

/**
* Creates a new bookshelf
*/
export const createBookshelf = async (name, ownerId, ownerType) => {
  await refreshToken();

  const response = await fetch(`${API_URL}/bookshelves/create`, {
    method: 'POST',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    cache: 'default',
    body: JSON.stringify({
      name: name,
      ownerId: ownerId,
      ownerType: ownerType,
    }),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /bookshelves/create failed');
  }
  return body._id;
};

/**
 * Adds a book to an existing bookshelf
*/
export const addBookToBookshelf = async (bookId, bookshelfId) => {
  await refreshToken();

  const response = await fetch(`${API_URL}/bookshelves/modify`, {
    method: 'POST',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    cache: 'default',
    body: JSON.stringify({
      bookId: bookId,
      shelfId: bookshelfId,
      op: 'add',
    }),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /bookshelves/modify failed');
  }
  return body;
};

/**
 * Fetches one bookshelf given a user ID
 *
 * @return {dict} bookshelf - bookshelf object
 */
export const getBookshelf = async (bookshelfId) => {
  await refreshToken();

  const response = await fetch(`${API_URL}/bookshelves/get_bookshelf`, {
    method: 'POST',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    cache: 'default',
    body: JSON.stringify({
      bookshelfId: bookshelfId,
    }),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /bookshelves/get_bookshelves failed');
  }
  return body.bookshelf;
};

/**
 * Fetches all bookshelves owned by a user
 *
 * @return {array} replies - get bookshelves owned by a user
 */
export const getBookshelves = async (ownerId, ownerType) => {
  await refreshToken();

  const response = await fetch(`${API_URL}/bookshelves/get_bookshelves`, {
    method: 'POST',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    cache: 'default',
    body: JSON.stringify({
      ownerId: ownerId,
      ownerType: ownerType,
    }),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /bookshelves/get_bookshelves failed');
  }
  return body.bookshelves;
};

/**
 * Fetches book clubs that a user is a member of, given the user's id
 *
 * @param {string} uid - user id
 * @return {array} replies - array of book clubs / groups the user is a part of
 */
export const getBookClubs = async (uid) => {
  await refreshToken();

  const response = await fetch(`${API_URL}/groups/get_book_clubs`, {
    method: 'POST',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    cache: 'default',
    body: JSON.stringify({uid: uid}),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /user/get_book_clubs failed');
  }
  return body;
};

/**
 * Returns info about a single book
 *
 * @param {string} bookId - the ID of the book to get
 */
export const getBook = async (bookId) => {
  const response = await fetch(`${API_URL}/books/${bookId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /books/search failed');
  }
  return body;
};

/*
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
  const response = await fetch(`${API_URL}/search/${searchString}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error('Call to /search failed');
  }
  return body;
};

/*
 * Fetches global feed from database
 *
 * @return {array} feed - array of comments
 */
export const getGlobalFeed = async (pageNumber) => {
  const response = await fetch(`${API_URL}/get_global_feed`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('auth_token'),
    },
    body: JSON.stringify({pageNumber: pageNumber}),
  });

  const res = await response.json();
  if (!response.ok) {
    throw new Error('Call to /get_global_feed failed');
  }
  return res.feed;
};
