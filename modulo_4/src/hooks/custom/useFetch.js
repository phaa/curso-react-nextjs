import { useState, useEffect, useRef } from 'react';

const isObjectEqual = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export const useFetch = (url, options) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Usamos refs porque o mesmo valor (ou objeto) persistem entre os re-renders
  // e evita de criar loops infinitos por causa de mudança de estados
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
