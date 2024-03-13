const { favoriteBlog } = require('../utils/list_helper');

describe('blog with most likes is favorite blog ', () => {
  test('most liked blog', () => {
    const blogs = [
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12,
      },
      {
        title: 'Daftr Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 100,
      },
      {
        title: 'Draft Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 2,
      },
    ];

    expect(favoriteBlog(blogs)).toEqual(blogs[1]);
  });
});
