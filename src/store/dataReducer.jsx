const INITIAL_STATE = {
  data: {
    nome: '',
    matricula: '',
    email: '',
    moradia: '',
    cursoTecnico: '',
    saudeMental: '',
    vinculoTrabalho: '',
  }
};

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_DATA":
      return {
        ...state, 
        data: action.payload, 
      };
    default:
      return state;
  }
};

export default dataReducer;
