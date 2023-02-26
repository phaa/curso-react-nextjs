import { useRef, useState } from 'react';

const { useEffect } = require('react');

const useMyHook = (callback, delay = 1000) => {
  // Salvaremos a callback num useRef para persisti-la entre os re-renders
  const savedCallback = useRef();

  // Toda vez que mudar o callback, atualiza a ref dele
  // Aqui sava
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Toda vez que o delay mudar, ele executa o hook
  useEffect(() => {
    // O setInterval apontará sempre para a Ref que temos da callback
    // Assim, independente de quando alterarmos a callback, ele já sabe de onde chamar
    // Se não fosse por isso, executariamos sempre a callback do primeiro re-render,
    // já que o setInterval não "esquece" de suas props
    const interval = setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => {
      clearInterval(interval);
    };
  }, [delay]);
};

function App() {
  const [counter, setCounter] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [incrementor, setIncrementor] = useState(100);

  useMyHook(() => setCounter((c) => c + 1), delay);

  return (
    <div>
      <h1>Oi {counter}</h1>
      <h1>Delay {delay}</h1>
      <button
        onClick={() => {
          setDelay((d) => d + incrementor);
        }}
      >
        +{incrementor}
      </button>
      <button
        onClick={() => {
          setDelay((d) => d - incrementor);
        }}
      >
        -{incrementor}
      </button>
      <input
        type="number"
        value={incrementor}
        onChange={(e) => setIncrementor(Number(e.target.value))}
      />
    </div>
  );
}

export default App;
