import { IonPage, IonItem, IonInput, IonSelectOption, IonSelect, IonCheckbox, IonButton, IonIcon, IonContent } from "@ionic/react";
import React, {useState} from "react";
import {logoFacebook, logoGoogle, logoApple} from 'ionicons/icons';
import '../styles/login/SignIn.css';
import '../styles/login/LogIn.css';

const SignIn: React.FC = () =>{

    const [email, setEmail] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [rut, setRut] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<boolean>();
    const [isValidrut, setIsValidrut] = useState<boolean>();
    const [isValidEmail, setIsValidEmail] = useState<boolean>();
    const [isValidPassword, setIsValidPassword] = useState<boolean>();
    const [isTouched, setIsTouched] = useState<boolean>(false);

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


    const validateRut = (rut: string) => {
        // Reemplazar los puntos y guiones
        rut = rut.replace(/[.-]/g, '');

        // ValidaR el formato del rut
        const match = rut.match(/^(\d{1,8})([0-9kK])$/);
        if (!match) return false;

        const number = parseInt(match[1],10);
        const verifier = match[2].toUpperCase();

        // Calcular el dígito verificador
        let sum = 0;
        let multiplier = 2;
        for (let i = rut.length - 3; i >= 0; i--) {
            sum += parseInt(rut.charAt(i), 10) * multiplier;
            multiplier = (multiplier % 7) + 1;
        }

        const calculatedVerifier = (11 - (sum % 11)) % 11;
        const expectedVerifier = calculatedVerifier === 10 ? 'K' : calculatedVerifier.toString();

        // Comparar el dígito verificador
        return (verifier === expectedVerifier);
    };

    const rutValidation = (e:Event) =>{
        const value = (e.target as HTMLInputElement).value;

        setIsValidrut(undefined);

        if(value === '') return;

        validateRut(value) ? setIsValidrut(true) : setIsValidrut(false);
    };

    const validarPassowrd = (e:Event) => {
        const value = (e.target as HTMLInputElement).value;

        setIsValidPassword(undefined);

        if(value === '') return;

        (value.length < 3) ? setIsValidPassword(false):setIsValidPassword(true);

        if(isValidPassword === true){setPassword(value);}
    };

    const validationConfrim = (e:Event) => {
        const value = (e.target as HTMLInputElement).value;

        setConfirmPassword(undefined);

        if(value === '') return;

        if(password === '') return;

        (value === password) ? setConfirmPassword(true):setConfirmPassword(false);
    }

    // Mark es tocado
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
                            label="User name"
                            type="text"
                            label-placement="floating"
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
                            <IonSelect label="Regions" placeholder="">
                            <IonSelectOption value="region13">Santiago</IonSelectOption>
                            <IonSelectOption value="region5">Valparaiso</IonSelectOption>
                            </IonSelect>
                        </IonItem>

                        <IonItem className="singIn">
                            <IonSelect label="Communes" placeholder="">
                            <IonSelectOption value="com1">Quillota</IonSelectOption>
                            <IonSelectOption value="com2">Quillota</IonSelectOption>
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
                            <IonCheckbox>Accept the terms and conditions</IonCheckbox>
                        </IonItem>

                        <IonButton className="btn-signIn">Sign In</IonButton>

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