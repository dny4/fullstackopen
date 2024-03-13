const { mostLikes } = require('../utils/list_helper');

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

const answer = {
  author: 'Edsger W. Dijkstra',
  likes: 120,
};

describe('author having a blog with most likes', () => {
  test('author with most liked blog', () => {
    expect(mostLikes(blogs)).toEqual(answer);
  });
});
