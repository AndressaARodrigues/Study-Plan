const INITIAL_STATE = {
    recommendedDisciplines: [],
    /*
    recommendedDisciplines: {
    name: '',
    weight: '',
    value: '',
    include: '',
    semester: '',
    prerequisites: '',
  }
    */
};
  
const recommendationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'SET_RECOMMENDATIONS':
        return { 
            ...state, 
            recommendedDisciplines: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default recommendationReducer;
  