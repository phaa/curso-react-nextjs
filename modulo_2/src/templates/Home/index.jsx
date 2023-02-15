import './styles.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }
  // ctrl + espaço para autoimport 
  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsWithPhotos = await loadPosts();
    this.setState({
      posts: postsWithPhotos.slice(page, postsPerPage),
      allPosts: postsWithPhotos
    });
  }

  // ctrl + shift + i auto indent
  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const shownPosts = !!searchValue ?
      allPosts.filter(post => {
        // Se o título do post contem o valor da busca, 
        // coloca ele num array. (toLowerCase apenas para igualar)
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      })
      : posts;

    return (
      <section className="container">
        <div className="search-container">
          <h1>Pesquisar: 
            {!!searchValue && (
              <>{" "+searchValue}</>
            )}
          </h1>

          <TextInput onChange={this.handleChange} value={searchValue} />
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
              disabled={noMorePosts} onClick={this.loadMorePosts} />
          )}
        </div>
      </section>
    );
  }
}
