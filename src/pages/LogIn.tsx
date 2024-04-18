import {
    IonContent,
    IonPage,
    IonTitle,
    IonGrid,
    IonIcon,
    IonCol, 
    IonText, 
    IonToggle, 
    IonInput, 
    IonButton
} from '@ionic/react';
import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import {logoFacebook, logoGoogle, logoApple} from 'ionicons/icons';

import '../styles/login/LogIn.css';

const LogIn: React.FC = () => {

    // Declaracion de variables
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>();
    const [isError, setIsError] = useState<boolean>();
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const history = useHistory();

    // Validar Email
    const validateEmail = (email: string) => {
        return email.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    };

    // validar el email
    const validate = (e: Event)=>{
        const value = (e.target as HTMLInputElement).value;

        setIsValid(undefined);

        if(value === '') return;

        validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);

        if(isValid === true){setEmail(value);}
    };

    const passwordValidation = (password: string) => {

        if(password.length < 2) return false;

        return true;
    }

    // Validar password
    const validatePassword = (e: Event) => {
        const value = (e.target as HTMLInputElement).value;

        setIsError(undefined);

        if(value === '') return;
        
        passwordValidation(value) ? setIsError(true) : setIsError(false);

        if(isError === true){setPassword(value);}
    }

    // Mark es tocado
    const markTouched = () => {
        setIsTouched(true);
    };

    const handleSignIn = () => {
        history.push('/signin');
    }

    const handleForgot = () => {
        history.push('/forgot');
    }
    
    const handleLogin = () => {
        if(email === 'generico@gmail.com' && password === '1234'){
            console.log(password);
            console.log(email);
            history.push('/menu');
        }else{
            setIsError(false);
            setIsValid(false);
        }
    };

    return(
        <IonPage>
        <IonGrid fixed={true}>
          <IonCol>
            <IonContent>
  
                {/* Seccion del titulo */}
                <div className='ion-padding inicio'><IonTitle>Log in to TuneBytes</IonTitle></div>


                {/* Seccion del inicio de sesion */}
                <IonCol>
                    <div className='flex-col'>

                        <IonInput 
                            className={`singIn ${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                            type="email"
                            fill="solid"
                            label="Email"
                            labelPlacement="floating"
                            helperText="Please enter a valid email"
                            errorText="Invalid email"
                            onIonInput={(event) => validate(event)}
                            onIonBlur={() => markTouched()}
                        ></IonInput>

                        <IonInput
                            className={`singIn ${isError && 'ion-valid'} ${isError === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`} 
                            type="password" 
                            fill="solid"
                            label='Password'
                            labelPlacement='floating'
                            helperText='Please enter your password'
                            errorText='Invalid password'
                            onIonInput={(event) => validatePassword(event)}
                            onIonBlur={() => markTouched()}
                        ></IonInput>

                    </div>
                </IonCol>

                {/* Toggle Switch */}
                <div className='ion-padding flex-row'>
                    <IonText id='recordatorio'>Remember me</IonText>
                    <IonToggle id="toggle" checked={true}></IonToggle>
                </div>

                {/* Boton de inicio de sesion */}
                <div className='flex-row ion-padding'>
                    <IonButton expand="block" shape='round'id='login-color' className='login' onClick={handleLogin}>Log In</IonButton>
                </div>

                <div className='ion-padding ion-text-center ion-text-bold ion-text-uppercase'>or</div>
  
                 <div className='flex-col ion-padding'>
  
                    <IonButton expand="block" shape='round' className='redes' id="face-color">
                        <div className='flex-row-vw'>
                            <IonIcon icon={logoFacebook} size="small"></IonIcon>
                            <span>LOG IN FACEBOOK</span>
                        </div>
                    </IonButton>
  
                    <IonButton expand="block" shape='round' className='redes'id='google-color'>
                        <div className='flex-row-vw'>
                            <IonIcon icon={logoGoogle} size='small'></IonIcon>
                            <span>LOG IN GOOGLE</span>
                        </div>
                    </IonButton>
  
                    <IonButton expand="block" shape='round' className='redes'id='apple-color'>
                        <div className='flex-row-vw'>
                            <IonIcon icon={logoApple} size='small'></IonIcon>
                            <span>LOG IN APPLE ID</span>
                        </div>
                    </IonButton>
  
                </div>
  
                <div className="ion-text-center ion-margin-bottom ion-padding">
                    <span className="ion-text-bold">Don't have an account?  </span>
                    <a className="ion-text-underline user-passORsing" onClick={handleSignIn}>Sing up</a>
                </div>
  
                <div className="ion-text-center ion-margin-top">
                    <a className="ion-text-bold user-passORsing" onClick={handleForgot}>Forgot your password?</a>
                </div>

            </IonContent>
          </IonCol>
        </IonGrid>
      </IonPage>
    );
};

export default LogIn;