import React, { Fragment, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Contexts';
import { useContext } from 'react/cjs/react.development';
import {useNavigate} from 'react-router-dom';

const Create = () => {

  const Navigate = useNavigate();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const {firebase} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext);

  const date = new Date();

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleCategory = (e) => {
    setCategory(e.target.value);
  }

  const handlePrice = (e) => {
    setPrice(e.target.value);
  }

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    if (!category.trim()) {
      errors.category = 'Category is required';
    }
    if (!price) {
      errors.price = 'Price is required';
    } else if (isNaN(price) || price <= 0) {
      errors.price = 'Price must be a valid number greater than zero';
    }
    if (!image) {
      errors.image = 'Image is required';
    }

    if (Object.keys(errors).length === 0) {
      firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref}) => {
        ref.getDownloadURL().then((url) => {
          console.log(url);
          firebase.firestore().collection('products').add({
            name,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: date.toDateString(),
          })

          Navigate('/');
        }) 
      })
    } else {
      setErrors(errors);
    }
  }

  return (
    <Fragment>
      <Header />
      <section className="create-section">
        <div className="centerDiv">
          <form className="create-form" onSubmit={handleSubmit}>
            <fieldset>
              <legend>Create a New Post</legend>
              
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  className="input"
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleName}
                  name="name"
                  aria-label="Name"
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  className="input"
                  type="text"
                  id="category"
                  value={category}
                  onChange={handleCategory}
                  name="category"
                  aria-label="Category"
                />
                {errors.category && <span className="error">{errors.category}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  className="input"
                  type="number"
                  id="price"
                  value={price}
                  onChange={handlePrice}
                  name="price"
                  aria-label="Price"
                />
                {errors.price && <span className="error">{errors.price}</span>}
              </div>

              {image && (
                <div className="image-preview">
                  <img src={URL.createObjectURL(image)} alt="Preview" width='100%' height='200px' />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  className="input"
                  type="file"
                  id="image"
                  onChange={handleImage}
                  name="image"
                  aria-label="Upload Image"
                />
                {errors.image && <span className="error">{errors.image}</span>}
              </div>
              
              <button className="uploadBtn" type="submit">Upload and Submit</button>
            </fieldset>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

export default Create;
