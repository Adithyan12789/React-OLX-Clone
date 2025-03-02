import React, { useEffect } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { useContext, useState } from 'react/cjs/react.development';
import { FirebaseContext } from '../../store/Contexts';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {

  const navigate = useNavigate();

  const {firebase} = useContext(FirebaseContext);
  const [prod, setProd] = useState([]);

  const {setPostDetails} = useContext(PostContext);

  useEffect(() => {
    firebase.firestore().collection('products').get().then((snapshot) => {
      const allPost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id,
        }
      })
      setProd(allPost);
    })
  })

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {prod.map(items => {
            return(
              <div
            className="card"
            onClick={(() => {
              setPostDetails(items);
              navigate('/viewpost')
            })}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={items.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {items.price}</p>
              <span className="kilometer">{items.category}</span>
              <p className="name"> {items.name}</p>
            </div>
            <div className="date">
              <span>{items.createdAt}</span>
            </div>
          </div>
            )
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>

          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/black.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 100000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name">CHAMPION MAGNESIUM</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>

          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/i,sge3.jpeg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 125000</p>
              <span className="kilometer">Three Wheeler</span>
              <p className="name"> Bajaj Qute</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>

          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
          
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/images.jpeg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 950000</p>
              <span className="kilometer">Four Wheeler</span>
              <p className="name"> </p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
          
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/pulsar-150-sd-bajaj-bike-500x500.webp" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 150000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> Pulsar</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Posts;
