import SessionReducer, * as FromSession from './SessionReducer'
import BookmarksReducer, * as FromBookmarks from './BookmarksReducer'

/**
 * ROOT REDUCER
 * combines all reducers
 */
const rootReducer = {
  ['BOOKMARKS']: BookmarksReducer,
  ['SESSION']: SessionReducer,
}

export default rootReducer