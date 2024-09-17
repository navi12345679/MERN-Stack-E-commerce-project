
import React,{useState} from 'react';
import './CSS/loginsignup.css';

const LoginSignup = () => {
     const[state,setState] = useState("Login");
     const[formData,setFormData] = useState({
      username: '',
      password:'',
      email:'',
     }); 
     const changeHandler = (e) => {
      // console.log('Event:', e);
      // console.log('Event Target:', e.target);
      // console.log('Event Target Name:', e.target.name);
      console.log('Event Target Value:', e.target.value);
      
      // Proceed if checks are successful
      // (e && e.target && e.target.name !== undefined && e.target.value !== undefined) 
        {
          setFormData({
              ...formData,
              [e.target.name]: e.target.value
          });
      }
      // else {
        //  console.error('Event or event target is undefined');
      // }
  };
  

     const login = async () => {
      
      try {
        console.log("Login Function executed",formData);

        // Correct URL
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // Check if the response is ok (status code in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            
        }

        // Check if the response is empty
        const text = await response.text();
        let responseData = {};

        // Only parse JSON if text is not empty
        if (text) {
            try {
                responseData = JSON.parse(text);
            } catch (e) {
                console.error('Error parsing JSON:', e);
            }
        }

        // Handle the response data
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        } else {
          console.error('login failed:', responseData.message || 'Unknown error');
          alert(`login failed: ${responseData.error || 'Unknown error'}`);

            
        }
    } catch{
     //console.error('Error during signup:', error);
      alert('Error during login. Please try again later.');
    }
  
     }


      
      const signup = async () => {
        try {
            console.log("Signup Function executed", formData);
    
            // Correct URL
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            // Check if the response is ok (status code in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                
            }
    
            // Check if the response is empty
            const text = await response.text();
            let responseData = {};
    
            // Only parse JSON if text is not empty
            if (text) {
                try {
                    responseData = JSON.parse(text);
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                }
            }
    
            // Handle the response data
            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
              console.error('Signup failed:', responseData.message || 'Unknown error');
              alert(`Signup failed: ${responseData.message || 'Unknown error'}`);

                
            }
        } catch{
         //console.error('Error during signup:', error);
          alert('Error during signup. Please try again later.');
        }
        
    };
    
   
     

    return (
        <div className='loginsignup-container'>
<div className='login-container'>
            <h1>{state}</h1>
            <div className='loginsignup-fields'>
              {state ==="Sign Up" ?<input type='text' name="username" value={formData.username || ''} onChange={changeHandler}  placeholder='Your name'/> : <></>}
           
         <input type='text' name="email" value={formData.email || ''} onChange={changeHandler}  placeholder='Email Address' />
          <input type='text' name="password" value={formData.password || ''} onChange={changeHandler}  placeholder='Password' />
         </div>
         <button onClick={()=> {state ==="Login"? login() : signup()}}>Continue</button>
         {state==="Sign Up" ? <p className='loginsignup-login'>Already have an account? <span onClick={()=>setState("Login")}>Login here</span></p> :
          <p className='loginsignup-login'>Create an account <span onClick={()=> setState("Sign Up")}>Click here</span></p>}
         <div className='loginsignup-agree'>
            <input type='checkbox' name='' id=''/>
            <p>by continuing, I agree the terms of use and privacy policy.</p>
               </div>
          </div>
            </div>
    );
};

export default LoginSignup;