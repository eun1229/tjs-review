import {formatISO9075} from "date-fns";
import {Link} from "react-router-dom";

export default function ProductEntry({_id, title, summary, review, productimage, createdAt, author}) {
  let postusername = "";
  if (author) {
    postusername = author.username;
  }

  return <>
    <div className = "entry">
    <div className = "entryimage">
      <img src = {"http://localhost:4000/"+productimage}></img>
    </div>
    <div className = "entrytext">
      <Link to = {'/post/'+_id}>
        <h2>{title}</h2>
      </Link>
      <p className = "info">
      </p>
    </div>
    </div>
  </>
}