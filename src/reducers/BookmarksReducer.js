const defaultStore = {
  bookmarks: null,
  bookmarksState: 'UNDEFINED',
  newBookmarkState: 'UNDEFINED',
}

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
  case 'GET_BOOKMARKS_REQUEST':
    return { ...store, bookmarksState: 'GETTING_BOOKMARKS_IN_PROGRESS' }
  case 'GET_BOOKMARKS_SUCCESS':
    return { ...store, bookmarksState: 'GETTING_BOOKMARKS_SUCCESS', bookmarks: action.payload }
  case 'GET_BOOKMARKS_ERROR':
    return { ...store, bookmarksState: 'GETTING_BOOKMARKS_ERROR' }
  default:
    return { ...store }
  }
}

export default reducer
