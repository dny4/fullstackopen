const { mostBlogs } = require('../utils/list_helper');

describe('top author has most number of blogs', () => {
  const blogs = [
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 22,
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

  const expectedAuthor = {
    author: 'Robert C. Martin',
    count: 2,
  };

  test('top author by blog count', () => {
    expect(mostBlogs(blogs)).toEqual(expectedAuthor);
  });
});
