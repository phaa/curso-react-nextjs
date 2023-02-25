import { useContext } from 'react';
import { GlobalContext } from '../../contexts/AppContext';

// eslint-disable-next-line
export const P = () => {
  const context = useContext(GlobalContext);
  const {
    contextState: { body, counter },
    setContextState,
  } = context;
  return (
    <p
      onClick={() => setContextState((s) => ({ ...s, counter: s.counter + 1 }))}
    >
      {body} {counter}
    </p>
  );
};
