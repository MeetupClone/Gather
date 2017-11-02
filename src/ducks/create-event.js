
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


export function createEvent(componentState){
  return {
    type: CREATE_EVENT,
    payload: componentState
  }
}


export default function createEventReducer(state = initialState, action){
    switch(action.type){
      case CREATE_EVENT:
      axios.post('/api/event/create', action.payload).then(result => {
        return true
      })
        return Object.assign({}, state, action.payload)


          break;

          default :
               return state;
        }



}
