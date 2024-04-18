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
    IonItem, 
    IonButton,
    IonAlert,
    IonRow
} from '@ionic/react';
import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import {logoFacebook, logoGoogle, logoApple} from 'ionicons/icons';

import '../styles/login/LogIn.css';

function validateEmail(email: string) {
    const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    return re.test(String(email).toLowerCase());
}

const LogIn: React.FC = () => {

    // Declaracion de variables
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [iserror, setIsError] = useState<boolean>(false);
    const history = useHistory();
    
    // Inicio de sesion
    const handleUsernameChange = (e: any) => {
        setEmail(e.target.value);
    };
    
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    const handleSignIn = () => {
        history.push('/signin');
    }

    const handleForgot = () => {
        history.push('/forgot');
    }
    
    const handleLogin = () => {
        if(!email){
            setMessage('Please enter a valid email');
            setIsError(true);
            return;
        }

        if(!validateEmail(email)){
            setMessage('Please enter a valid email');
            setIsError(true);
            return;
        }

        if(email === 'generico@gmail.com' && password === '1234'){
            history.push('/menu');
        }else{
            setMessage('mail or password incorrect');
            setIsError(true);
            return;
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
                        <IonItem className='redondeo ion-text-sm login-item'>
                            <IonInput placeholder="Email" id='usuario' type="text" value={email} onIonChange={handleUsernameChange}></IonInput>
                        </IonItem>

                        <IonItem className='redondeo  ion-text-sm login-item'>
                            <IonInput type="password" placeholder='Password' value={password} onIonChange={handlePasswordChange}></IonInput>
                        </IonItem>
                    </div>
                </IonCol>

                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonAlert
                                isOpen={iserror}
                                onDidDismiss={() => setIsError(false)}
                                header={'Error'}
                                message={message}
                                buttons={['OK']}
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>

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