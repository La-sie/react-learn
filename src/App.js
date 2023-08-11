import React ,{useReducer, useState} from 'react';
import './App.css';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
 }
 
 function App() {
   const [formData, setFormData] = useReducer(formReducer, {});
   const [submitting, setSubmitting] = useState(false);
 
   const handleSubmit = event => {
     event.preventDefault();
     setSubmitting(true);
 
     setTimeout(() => {
       setSubmitting(false);
     }, 3000);
   }
 
   const handleChange = event => {
     setFormData({
       name: event.target.name,
       value: event.target.value,
     });
   }

  return (
    <div className="App">
     <h1>How About Them Apples</h1>
      {submitting &&
       <div>
         You are submitting the following:
         <ul>
           {Object.entries(formData).map(([name, value]) => (
             <li key={name}><strong>{name}</strong>:{value.toString()}</li>
           ))}
         </ul>
       </div>
      }
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p className='name'>Name</p>
            <input className='inputspace' name="name" onChange={handleChange}/>
          </label>
        </fieldset>
        <button type="submit" className='btn'>Submit</button>
      </form>
    </div>
  );
}

export default App;
