const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (total, currBlog) => total + currBlog.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (favorite, currBlog) => {
    if (currBlog.likes > favorite.likes) {
      return currBlog;
    }
    return favorite;
  };

  return blogs.reduce(reducer);
};

const authorBlogCount = (blogs) => {
  const reducer = (abcList, currBlog) => {
    // check if author exist in accList increment its count
    // otherwise add author to list with count 1
    const nameExists = abcList.find((a) => a.author === currBlog.author);
    if (nameExists) {
      // find index and update count
      const ind = abcList.indexOf(nameExists);
      abcList[ind].count += 1;
    } else {
      abcList.push({ author: currBlog.author, count: 1 });
    }
    return abcList;
  };

  // List of objects, [{author, blogs}, ...]
  return blogs.reduce(reducer, []);
};

const mostBlogs = (blogs) => {
  const blogCounts = authorBlogCount(blogs);
  const reducer = (top, current) => {
    if (current.count > top.count) {
      return current;
    }
    return top;
  };

  return blogCounts.reduce(reducer);
};

const mostLikes = (blogs) => {
  const reducer = (mostLiked, current) => {
    if (current.likes > mostLiked.likes) {
      return current;
    }
    return mostLiked;
  };

  const { author, likes } = blogs.reduce(reducer);
  return { author, likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  authorBlogCount,
  mostBlogs,
  mostLikes,
};
