const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listEmpty = []
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: 'FpYW053o2RuUiJt5RgB61Bmc',
      title: 'The Intelligent Investor',
      author: 'Benjamin Graham',
      url: 'https://en.wikipedia.org/wiki/The_Intelligent_Investor',
      likes: 10,
      __v: 0
    },
    {
      _id: 'uagABTDP7o3op6tumagpxRhJ',
      title: 'Drunkard\'s Walk: How Randomness Rules Our Lives',
      author: 'Leonard Mlodinow',
      url: 'https://en.wikipedia.org/wiki/The_Drunkard%27s_Walk',
      likes: 3,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listEmpty)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(18)
  })
})

describe('favorite blog', () => {
  const listEmpty = []
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: 'FpYW053o2RuUiJt5RgB61Bmc',
      title: 'The Intelligent Investor',
      author: 'Benjamin Graham',
      url: 'https://en.wikipedia.org/wiki/The_Intelligent_Investor',
      likes: 10,
      __v: 0
    },
    {
      _id: 'uagABTDP7o3op6tumagpxRhJ',
      title: 'Drunkard\'s Walk: How Randomness Rules Our Lives',
      author: 'Leonard Mlodinow',
      url: 'https://en.wikipedia.org/wiki/The_Drunkard%27s_Walk',
      likes: 3,
      __v: 0
    }
  ]

  const listWithMultipleBlogsSameResults = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 15,
      __v: 0
    },
    {
      _id: 'FpYW053o2RuUiJt5RgB61Bmc',
      title: 'The Intelligent Investor',
      author: 'Benjamin Graham',
      url: 'https://en.wikipedia.org/wiki/The_Intelligent_Investor',
      likes: 15,
      __v: 0
    },
    {
      _id: 'uagABTDP7o3op6tumagpxRhJ',
      title: 'Drunkard\'s Walk: How Randomness Rules Our Lives',
      author: 'Leonard Mlodinow',
      url: 'https://en.wikipedia.org/wiki/The_Drunkard%27s_Walk',
      likes: 15,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.favoriteBlog(listEmpty)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      }
    )
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    expect(result).toEqual(
      {
        title: 'The Intelligent Investor',
        author: 'Benjamin Graham',
        likes: 10,
      })
  })

  test('of a bigger list with same likes returns the last position of the array', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogsSameResults)
    expect(result).toEqual(
      {
        title: 'Drunkard\'s Walk: How Randomness Rules Our Lives',
        author: 'Leonard Mlodinow',
        likes: 15,
      })
  })
})

describe('mostBlogs', () => {
  const listEmpty = []
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
      __v: 0
    },
    {
      _id: 'FpYW053o2RuUiJt5RgB61Bmc',
      title: 'The Intelligent Investor',
      author: 'Benjamin Graham',
      url: 'https://en.wikipedia.org/wiki/The_Intelligent_Investor',
      likes: 4,
      __v: 0
    },
    {
      _id: 'uagABTDP7o3op6tumagpxRhJ',
      title: 'Drunkard\'s Walk: How Randomness Rules Our Lives',
      author: 'Leonard Mlodinow',
      url: 'https://en.wikipedia.org/wiki/The_Drunkard%27s_Walk',
      likes: 3,
      __v: 0
    },
    {
      _id: 'uagABTDP7o3op6tumagpxRhJ',
      title: 'The Interpretation of Financial Statements',
      author: 'Benjamin Graham',
      url: 'https://www.goodreads.com/book/show/190445.The_Interpretation_of_Financial_Statements',
      likes: 1,
      __v: 0
    }
  ]

  const listWithMultipleBlogsSameResults = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Leonard Mlodinow',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
      __v: 0
    },
    {
      _id: 'FpYW053o2RuUiJt5RgB61Bmc',
      title: 'The Intelligent Investor',
      author: 'Benjamin Graham',
      url: 'https://en.wikipedia.org/wiki/The_Intelligent_Investor',
      likes: 4,
      __v: 0
    },
    {
      _id: 'uagABTDP7o3op6tumagpxRhJ',
      title: 'Drunkard\'s Walk: How Randomness Rules Our Lives',
      author: 'Leonard Mlodinow',
      url: 'https://en.wikipedia.org/wiki/The_Drunkard%27s_Walk',
      likes: 3,
      __v: 0
    },
    {
      _id: 'uagABTDP7o3op6tumagpxRhJ',
      title: 'The Interpretation of Financial Statements',
      author: 'Benjamin Graham',
      url: 'https://www.goodreads.com/book/show/190445.The_Interpretation_of_Financial_Statements',
      likes: 1,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.mostBlogs(listEmpty)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        blogs: 1
      }
    )
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    expect(result).toEqual(
      {
        author: 'Benjamin Graham',
        blogs: 2
      })
  })

  test('of a bigger list with same blog quantity returns the last position of the array', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogsSameResults)
    expect(result).toEqual(
      {
        author: 'Leonard Mlodinow',
        blogs: 2
      })
  })
})

describe('mostLikes', () => {
  const listEmpty = []
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithTwoBlogsSameAuthor = [
    {
      _id: 'FpYW053o2RuUiJt5RgB61Bmc',
      title: 'The Intelligent Investor',
      author: 'Benjamin Graham',
      url: 'https://en.wikipedia.org/wiki/The_Intelligent_Investor',
      likes: 4,
      __v: 0
    },
    {
      _id: 'uagABTDP7o3op6tumagpxRhJ',
      title: 'The Interpretation of Financial Statements',
      author: 'Benjamin Graham',
      url: 'https://www.goodreads.com/book/show/190445.The_Interpretation_of_Financial_Statements',
      likes: 6,
      __v: 0
    }
  ]

  const multipleAuthors = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Leonard Mlodinow',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
      __v: 0
    },
    {
      _id: 'FpYW053o2RuUiJt5RgB61Bmc',
      title: 'The Intelligent Investor',
      author: 'Benjamin Graham',
      url: 'https://en.wikipedia.org/wiki/The_Intelligent_Investor',
      likes: 4,
      __v: 0
    },
    {
      _id: 'uagABTDP7o3op6tumagpxRhJ',
      title: 'Drunkard\'s Walk: How Randomness Rules Our Lives',
      author: 'Leonard Mlodinow',
      url: 'https://en.wikipedia.org/wiki/The_Drunkard%27s_Walk',
      likes: 3,
      __v: 0
    },
    {
      _id: 'uagABTDP7o3op6tumagpxRhJ',
      title: 'The Interpretation of Financial Statements',
      author: 'Benjamin Graham',
      url: 'https://www.goodreads.com/book/show/190445.The_Interpretation_of_Financial_Statements',
      likes: 21,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.mostLikes(listEmpty)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        likes: 5
      }
    )
  })

  test('when list has two blogs equals the sum of likes of each blog', () => {
    const result = listHelper.mostLikes(listWithTwoBlogsSameAuthor)
    expect(result).toEqual(
      {
        author: 'Benjamin Graham',
        likes: 10
      }
    )
  })

  test('when list has multiple authors, returns the author with highest sum of likes', () => {
    const result = listHelper.mostLikes(multipleAuthors)
    expect(result).toEqual(
      {
        author: 'Benjamin Graham',
        likes: 25
      }
    )
  })

})