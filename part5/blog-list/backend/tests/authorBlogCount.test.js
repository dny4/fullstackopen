const { authorBlogCount } = require('../utils/list_helper');

const blogs = [
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 22,
  },
  {
    title: 'Original string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 29,
  },
  {
    title: 'Count nodes and more nodes',
    author: 'Edsger W. Dijkstra',
    likes: 120,
  },
  {
    title: 'Clean your code',
    author: 'Robert C. Martin',
    likes: 89,
  },
  {
    title: 'Clean your Architecture',
    author: 'Robert C. Martin',
    likes: 23,
  },

];

const blogCount = [
  {
    author: 'Edsger W. Dijkstra',
    count: 3,
  },
  {
    author: 'Robert C. Martin',
    count: 2,
  }];

describe('authors with their blog count', () => {
  const result = authorBlogCount(blogs);

  test('list of author and count', () => {
    expect(result).toEqual(blogCount);
  });
});
