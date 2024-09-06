import ReactQuill from "react-quill";
import { useState} from 'react';
import { Navigate, useParams } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';

export default function ReviewPage() {
  const [city, setCity] = useState('');
  const [productstate, setProductState] = useState('');
  const [reviewcontents, setReviewContents] = useState('');
  const [rating, setRating] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const {id} = useParams();
  async function addNewReview(ev) {
    ev.preventDefault();
    const response = await fetch(`http://localhost:4000/addreview/${id}`, {
      method: 'POST', 
      body: JSON.stringify({city, productstate, reviewcontents, rating}),
      credentials: "include",
      headers: {'Content-Type': 'application/json'}
    });
    if (response.status === 200) {
      setRedirect(true);
    }
  }

  if(redirect) {
    return <Navigate to = {`/post/${id}`} />
  }

  return <>
  <form onSubmit = {addNewReview}>
    <input type = "summary" 
      value = {city} 
      placeholder = 'city' 
      onChange = {ev => setCity(ev.target.value)} />
    <input type = "summary" 
      value = {productstate} 
      placeholder = 'state' 
      onChange = {ev => setProductState(ev.target.value)}/>
    <div className="form-group">
         <div className="ratingradio">
           <input
             className="ratinginput"
             type="radio"
             name="ratingOptions"
             id="rating1"
             value="1"
            //  checked={data.rating === 1}
             onChange = {ev => setRating(parseInt(ev.target.value))}
           />
           <label htmlFor="rating1" className="form-check-label">1</label>
         </div>
         <div className="ratingradio">
           <input
             className="ratinginput"
             type="radio"
             name="ratingOptions"
             id="rating2"
             value="2"
            //  checked={form.level === 2}
             onChange = {ev => setRating(parseInt(ev.target.value))}
           />
           <label htmlFor="rating2" className="form-check-label">2</label>
         </div>
         <div className="ratingradio">
           <input
             className="ratinginput"
             type="radio"
             name="ratingOptions"
             id="rating3"
             value="3"
            //  checked={form.level === 3}
             onChange = {ev => setRating(parseInt(ev.target.value))}
           />
           <label htmlFor="rating3" className="form-check-label">3</label>
         </div>
         <div className="ratingradio">
           <input
             className="ratinginput"
             type="radio"
             name="ratingOptions"
             id="rating4"
             value="4"
            //  checked={form.level === 4}
             onChange = {ev => setRating(parseInt(ev.target.value))}
           />
           <label htmlFor="rating4" className="form-check-label">4</label>
         </div>
         <div className="ratingradio">
           <input
             className="ratinginput"
             type="radio"
             name="ratingOptions"
             id="rating5"
             value="5"
            //  checked={form.level === 5}
             onChange = {ev => setRating(parseInt(ev.target.value))}
           />
           <label htmlFor="rating5" className="form-check-label">5</label>
         </div>
       </div>
    <input type = "summary" 
      value = {reviewcontents} 
      placeholder = 'short review' 
      onChange = {ev => setReviewContents(ev.target.value)}/>
    <button>post</button>
  </form>
  </>
}