import React ,{useReducer, useState} from 'react';
import './App.css';

const formReducer = (state, event) => {
  if(event.reset){
    return{
      apple: '',
      count: 0,
      name: '',
      'gift-wrap': false,
    }
  }

  return {
    ...state,
    [event.name]: event.value
  }
 }
 
 function App() {
   const [formData, setFormData] = useReducer(formReducer, {
    count : 100,
   });
   const [submitting, setSubmitting] = useState(false);
 
   const handleSubmit = event => {
     event.preventDefault();
     setSubmitting(true);
 
     setTimeout(() => {
       setSubmitting(false);
       setFormData({
        reset : true
       })
     }, 3000);
   }
 
   const handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';
     setFormData({
       name: event.target.name,
       value: isCheckbox ? event.target.checked : event.target.value,
     });
   }

  return (
    <div className="App">
     <h1>Form tutorials</h1>
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
        <fieldset disabled={submitting}>
          <label>
            <p className='name'>Name</p>
            <input className='inputspace' name="name" onChange={handleChange} value={formData.name || ''}/>
          </label>
        </fieldset>
        <fieldset disabled={submitting}>
          <label>
            <p className='name' > Apples</p>
            <select className='inputspace' name="apple" onChange={handleChange} value={formData.name || ''}>
              <option value=""> Please choose an option</option>
              <option value="fuji"> Fuji</option>
              <option value="jonathan"> Jonathan</option>
              <option value="honey-crisp">Honey Crisp </option>
            </select>
          </label>
          <label>
            <p className='name'> Count</p>
            <input className='inputspace' type='number' name='count' onChange={handleChange} step="1" value={formData.count || ''}/>
          </label>
          <label>
            <p className='name'> Gift Wrap</p>
            <input 
            className='input' 
            type='checkbox' 
            name='gift-wrap' 
            onChange={handleChange} 
            checked= {formData['gift-wrap'] || false}
            disabled = {formData.apple !== 'fuji'}/>
          </label>
        </fieldset>
        <button type="submit" className='btn' disabled={submitting}>Submit</button>
      </form>
    </div>
  );
}

export default App;
