const INITIAL_STATE = {
  data: [],
  /*data: {
    nome: '',
    oferta: '',
    peso: '',
    valor: '',
    semestre: '',
    prerequisito: '',
  }*/
};

const disciplinesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_DISCIPLINES':
      return {
        ...state,
        data: action.payload, 
      };
    default:
      return state;
  }
};

export default disciplinesReducer;

