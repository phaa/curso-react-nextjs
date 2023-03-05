import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const Abc = () => {
  // eslint-disable-next-line
  const { slug, id } = useParams(); // parâmetros das rotas
  const location = useLocation();

  // use history serve para adicionar ações úteis de navegação
  // ao componente em uso
  const history = useHistory();

  console.log(location);
  console.log(history);

  return (
    <div>
      <h1>
        ABC {slug} {id}
      </h1>
    </div>
  );
};
