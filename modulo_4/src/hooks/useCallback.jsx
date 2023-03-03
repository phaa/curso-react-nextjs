import P from 'prop-types';
import './App.css';
import React, { useState, useCallback } from 'react';

const Button = React.memo(function Button({ incrementButton }) {
  console.log('Filho, renderizou');
  return <button onClick={() => incrementButton(100)}>+</button>;
});

Button.propTypes = {
  incrementButton: P.func,
};

function App() {
  const [counter, setCounter] = useState(0);

  // useCallback serve para colocar uma função em cache e mantê-la entre os re-renders
  // pois a cada re-render, a função seria redeclarada. Uma função de fetch ou acesso a um BD
  // não precisa ser redeclarada o tempo todo, apenas se alguma chave que passa para o fetch ou
  // parâmetro mudar. Por isso passamos um array de dependências. Caso uma delas mude, aí que a
  // será redeclarada
  const incrementCounter = useCallback((num) => {
    setCounter((c) => c + num);
  }, []);

  console.log('Pai, renderizou');

  return (
    <div className="App">
      <p>Teste 3</p>
      <h1>C1: {counter}</h1>
      <Button incrementButton={incrementCounter} />
    </div>
  );
}

export default App;
