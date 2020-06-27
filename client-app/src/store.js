import { createStore } from 'redux'

const initialState = {
  sidebarShow: 'responsive'
}

const changeState = (state = initialState, { type, ...rest } = {}) => {
  if (type === 'set') {
    return {...state, ...rest }
  }
  else {
    return state
  }
}

const store = createStore(changeState)
export default store