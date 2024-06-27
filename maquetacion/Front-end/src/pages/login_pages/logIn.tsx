import {
    IonContent,
    IonPage,
    IonImg,
    IonGrid,
    IonCol, 
    IonText, 
    IonToggle, 
    IonInput, 
    IonButton,
} from '@ionic/react';
import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import {useLocalStorage} from "../../Data/useLocalStorage"
import { UsersCall } from "../../hooks/usersCall";

// Import de los themes css
import "../../theme/contenedores.css";
import "../../theme/position.css";
import "../../theme/ion.css";
import "../../theme/text.css";

const LogIn: React.FC = () => {

    // Declaraciones de librerias
    const { getValue, setValue } = useLocalStorage('rememberMe');
    const history = useHistory();

    // Declaracion de variables
    const [isValid, setIsValid] = useState<boolean>();
    const [isError, setIsError] = useState<boolean>();
    const [isTouched, setIsTouched] = useState<boolean>(false);
    let rememberMe:boolean = (getValue() === 'true' ? true: false);
    const {getUser} = UsersCall();

    // Validar Email, sacado de la pagina de Ionic
    const validateEmail = (email: string) => {
        return email.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    };

    // validar el email, si cumple con la expresion regular se guarda en el estado
    const validate = (e: Event)=>{
        const value = (e.target as HTMLInputElement).value;

        setIsValid(undefined);

        if(value === '') {setIsValid(false); return;}

        validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);

        if(isValid === true){useLocalStorage('user').setValue(value);}
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

        if(isError === true){useLocalStorage('password').setValue(value);}
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
    const handleLogin = async () => {
        try{
            let email = useLocalStorage('user').getValue();
            let password = useLocalStorage('password').getValue();
            const getting = await getUser(email, password);
            if(getting.valid === true){
                useLocalStorage('id').setValue(getting.id);
                history.push('/menu');
            }else{
                useLocalStorage('user').setValue('');
                useLocalStorage('password').setValue('');
                setIsError(false);
                setIsValid(false);
            }


        }catch(e){
            console.log(e);  
            useLocalStorage('user').setValue('');
            useLocalStorage('password').setValue('');
            setIsError(false);
            setIsValid(false);
            return;
        }

    };
    //-----------------------------------------------------------------------------------


    // Mark es tocado
    const markTouched = () => {
        setIsTouched(true);
    };
    //-----------------------------------------------------------------------------------


    // Guardar en local storage
    const setLocalStorage = () => {
        try{
            rememberMe = !rememberMe;
            setValue(rememberMe.toString());
        }
        catch(e){
            console.log(e);
        }
    }
    //-----------------------------------------------------------------------------------

    useEffect(() => {
        const remember = async () => {
            let remember = getValue();

            if(remember === 'true'){
                let email = useLocalStorage('user').getValue();
                let password = useLocalStorage('password').getValue();

                const response = await getUser(email, password);
                if(response.valid === true){
                    history.push('/menu');
                }
            }
        }

        remember();
    },[]);

    //-----------------------------------------------------------------------------------

    return(
        <IonPage>
        <IonGrid fixed={true}>
          <IonCol>
            <IonContent>
  
                {/* Seccion del titulo */}
                <div className='flex-row flex-center'><IonImg className="icon-title" src="./main.png" alt='Main icon' /></div>

                {/* Seccion del email y password */}
                <IonCol className='ion-margin'>
                    <div className='flex-column flex-center align-center gap-15-px'>

                    <IonInput 
                            className={`ion-main-bg ion-wf5-txt ion-primary width-70-vw ${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                            type="email"
                            fill="outline"
                            label="Email"
                            labelPlacement="floating"
                            errorText="Invalid email"
                            onIonInput={(event) => validate(event)}
                            onIonBlur={() => markTouched()}
                    ></IonInput>

                        <IonInput
                            className={`ion-main-bg ion-wf5-txt ion-primary width-70-vw ${isError && 'ion-valid'} ${isError === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`} 
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
                <div className='ion-padding flex-row flex-center gap-15-vw align-center'>
                    <IonText >Remember me</IonText>
                    <IonToggle className="ion-toggle-main" checked={rememberMe} onIonChange={setLocalStorage}></IonToggle>
                </div>

                {/* Boton de inicio de sesion */}
                <div className='flex-row flex-center align-center ion-padding'>
                    <IonButton expand="block" shape='round' className='width-65-vw ion-wff-bg ion-main-txt ripple-color-look' onClick={handleLogin}>Log In</IonButton>
                </div>  

                {/* Seccion de texto, Sing Up te llevara a SingIn.tsx */}
                {/* Seccion de texto, Forgot your password te llevara a Forgot.tsx */}
                <div className="ion-text-center ion-margin-bottom ion-padding">
                    <span className="ion-text-bold">Don't have an account?  </span>
                    <a className="ion-text-underline look-txt" onClick={handleSignIn}>Sign up</a>
                </div>
  
                <div className="ion-text-center ion-margin-top">
                    <a className="ion-text-bold look-txt" onClick={handleForgot}>Forgot your password?</a>
                </div>

            </IonContent>
          </IonCol>
        </IonGrid>
      </IonPage>
    );
};

export default LogIn;