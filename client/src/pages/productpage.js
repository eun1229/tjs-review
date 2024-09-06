import { useEffect, useState, useContext } from "react";
import {useParams, Link} from "react-router-dom";
import {formatISO9075} from "date-fns";
import SingleReview from "../singlereview";
import {UserContext} from "../UserContext";

export default function ProductPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const {setUserInfo, userInfo} = useContext(UserContext);
  const {id} = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
    .then(response => {
      response.json().then(postInfo => {
        setPostInfo(postInfo);
      });
    })
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  let firstseen = <></>

  useEffect(() => {
    fetch(`http://localhost:4000/reviews/${id}`).then(response => {
      response.json().then(reviews => {
        setReviews(reviews);
      });
    });
  }, []);

  if (!postInfo) {
    return <></>;
  }

  console.log(reviews.length);
  console.log(reviews[reviews.length]);
  if (reviews.length >= 1) {
    firstseen = <>
    <time><span className = "lastseen">last seen: </span>{formatISO9075(new Date(reviews[0].createdAt))} <span className = "lastseen">at </span> {reviews[0].city}, {reviews[0].productstate}</time><br></br>
    <time><span className = "lastseen">first seen: </span>{formatISO9075(new Date(reviews[reviews.length-1].createdAt))} <span className = "lastseen">at </span> {reviews[reviews.length-1].city}, {reviews[reviews.length-1].productstate }</time>
    </>
  }
  let linktoreview = '/';

  if (userInfo) {
    linktoreview = '/addreview/' + id;
  }

  return <>
    <div className = "productpage">
      <h1>{postInfo.title}</h1>
      <br></br>{firstseen}
      <div className = "productimage">
        <img src = {`http://localhost:4000/${postInfo.productimage}`}></img>
      </div>
      <div className = "productreviews">
        <p>original review: {postInfo.summary}</p>
      </div>
      <div className = "addreview">
        <Link to = {linktoreview}>
          <p>add a review</p>
        </Link>
      </div>
      <div className = "allreviews">
        <h3>all reviews</h3>
        {reviews.length > 0 && reviews.map(review => (
          <SingleReview {...review}/>
        ))}
      </div>
    </div>
  </>
}