# PageTurner

![Team Photo](https://i.imgur.com/zO1h54j.jpg)

We all want to read more books. With PageTurner, reading can be fun again!

PageTurner is an social media platform centered around reading. On it, you can:
* Look up books, review them, and keep track of them in bookshelves stored on your profile
* Join book clubs: online communities centered around specific topics or groups
* Post about anything on your mind! You can attach books or bookshelves to your posts

If you've ever wanted to talk about your favorite books, this is the place for you.

## Architecture

Tech Stack: MongoDB, Express.js, React.js, Node.js

## Setup

PageTurner is currently hosted at https://pageturner.herokuapp.com/

To experience our website, simply go to the link and login.

Alternatively, you can run our software independently.

Install both the backend and frontend repository:
```
git clone https://github.com/dartmouth-cs98/project-22f-book-recommender.git
git clone https://github.com/dartmouth-cs98/project-22f-book-recommender-backend.git
```

Then, in separate terminals, install and start the backend and frontend projects:
```
cd project-22f-book-recommender
npm install
npm start
```
```
cd project-22f-book-recommender-backend
npm install
npm start
```

## User Guide

To most effectively use PageTurner, first login with Google, using the sign in button on the left bar.

PageTurner has four main pages: Home, Book Clubs, Notifications, and Profile.

### Home

The Home page has a search bar and a feed. 

#### Search Bar

The search bar allows you to access users, books, book clubs, and comments.

After typing in a query, hit enter. You will be shown a four paneled tab with the four options.

From there, you can click on the content you are interested in. 

People and book clubs will send you to their corresponding profile pages. 

Comments will send you to the post's threadview, where you can see the post itself as well as all replies to it.

Books will send you to the book's information page. Here, you can see a book's brief description as well as all reviews made on PageTurner. There are also buttons to add the book to one of your bookshelves or to buy it on Amazon

#### Feed

The feed can be toggled between global and personal feeds using the toggle just below the right side of the search bar. 

The global feed recieves all posts not made within a specific book club. It is sorted by recency. This is a great source for general content but is not targetted as much as the personal feed.

The personal feed contains all content made by any user you follow or within any book club you are in. Content made before a user has started following the author will not be present on the personal feed. This is a source for more targetted content.

You can click on the author of a post to go to their profile page or you may click on the post itself and be send to a threadview page. Here you will see the initial post as well as all replies to it.

### Book Clubs

Book clubs is where you will find smaller communities, designed to have more targetted content.

Users will see book clubs of which they are members as well as the top four most popular book clubs.

By clicking on a book club, you get to the club's recent feed page. Click more info for the profile page.

There, you get to the club's profile page, where you have the option to join.

### Notifications

The notifications page sends you notifications when another user follows you or likes your post.

### Profile

The profile page has four main tabs.

#### Bookshelves

The bookshelves tab is where you can see all of a user's bookshelves. 

On your own profile, there is also a button to create a new bookshelf.

#### Posts

On the posts tab, you can see all posts a user has made.

#### Bookmarks

On the bookmarks tab, you can see all posts a user has bookmarked, which can be done to any comment.

#### Likes

This is similar to bookmarks, except you see all posts a user has liked.

## Authors

* Alex Kruger
* Cameron Raker
* Joshua Pasaribu
* Liam Prevelige
* Noah Jerris
