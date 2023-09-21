const Blog = require('../models/blog');
const User = require('../models/user');

const intitialUsers = [
  {
    name: 'Robert Pedlasky',
    username: 'robp',
  },
  {
    name: 'Ramesh Kumar',
    username: 'ramk',
  },
];

const initialBlogs = [
  {
    title: 'How to change tractor power cells',
    author: 'Robbie Pavel',
    url: 'http://galaxyrepairs.com/how-to/robbie/id1234',
    likes: 12,
  },

  {
    title: 'Not so bloggie',
    author: 'karen Monjave',
    url: 'http://localhot:3003/api/blogs/id2',
    likes: 18,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

const getValidId = async () => {
  const blogs = await Blog.find({});
  return blogs[0].id;
};

const getInvalidId = () => {
  const blog = new Blog({});
  return blog.id;
};

const getUserFromDb = async () => {
  const users = await User.find({});
};

module.exports = {
  intitialUsers,
  initialBlogs,
  blogsInDb,
  getValidId,
  getInvalidId,
  getUserFromDb,
};
