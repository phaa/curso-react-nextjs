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
