const INITIAL_STATE = {
  //data: {
    nome: '',
    matricula: '',
    email: '',
    moradia: '',
    curso_tecnico: '',
    saude_mental: '',
    vinculo_trabalho: '',
  //}
};

const dataReducer = (state = [INITIAL_STATE], action) => {
  switch (action.type) {
    case "UPDATE_DATA":
      return {
        ...state, 
        //data: action.payload, 
        nome: action.nome,
        matricula: action.matricula,
        email: action.email,
        moradia: action.moradia,
        curso_tecnico: action.curso_tecnico,
        saude_mental: action.saude_mental,
        vinculo_trabalho: action.vinculo_trabalho,
      };
    default:
      return state;
  }
};

export default dataReducer;
