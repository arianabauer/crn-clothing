import { useState} from 'react';

import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'; 


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const handleSubmit = async (event) => {
        console.log("hit handle submit");
        event.preventDefault();

        //check if passwords mathc
        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }
        
        //check if you authenticated user, if not create user
        try{
            const response = await createAuthUserWithEmailAndPassword(email, password);
            console.log(response);

        } catch (error){
            console.log('user creation error: ', error);
        }
    }

    const handleChange = (event) => {
        const { name, value} = event.target;
        //the ... notation descructures the object here. it called property spread notation
        setFormFields( {...formFields, [name]:value })

    }; 

    return (
        <div>
            <h1>Sign up with your email and password.</h1>
            <form onSubmit={ handleSubmit }>
                <label>Display Name</label>
                <input type="text" required onChange={handleChange} name="displayName" value={displayName}/>

                <label>Email</label>
                <input type="email" required onChange={handleChange} name="email" value={email} />

                <label>Password</label>
                <input type="new-password" required onChange={handleChange} name="password" value={password} />

                <label>Confirm Password</label>
                <input type="new-password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <button type="submit" >Sign Up</button>
            </form>
        </div>
    )
};

export default SignUpForm;