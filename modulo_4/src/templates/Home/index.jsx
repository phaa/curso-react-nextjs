import { useEffect, useRef, useState } from 'react';

const isObjectEqual = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export const useFetch = (url, options) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const urlRef = useRef(url);
  const optionsRef = useRef(options);

  useEffect(() => {
    let changed = false;

    if (!isObjectEqual(url, urlRef.current)) {
      urlRef.current = url;
      changed = true;
    }

    if (!isObjectEqual(options, optionsRef.current)) {
      optionsRef.current = options;
      changed = true;
    }

    if (changed) {
      setShouldLoad((s) => !s);
    }
  }, [url, options]);

  useEffect(() => {
    // wait será para dizer se o hook deve mudar seu estado ou não
    let wait = false;
    const controller = new AbortController();
    const signal = controller.signal();

    setLoading(true);

    const fetchData = async () => {
      await new Promise((r) => setTimeout(r, 200));

      try {
        const response = await fetch(urlRef.current, {
          signal,
          ...optionsRef.current,
        });
        const jsonResult = await response.json();

        if (!wait) {
          setResult(jsonResult);
          setLoading(false);
        }
      } catch (error) {
        if (!wait) {
          setLoading(false);
          console.log(error);
        }
        throw error;
      }
    };

    fetchData();

    // função cleaner
    return () => {
      // ao desmontar o componente, setamos o wait para false
      // assim, ele não muda de estado desnecessariamente
      // já que haverá um promise async ainda rodando
      // quando terminar o fetch, a função verificará se ainda
      // pode ou não mudar de estado.
      wait = true;
      controller.abort();
    };
  }, [shouldLoad]);

  return [result, loading];
};

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
