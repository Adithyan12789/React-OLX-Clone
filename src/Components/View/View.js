import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Contexts';

function View() {
  const [userDetails, setUserDetails] = useState({});
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (postDetails && postDetails.userId) {
          const res = await firebase.firestore().collection('Users').where("id", "==", postDetails.userId).get();
          res.forEach(doc => {
            setUserDetails(doc.data());
            console.log("User details:", doc.data());
          });
        } else {
          console.log("postDetails or userId is missing.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [postDetails, firebase]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username ? userDetails.username : "BlackHat"}</p>
            <p>{userDetails.phone ? userDetails.phone : "9074518287"}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
