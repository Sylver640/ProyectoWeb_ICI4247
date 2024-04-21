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

        console.log(digitoEncontrado);

        return (dv === digitoEncontrado);
    }

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