import './styles.css';
import { Component, useCallback, useEffect, useState } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';


export const Home = () => {
  // Variáveis de estado
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(2);
  const [searchValue, setSearchValue] = useState("");

  const noMorePosts = page + postsPerPage >= allPosts.length;
  const shownPosts = !!searchValue ? // !! transforma o valor de uma variavel em um booleano
    allPosts.filter(post => {
      // Se o título do post contem o valor da busca, 
      // coloca ele num array. (toLowerCase apenas para igualar)
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
    : posts;

  // ctrl + espaço para autoimport]
  // Aqui utilizamos useCallback para que, quando o componente de funçao for re-renderizado, o react engine
  // não acababe criando outra função 
  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsWithPhotos = await loadPosts();
    setPosts(postsWithPhotos.slice(page, postsPerPage));
    setAllPosts(postsWithPhotos);
  }, []); // Não precisa colocar dependencias porque já coloquei como parâmetro da função

  // ctrl + shift + i auto indent
  const handleLoadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    // Spread operator equivale a demonstar um array e passá-lo como elementos individuais
    // const soma = (x,y,z) => x+y+z;
    // const arr = [1,2,3];
    // soma(...arr) equivale a soma(arr[0], arr[1, arr[2])
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  }

  // Equivale ao componentDidMount, componentDidUpdate e componentWillUnmount
  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  return (
    <section className="container">
      <div className="search-container">
        <h1>Pesquisar:
          {!!searchValue && (
            <>{" " + searchValue}</>
          )}
        </h1>

        <TextInput onChange={handleChange} value={searchValue} />
      </div>

      {shownPosts.length > 0 && (
        <Posts posts={shownPosts} />
      )}

      {shownPosts.length === 0 && (
        <h4>Não há nenhum post aqui 😕</h4>
      )}

      <div className="button-wrapper">
        {!searchValue && (
          <Button
            text={"Carregar mais"}
            disabled={noMorePosts} onClick={handleLoadMorePosts} />
        )}
      </div>
    </section>
  );
}

