import ReactQuill from "react-quill";
import { useState } from 'react';
import {Navigate} from "react-router-dom";
import 'react-quill/dist/quill.snow.css';

export default function CreatePage() {
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [summary, setSummary] = useState('');
  const [files, setFiles] = useState('');
  const [city, setCity] = useState('');
  const [productstate, setProductState] = useState('');
  const [rating, setRating] = useState(0);
  const [redirect, setRedirect] = useState(false);
  async function createNewReview(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('review', review);
    data.set('files', files[0]);
    data.set('city', city);
    data.set('productstate', productstate);
    data.set('reviewcontents', summary);
    data.set('rating', rating);
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/create', {
      method: 'POST', 
      body: data,
      credentials: "include",
    });
    console.log(response.insertedId);
    if (response.status === 200) {
      setRedirect(true);
    }
  }

  async function addNewReview(ev) {
    ev.preventDefault();

  }

  if(redirect) {
    return <Navigate to = {'/'} />
  }

  return <>
  <form onSubmit = {createNewReview}>
    <input type = "title" 
      value = {title} 
      placeholder = 'product name' 
      onChange = {ev => setTitle(ev.target.value)} />
    <input type = "summary" 
      placeholder = 'short review' 
      onChange = {ev => setSummary(ev.target.value)}/>
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
       <input type = "file"
      onChange = {ev => setFiles(ev.target.files)}/>
    <button>post</button>
  </form>
  </>
}