import './styles.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 20,
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

  render() {
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    return (
      <section className="container">
        <Posts posts={posts} />
        <div className="button-wrapper">
          <Button 
          text={"Carregar mais"}
          disabled={noMorePosts} onClick={this.loadMorePosts} />
        </div>
      </section>
    );
  }
}
