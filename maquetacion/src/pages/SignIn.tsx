import { IonPage, IonItem, IonInput, IonSelectOption, IonSelect, IonCheckbox, IonButton, IonIcon, IonContent, IonAlert } from "@ionic/react";
import React, {useState} from "react";
import {logoFacebook, logoGoogle, logoApple} from 'ionicons/icons';
import '../styles/login/SignIn.css';
import '../styles/login/LogIn.css';

const SignIn: React.FC = () =>{

    const [email, setEmail] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [rut, setRut] = useState<string>('');
    const [region, setregion] = useState<string>('');
    const [commune, setCommune] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<boolean>();
    const [isValidrut, setIsValidrut] = useState<boolean>();
    const [isValidEmail, setIsValidEmail] = useState<boolean>();
    const [isValidPassword, setIsValidPassword] = useState<boolean>();
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isNamed, setIsNamed] = useState<boolean>();
    const [message, setMessage] = useState<string>('');
    const [header, setHeader] = useState<string>('');
    var state = true;

    //Existe nombre de usuario
    const getName = (e:Event) => {
        const value = (e.target as HTMLInputElement).value;
        
        setIsNamed(undefined);

        if(value === '') return;

        (value.length > 3) ? setIsNamed(true):setIsNamed(false);

        if(isNamed === true){setUserName(value);}
    };
    //-----------------------------------------


    //Validación de email
    const validateEmail = (email: string) => {
        return email.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    };

    const validate = (e: Event)=>{
        const value = (e.target as HTMLInputElement).value;

        setIsValidEmail(undefined);

        if(value === '') return;

        validateEmail(value) !== null ? setIsValidEmail(true) : setIsValidEmail(false);

        if(isValidEmail === true){setEmail(value);}
    };
    //-----------------------------------------


    //Validación de RUT
    const validateRut = (rut: string) => {
        /*El proceso aquí indicado hace referencia al que se encuentra en el sitio
        Valida Rut Chile*/

        //Se separa el rut con el digito verificador
        const [rutPuntos, dv] = rut.replace("-K", "-k").split("-");
        //Se sacan los puntos del RUT
        const rutSinPuntos = rutPuntos.replace(/[.]/g, '');
        
        //Proceso para calcular la suma de digitos con multiplicador
        let sum = 0;
        let multiplier = 2;
        for (let i = rutSinPuntos.length-1; i >=0; i--){
            sum += parseInt(rutSinPuntos.charAt(i), 10) * multiplier;
            multiplier += 1
            if (multiplier > 7){
                multiplier = 2;
            }
        }

        let sumDivided = Math.trunc(sum / 11);
        let restoMultiplicado = sumDivided*11;
        
        let step6 = sum - restoMultiplicado;
        let step7 = 11 - step6;


        let digitoEncontrado = step7.toString();


        if (digitoEncontrado == "10"){
            digitoEncontrado = 'k';
        }

        if (digitoEncontrado == "11"){
            digitoEncontrado = '0';
        }

        return (dv === digitoEncontrado);
    };

    const rutValidation = (e:Event) =>{
        const value = (e.target as HTMLInputElement).value;

        setIsValidrut(undefined);

        if(value === '') return;

        validateRut(value) ? setIsValidrut(true) : setIsValidrut(false);

        if(isValidrut === true){setRut(value)}
    };
    //-----------------------------------------


    //Validación de contraseña
    const validarPassowrd = (e:Event) => {
        const value = (e.target as HTMLInputElement).value;

        setIsValidPassword(undefined);

        if(value === '') return;

        (value.length > 3) ? setIsValidPassword(true):setIsValidPassword(false);

        if(isValidPassword){setPassword(value);}
    };

    const validationConfrim = (e:Event) => {
        const value = (e.target as HTMLInputElement).value;

        setConfirmPassword(undefined);

        if(value === '') return;

        if(password === '') return;

        (value === password) ? setConfirmPassword(true):setConfirmPassword(false);
    };
    //-----------------------------------------

        // Seleccionar region y comuna
    const handleRegion = (e: Event) => {
        setregion((e.target as HTMLInputElement).value);
    }

    const handleCommune = (e: Event) => {
        setCommune((e.target as HTMLInputElement).value);
    }
    //-----------------------------------------


    // Aceptar terminos y condiciones
    const  handleCheckBox = (e: Event) => {
        if(state){
            setIsChecked(true);
            state = false;
        }else{
            setIsChecked(false);
            state = true;
        }
    }
    //-----------------------------------------


    // Crear Usuario
    const handleSingIn = () => {
        if (isValidrut && isValidEmail && isValidPassword && confirmPassword && isChecked && isNamed && !(region === '') && !(commune === '')){
            setMessage('User created successfully');
            setHeader('Success');
        } else {
            setMessage('Please fill all the fields correctly');
            setHeader('Error');
        }        
    }
    //-----------------------------------------

    // Si un input es tocado
    const markTouched = () => {
        setIsTouched(true);
    };

    return(
        <IonPage>
            <IonContent>

                    <div className="contenedor-signIn">

                        <div id="titulo-signIn">Create a new account</div>

                        <IonItem className="singIn">
                            <IonInput 
                            className={`${isNamed && 'ion-valid'} ${isNamed === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`} 
                            label="User name"
                            type="text"
                            label-placement="floating"
                            onIonInput={(event) => getName(event)}
                            onIonBlur={() => markTouched()}
                            ></IonInput>
                        </IonItem>

                        <IonItem className="singIn">
                            <IonInput
                            className={`${isValidrut && 'ion-valid'} ${isValidrut === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`} 
                            label="Rut"
                            type="text"
                            errorText="Invalid rut"
                            label-placement="floating"
                            placeholder="xx.xxx.xxx-x"
                            onIonInput={(event) => rutValidation(event)}
                            onIonBlur={() => markTouched()}
                            ></IonInput>
                        </IonItem>

                        <IonItem className="singIn">
                            <IonInput
                            className={`set-input ${isValidEmail && 'ion-valid'} ${isValidEmail === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`} 
                            label="Email"
                            type="email"
                            errorText="Invalid email"
                            label-placement="floating"
                            onIonInput={(event) => validate(event)}
                            onIonBlur={() => markTouched()}
                            ></IonInput>
                        </IonItem>

                        <IonItem className="singIn">
                            <IonSelect label="Regions" onIonChange={(event) => handleRegion(event)}>
                            <IonSelectOption value="Santiago">Santiago</IonSelectOption>
                            <IonSelectOption value="Valparaiso">Valparaiso</IonSelectOption>
                            </IonSelect>
                        </IonItem>

                        <IonItem className="singIn">
                            <IonSelect label="Communes" onIonChange={(event) => handleCommune(event)}>
                            <IonSelectOption value="Quillota">Quillota</IonSelectOption>
                            <IonSelectOption value="Calera">La Calera</IonSelectOption>
                            </IonSelect>
                        </IonItem>

                        <IonItem className="singIn">
                            <IonInput
                            className={`${isValidPassword && 'ion-valid'} ${isValidPassword === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`} 
                            label="Password"
                            type="password"
                            errorText="Invalid password"
                            label-placement="floating" 
                            onIonInput={(event) => validarPassowrd(event)}
                            onIonBlur={() => markTouched()}
                            ></IonInput>
                        </IonItem>

                        <IonItem className="singIn">
                            <IonInput
                            className={`${confirmPassword && 'ion-valid'} ${confirmPassword === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`} 
                            label="Confirm password"
                            type="password"
                            errorText="Passwords do not match"
                            label-placement="floating"
                            onIonInput={(event) => validationConfrim(event)}
                            onIonBlur={() => markTouched()}
                            ></IonInput>
                        </IonItem>

                        <IonItem className="conditions">
                            <IonCheckbox 
                                onIonChange={(e) => handleCheckBox(e)}
                                >Accept the terms and conditions</IonCheckbox>
                        </IonItem>
                        
                        <IonButton className="btn-signIn" id="alert" onClick={() =>handleSingIn()}>Sign In</IonButton>
                        <IonAlert
                                trigger="alert"
                                header={header}
                                message={message}
                                buttons={['OK']}
                        ></IonAlert>

                        <div className="contenedor-redes">

                            <IonButton expand="block" shape='round' className='redes' id="face-color">
                                <div className='flex-row-vw'>
                                    <IonIcon icon={logoFacebook} size="small"></IonIcon>
                                    <span>SIGN IN FACEBOOK</span>
                                </div>
                            </IonButton>
        
                            <IonButton expand="block" shape='round' className='redes'id='google-color'>
                                <div className='flex-row-vw'>
                                    <IonIcon icon={logoGoogle} size='small'></IonIcon>
                                    <span>SIGN IN GOOGLE</span>
                                </div>
                            </IonButton>
        
                            <IonButton expand="block" shape='round' className='redes'id='apple-color'>
                                <div className='flex-row-vw'>
                                    <IonIcon icon={logoApple} size='small'></IonIcon>
                                    <span>SIGN IN APPLE ID</span>
                                </div>
                            </IonButton>

                        </div>
                    </div>
            </IonContent>
        </IonPage>
    );
}

export default SignIn;