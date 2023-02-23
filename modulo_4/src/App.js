import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [reverse, setReverse] = useState(false);
  const [counter, setCounter] = useState(0);
  const reverseClass = reverse ? 'reverse' : '';

  const handleClick = () => {
    // quando utilizamos o recebimento do estado anterior no setState
    // poderemos garantir a integridade dos dados
    setReverse((reverse) => !reverse);
  };

  const handleIncrement = () => {
    setCounter((counter) => counter + 1);
  };

  // Sem passar uma lista, o hook é acionado toda vez que o componente for atualizado
  useEffect(() => {
    console.log('Component did mount');
  }, []);

  // Passando uma lista vazia, o hook será acionado apenas na montagem do componente
  useEffect(() => {
    console.log('Component did mount');
  }, []);

  // Passando variáveis na lista, indica que o hook será acionado apenas quando uma
  // dessa(s) dependência(s) for(em) alteradas
  useEffect(() => {
    console.log('Component did mount');
  }, [reverse]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className={`App-logo ${reverseClass}`} alt="logo" />

        <h1>Contador: {counter}</h1>

        <p>
          <button type="button" onClick={handleClick}>
            Reverse {reverseClass}
          </button>
        </p>

        <p>
          <button type="button" onClick={handleIncrement}>
            Increment {counter}
          </button>
        </p>
      </header>
    </div>
  );
}

export default App;
