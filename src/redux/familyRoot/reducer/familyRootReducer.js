import familyRootTypes from "../types/familyRootTypes";

const INITIAL_STATE = {
  characters: []
};

const familyRootReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case familyRootTypes.SET_FAMILY_NAME:
      return {
        ...state,
        familyName: action.payload
      }
    case familyRootTypes.SET_PRIMARY_ATTRIBUTE:
      return {
        ...state,
        primaryAttribute: action.payload
      }
    case familyRootTypes.ADD_NEW_CHARACTER:
      return {
        ...state,
        characters: [...state.characters, action.payload]
      }
    case familyRootTypes.SET_CHARACTER_PROPERTY:
      return {
        ...state,
        characters: action.payload
      }
    case familyRootTypes.SET_LAST_MAP_POSITION:
      return {
        ...state,
        characters: action.payload
      }
    case familyRootTypes.DEV_ONLY_SET_FAMILY_SEEDED_INFO:
      return {...action.payload}
    default:
      return state;
  }
}

export default familyRootReducer;



/* Example store:

familyName: 'xxx',
attribute: 0,
characters: [{
  name: 'john', 
  gender: appConstants.m, 
  parentId: ROOT, 
  partnerId: null, 
  petId: 0, 
  id: 0, 
  age: 0, 
  lastMapPosition: {x, y, location}, 
  partnerLeader: true, 
  color: constnats.RED, 
}]

*/