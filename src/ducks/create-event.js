
import axios from 'axios';

const initialState = {
  eventPic: '',
  eventName: '',
  // uid: '',
  description: '',
  location: '',
  category: '',
  created: false,
  website: '',
  confirmModal: false
}

const CREATE_EVENT = 'CREATE_EVENT';

export function createEvent(initialState){
  return {
    type: createEvent,
    initialState
  }
}

export default function createEvent(state = initialState, action){
    switch(action.type){
      case CREATE_EVENT:
        createEvent(initialState => {
          console.log(initialState)
        })
          return Object.assign({}, state, { initialState })
          break;

          default :
               console.log('break error')
        }



}
