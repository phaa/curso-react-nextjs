import { useReducer } from 'react';

const globalState = {
  title: 'O title do context',
  body: 'O body do context',
  counter: 0,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'muda': {
      console.log('Mudou para ', payload);
      return { ...state, title: payload };
    }
    case 'inverte': {
      console.log('Inverte');
      const { title } = state;
      return { ...state, title: title.split('').reverse().join('') };
    }
    default: {
      // mesmo que não faça nenhuma ação,
      // é necessário retornar pelo menos o estado anterior
      return { ...state };
    }
  }
};

function App() {
  // Com o useReducer, podemos trabalhar de maneira mais específica que o useState
  // podemos definir diferentes comportamentos para setar o estado da nossa aplicação
  // Inicialmente, passamos uma função reducer, responsável pelo fluxo de decisões e,
  // em seguida, um objeto contendo o estado inicial a ser armazenado.
  // Para nós é retornado um objeto com o estado para ser utilizado e uma função dispatch,
  // que serve para engatilhar a mudança de estado. Para a dispatch, geralmente passamos um objeto
  // contendo o tipo de ação e uma carga de informação (payload)
  const [state, dispatch] = useReducer(reducer, globalState);
  const { counter, title, body } = state;

  return (
    <div>
      <h1>
        {title} {counter}
      </h1>
      <p>{body}</p>
      <button onClick={() => dispatch({ type: 'muda', payload: 'Payload' })}>
        Click
      </button>
      <button onClick={() => dispatch({ type: 'inverte' })}>Inverter</button>
    </div>
  );
}

export default App;
