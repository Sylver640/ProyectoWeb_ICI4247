import { IonPage, IonItem, IonInput, IonSelectOption, IonSelect, IonCheckbox, IonButton, IonIcon, IonContent, IonAlert } from "@ionic/react";
import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import {logoFacebook, logoGoogle, logoApple} from 'ionicons/icons';

import "../../theme/contenedores.css";
import "../../theme/position.css";
import "../../theme/ion.css";
import "../../theme/text.css";

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
    const [listCommunes, setListCommunes] = useState<string[]>([]);
    const history = useHistory();
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

        if(value === ''){
            setPassword('');
            return;
        }

        (value.length >= 3) ? setIsValidPassword(true):setIsValidPassword(false);

        if(isValidPassword){setPassword(value);}

        console.log(password);
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
    const handleRegion = (e: any) => {
        const region = e.detail.value;

        setregion(region);

        if(region === 'Santiago'){
            setListCommunes(['Maipú', 'Santiago', 'La Florida', 'La Reina']);
        }else{
            setListCommunes(['Valparaiso', 'Viña del Mar', 'Quilpue', 'Villa Alemana']);
        }
    }

    const handleCommune = (e: any) => {
        setCommune(e.detail.value);
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
            history.push('/LogIn');
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

                    <div className="flex-column align-center flex-center gap-3-vw width-100-pe">

                        {/* Seccion del titulo */}
                        <div className="flex-row flex-center align-center font-bold ion-padding font-size-25 wf5-txt">Create a new account</div>

                        {/* Formulario */}

                        {/* Nombre de nuevo usuario */}
                        <IonItem className="ion-main-bg ion-web-txt ion-primary ion-border-main width-70-vw">
                            <IonInput 
                            className={`${isNamed && 'ion-valid'} ${isNamed === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`} 
                            label="User name"
                            type="text"
                            errorText="Invalid user name"
                            label-placement="floating"
                            onIonInput={(event) => getName(event)}
                            onIonBlur={() => markTouched()}
                            ></IonInput>
                        </IonItem>
                        
                         {/* Rut del nuevo usuario */}
                        <IonItem className="ion-main-bg ion-web-txt ion-primary ion-border-main width-70-vw">
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

                        {/* Email del nuevo usuario */}
                        <IonItem className="ion-main-bg ion-web-txt ion-primary ion-border-main width-70-vw">
                            <IonInput
                            className={`${isValidEmail && 'ion-valid'} ${isValidEmail === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`} 
                            label="Email"
                            type="email"
                            errorText="Invalid email"
                            label-placement="floating"
                            onIonInput={(event) => validate(event)}
                            onIonBlur={() => markTouched()}
                            ></IonInput>
                        </IonItem>

                        {/* Region y comuna del nuevo usuario*/}
                        <IonItem className="ion-main-bg ion-web-txt ion-primary ion-border-main width-70-vw">
                            <IonSelect label="Region" onIonChange={(e) => handleRegion(e)}>
                            <IonSelectOption value="Santiago">Metropolitana</IonSelectOption>
                            <IonSelectOption value="Valparaiso">Valparaiso</IonSelectOption>
                            </IonSelect>
                        </IonItem>

                        <IonItem className="ion-main-bg ion-web-txt ion-primary ion-border-main width-70-vw">
                            <IonSelect label="Commune" onIonChange={handleCommune}>
                            {listCommunes.map((commune) => (
                                <IonSelectOption key={commune} value={commune}>
                                {commune}
                                </IonSelectOption>
                            ))}
                            </IonSelect>
                        </IonItem>

                        {/* Contraseña del nuevo usuario */}
                        <IonItem className="ion-main-bg ion-web-txt ion-primary ion-border-main width-70-vw">
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

                        {/* Confirmar contraseña */}
                        <IonItem className="ion-main-bg ion-web-txt ion-primary ion-border-main width-70-vw">
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

                        {/* Aceptar terminos y condiciones */}
                        <IonItem className="ion-main-bg ion-web-txt ion-primary ion-border-primary">
                            <IonCheckbox 
                                onIonChange={(e) => handleCheckBox(e)}
                                >Accept the terms and conditions</IonCheckbox>
                        </IonItem>

                        {/* Fin del formulario */}
                        
                        {/* Boton de inicio de sesion */}
                        <IonButton className="width-70-vw ion-main-look ion-main-txt ion-border-circle" id="alert" onClick={() =>handleSingIn()}>Sign Up</IonButton>
                        <IonAlert
                                trigger="alert"
                                header={header}
                                message={message}
                                buttons={['OK']}
                        ></IonAlert>
                    </div>
            </IonContent>
        </IonPage>
    );
}

export default SignIn;