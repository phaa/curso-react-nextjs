import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/custom/useFetch';

const Home = () => {
  // postID começa como um string vazia para não atrapalhar a url original do useFetch
  const [postId, setPostId] = useState('');
  const [result, loading] = useFetch(
    'https://jsonplaceholder.typicode.com/posts/' + postId,
    {
      headers: {
        abc: '1' + postId,
      },
    },
  );

  // O hook deve vir antes da condicional
  useEffect(() => {
    console.log('ID do post', postId);
  }, [postId]);

  if (loading) {
    return <p>Loading</p>;
  }

  const handleClick = (id) => {
    setPostId(id);
  };

  if (!loading && result) {
    return (
      <div>
        {result?.length > 0 ? (
          result.map((p) => (
            // se precisarmos chamar uma função handle que recebe parâmetros
            // e não a colocarmos dentro de uma função anônima
            // a aplicação poderá entrar em loop infinito
            <div key={`post-${p.id}`} onClick={() => handleClick(p.id)}>
              <p>{p.title}</p>
            </div>
          ))
        ) : (
          <div onClick={() => handleClick('')}>
            <p>{result.title}</p>
          </div>
        )}
      </div>
    );
  }

  return <h1>Oi</h1>;
};

export default Home;
