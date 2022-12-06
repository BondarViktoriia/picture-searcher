import { Component } from 'react';
import Modal from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };


  toggleModal = () => {
    this.setState(({ isModalOpen}) => ({
      isModalOpen: !isModalOpen,

   
    }));
  };

  render() {
    const { images: { hits }} = this.props;
    

    return (
      <>
        <ul>
          {hits.map(entry => (
            <li key={entry.id} >
              <img
                src={entry.webformatURL}
                alt={entry.tags}
                width="300"
                onClick={this.toggleModal}
                largeImageURL={entry.large}
               
              />
           
            </li>
            
          ))}
          {this.state.isModalOpen && (
        
          <Modal
            largeImageURL={hits.largeImageURL}
              tags={hits.tags}
              onClose={this.toggleModal}
              
          />
        )}
        </ul>

      </>
    );
  }
}

export default ImageGalleryItem;
