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
    IonButton,
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

    // Validar Email, sacado de la pagina de Ionic
    const validateEmail = (email: string) => {
        return email.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    };

    // validar el email, si cumple con la expresion regular se guarda en el estado
    const validate = (e: Event)=>{
        const value = (e.target as HTMLInputElement).value;

        setIsValid(undefined);

        if(value === '') return;

        validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);

        if(isValid === true){setEmail(value);}
    };
    //-----------------------------------------------------------------------------------


    // Validar password, es simple, si la longitud es menor a 2, no es valido
    const passwordValidation = (password: string) => {

        if(password.length < 2) return false;

        return true;
    };

    // Validar password, si cumple con la expresion regular se guarda en el estado
    const validatePassword = (e: Event) => {
        const value = (e.target as HTMLInputElement).value;

        setIsError(undefined);

        if(value === '') return;
        
        passwordValidation(value) ? setIsError(true) : setIsError(false);

        if(isError === true){setPassword(value);}
    };
    //-----------------------------------------------------------------------------------


    // Funciones de redireccion
    const handleSignIn = () => {
        history.push('/signin');
    };

    const handleForgot = () => {
        history.push('/forgot');
    };
    //-----------------------------------------------------------------------------------


    // Funcion de inicio de sesion, el correo para entrar es generico@gmail y la contraseña 1234
    // En un futuro se cambiara por una base de datos
    const handleLogin = () => {
        if(email === 'generico@gmail.com' && password === '1234'){
            history.push('/menu');
        }else{
            setIsError(false);
            setIsValid(false);
        }
    };
    //-----------------------------------------------------------------------------------

    // Mark es tocado
    const markTouched = () => {
        setIsTouched(true);
    };

    return(
        <IonPage>
        <IonGrid fixed={true}>
          <IonCol>
            <IonContent>
  
                {/* Seccion del titulo */}
                <div className='ion-padding inicio'><IonTitle>Log in to TuneBytes</IonTitle></div>


                {/* Seccion del email y password */}
                <IonCol>
                    <div className='flex-col'>

                    <IonInput 
                            className={`logIn-input ${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                            type="email"
                            fill="outline"
                            label="Email"
                            labelPlacement="floating"
                            errorText="Invalid email"
                            onIonInput={(event) => validate(event)}
                            onIonBlur={() => markTouched()}
                    ></IonInput>

                        <IonInput
                            className={`logIn-input ${isError && 'ion-valid'} ${isError === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`} 
                            type="password" 
                            fill="outline"
                            label='Password'
                            labelPlacement='floating'
                            errorText='Invalid password'
                            onIonInput={(event) => validatePassword(event)}
                            onIonBlur={() => markTouched()}
                        ></IonInput>

                    </div>
                </IonCol>

                {/* Toggle Switch */}
                <div className='ion-padding flex-row'>
                    <IonText id='recordatorio'>Remember me</IonText>
                    <IonToggle id="toggle" checked={false}></IonToggle>
                </div>

                {/* Boton de inicio de sesion */}
                <div className='flex-row ion-padding'>
                    <IonButton expand="block" shape='round'id='login-color' className='login' onClick={handleLogin}>Log In</IonButton>
                </div>

                <div className='ion-padding ion-text-center ion-text-bold ion-text-uppercase'>or</div>
  
                {/* Botones de redes sociales */}
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

                {/* Seccion de texto, Sing Up te llevara a SingIn.tsx */}
                {/* Seccion de texto, Forgot your password te llevara a Forgot.tsx */}
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