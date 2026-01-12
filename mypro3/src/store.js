import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  modalShow: true,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest } //rest 는 왜 펼치는거야?
    case 'setModal':
      state.modalShow = false
      return state
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
