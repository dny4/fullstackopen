import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogList from './BlogList'

let blogs = [
  {
    'title': 'How to change tractor power cells',
    'author': 'Robbie Pavel',
    'url': 'http://galaxyrepairs.com/how-to/robbie/id1234',
    'likes': 12,
    'user': {
      'name': 'superuser',
      'username': 'root',
      'id': '653b98bdd36cd693be861940'
    },
    'id': '653b98bed36cd693be8619a2'
  },
  {
    'title': 'Not so bloggie',
    'author': 'karen Monjave',
    'url': 'http://localhot:3003/api/blogs/id2',
    'likes': 18,
    'user': {
      'name': 'superuser',
      'username': 'root',
      'id': '653b98bdd36cd693be861940'
    },
    'id': '653b98bed36cd693be8619a3'
  }
]

test('renders blog list', () => {
  const container = render(<BlogList blogs={blogs} />).container

  const elements = container.querySelectorAll('.blog')

  expect(elements[0]).toHaveTextContent(blogs[0].title)
  const button = elements[0].getByType('button')
  expect(button).toBeDefined()

})





