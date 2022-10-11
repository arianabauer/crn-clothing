import { useState, useContext} from 'react';

import { createUserDocumentFromAuth ,signInAuthUserWithEmailAndPassword
        } from '../../utils/firebase/firebase.utils'; 

import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils';

import Button from '../button/button.component';

import FormInput from '../form-input/form-input.component';

import '../sign-in-form/sign-in-form.styles.scss';

import { UserContext } from '../../context/user.context';



const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {  email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { user } = await signInAuthUserWithEmailAndPassword(
            email,
            password
          );
          resetFormFields();
          setCurrentUser(user);
        } catch (error) {
          switch (error.code) {
            case 'auth/wrong-password':
              alert('incorrect password for email');
              break;
            case 'auth/user-not-found':
              alert('no user associated with this email');
              break;
            default:
              console.log(error);
          }
        }
      };

    const handleChange = (event) => {
        const { name, value} = event.target;
        //the ... notation descructures the object here. it called property spread notation
        setFormFields( {...formFields, [name]:value })
    }

    const signInWithGoogle = async () =>{
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    } 

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password.</span>
            <form onSubmit={ handleSubmit }>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" type="new-password" required onChange={handleChange} name="password" value={password} />
                <div className='buttons-container'>
                    <Button label="" type="submit"  >Sign In</Button>
                    <Button type='button' buttonType="google" onClick={ signInWithGoogle }>Google Sign In</Button>
                </div>
                
            </form>
            
        </div>
    )
};
        


    

export default SignInForm;