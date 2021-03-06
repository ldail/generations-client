import petRootTypes from "../types/petRootTypes";

const INITIAL_STATE = {
  pets: []
};

const petRootReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case petRootTypes.ADD_NEW_PET:
      return {
        ...state,
        pets: [...state.pets, action.payload]
      }
    case petRootTypes.DEV_ONLY_SET_PET_SEEDED_INFO:
      return {...action.payload}
    default:
      return state;
  }
}

export default petRootReducer;


/*Example Store:

  pets: [{name: 'whipper', type: pets.id, ownerId: 0, }]

*/