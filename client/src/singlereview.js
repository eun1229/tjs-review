import {formatISO9075} from "date-fns";

export default function SingleReview({_id, rating, summary, reviewcontents, city, productstate, username, product, createdAt, updatedAt}) {
  let reviewusername = "";
  if (username) {
    reviewusername = username.username;
  }
  return <>
    <div className = "review">
      <h4>{reviewusername}</h4>
    <div className = "reviewtext">
      <p className = "info">
        <span className = "rating">{rating}/5  </span><br></br>
        <span className = "author">{city}, {productstate}  </span>
        <time>{formatISO9075(new Date(createdAt))}</time>
      </p>
      <p className = "summary">{reviewcontents}</p>
    </div>
    </div>
  </>
}