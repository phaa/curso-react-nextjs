import P from 'prop-types';
import './App.css';
import React, { useCallback, useState } from 'react';

const Button = React.memo(function Button({ onClick }) {
  console.log('Filho renderizou');
  return (
    <button type="button" onClick={() => onClick(10)}>
      Increment
    </button>
  );
});

Button.propTypes = {
  onClick: P.func,
};

function App() {
  const [counter, setCounter] = useState(0);

  const handleIncrement = useCallback((num) => {
    setCounter((counter) => counter + num);
  }, []);

  console.log('Renderizou pai');
  return (
    <div className="App">
      <h1>Contador: {counter}</h1>
      <Button onClick={handleIncrement} />
    </div>
  );
}

export default App;
