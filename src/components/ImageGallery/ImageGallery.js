import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';


export default class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const key = '30472076-91990f645bc169d0b44b794c0';
    const prevQuery = prevProps.query;
    const currentQuery = this.props.query;
    const { page } = this.state;

    if (prevQuery !== currentQuery || prevState.page !== this.state.page) {
      console.log('Изменился query');
             this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${currentQuery}}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`По Вашему запросу ${currentQuery} ничего не найдено!`)
          );
        })
        .then(images=> this.setState({ images, status: 'resolved'}))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

 
  }
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page +1
    }))
  }





  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return <div>Введите запрос! </div>;
    }
    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <h1>{error.message} </h1>;
    }
    if (status === 'resolved') {
      return (
        <div>
          <ImageGalleryItem images={images} />
          <Button onClick={this.loadMore } />
        </div>
      );
    }
  }
}