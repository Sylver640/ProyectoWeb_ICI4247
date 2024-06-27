import 
{ 
    IonPage, 
    IonItem, 
    IonInput, 
    IonCheckbox, 
    IonButton, 
    IonContent, 
    IonAlert, 
    IonText, 
    IonHeader,
    IonIcon,
} from "@ionic/react";
import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import {chevronBackOutline} from "ionicons/icons";
import { UsersCall } from "../../hooks/usersCall";

import "../../theme/contenedores.css";
import "../../theme/position.css";
import "../../theme/ion.css";
import "../../theme/text.css";

const SignIn: React.FC = () =>{

    // Datos del registro de usuario
    const [email, setEmail] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [rut, setRut] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    

    // Validaciones de los datos
    const [isValidrut, setIsValidrut] = useState<boolean>();
    const [isValidEmail, setIsValidEmail] = useState<boolean>();
    const [isValidPassword, setIsValidPassword] = useState<boolean>();
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isNamed, setIsNamed] = useState<boolean>();
    const [confirmPassword, setConfirmPassword] = useState<boolean>();

    // Mensaje de alerta
    const [message, setMessage] = useState<string>('');
    const [header, setHeader] = useState<string>('');
    const [userMessage, setUserMessage] = useState<string>('');
    const [emailMessage, setEmailMessage] = useState<string>('');
    const [rutMessage, setRutMessage] = useState<string>('');

    const {createUser} = UsersCall();

    // inicial stado de las validaciones
    const initialValidationState = {
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false
    };

    // Validación de contraseña por partes
    const [passwordValidation, setPasswordValidation] = useState(initialValidationState);

    // Expreciones regulares para validar la contraseña
    const lenght_validate = /.{8,}/;
    const uppercase_validate = /[A-Z]/;
    const lowercase_validate = /[a-z]/;
    const number_validate = /\d/;
    const specialChar_validate = /[^A-Za-z0-9]/;
    const length_name = /.{4,}/;
    const valid_name = /^[a-z0-9]+$/;

    const history = useHistory();
    const [state, setState] = useState<boolean>(false);

    //Existe nombre de usuario
    const getName = (e:Event) => {
        const value = (e.target as HTMLInputElement).value;
        
        setIsNamed(undefined);

        if(value === ''){
            setUserName('');
            setUserMessage('Not allowed empty field');
            setIsNamed(false);
            return;
        }

        let lenght:boolean = length_name.test(value);
        let valid:boolean = valid_name.test(value);

        if(lenght && valid){
            setIsNamed(true);
            setUserName(value);
        }else{
            (lenght)? setUserMessage('allowed only lowercase letters and numbers'): setUserMessage('User name must contain at least four characters');
            setIsNamed(false);
        }
    };
    //-----------------------------------------


    //Validación de email
    const validateEmail = (email: string) => {
        return email.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    };

    const validate = (e: Event)=>{
        const value = (e.target as HTMLInputElement).value;

        setIsValidEmail(undefined);

        if(value === ''){
            setEmail('');
            setEmailMessage('Not allowed empty field');
            setIsValidEmail(false);
            return;
        };

        if(validateEmail(value) !== null) {
            setIsValidEmail(true);
        }
        else{
            setEmailMessage('Invalid email');
            setIsValidEmail(false);
        };  

        if(isValidEmail === true) setEmail(value);
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

        if(value === ''){
            setRut('');
            setRutMessage('Not allowed empty field');
            setIsValidrut(false);
            return;
        }

        if(validateRut(value)) {
            setIsValidrut(true)
            setRut(value);
        }else{
            setRutMessage('Invalid rut'); 
            setIsValidrut(false);
        };
    };
    //-----------------------------------------


    //Validación de contraseña
    const validarPassowrd = (e:Event) => {
        const value = (e.target as HTMLInputElement).value;

        setIsValidPassword(undefined);

        if(value === ''){
            resetValidations()
        };

        setPassword(value);
        setPasswordValidation({
            length: lenght_validate.test(value),
            uppercase: uppercase_validate.test(value),
            lowercase: lowercase_validate.test(value),
            number:number_validate.test(value),
            specialChar: specialChar_validate.test(value),
        });

        setIsValidPassword(Object.values(passwordValidation).every(Boolean));
    };

    const validationConfrim = (e:Event) => {
        const value = (e.target as HTMLInputElement).value;

        setConfirmPassword(undefined);

        if(value === '' || password === '') return;

        (value === password) ? setConfirmPassword(true):setConfirmPassword(false);
    };

    const resetValidations = () => {
        setPasswordValidation(initialValidationState);
    };
    //-----------------------------------------


    // Aceptar terminos y condiciones
    const  handleCheckBox = (e: Event) => {
        if(state){
            setIsChecked(false);
            setState(false);
        }else{
            setIsChecked(true);
            setState(true);
        }
    }
    //-----------------------------------------


    // Crear Usuario
    const handleSingIn = async () => {
        if (isValidrut && isValidEmail && isValidPassword && isChecked && isNamed && confirmPassword){
            try{
                const users = await createUser(userName, rut, email, password);
                setMessage('User created successfully');
            }catch(e){
                    console.log(e);
            }
        }else 
        {
            setMessage('Please fill all the fields correctly');
            setHeader('Error');
        }      
    }
    //-----------------------------------------

    // Si un input es tocado
    const markTouched = () => {
        setIsTouched(true);
    };

    const getBack = () => {
        history.goBack();
    }
    //-----------------------------------------


    return(
        <IonPage>
            <IonContent>
                    <IonHeader className="flex-row no-shadow align-center">
                        <IonButton slot="start" className="ion-border-circle no-shadow ion-main-bg ion-txt-look"  onClick={() => getBack()}>
                            <IonIcon slot="icon-only" icon={chevronBackOutline}/>
                        </IonButton>
                        {/* Seccion del titulo */}
                        <div className="font-bold ion-padding font-size-25 wf5-txt">New account</div>
                    </IonHeader>

                    <div className="flex-column align-center flex-center gap-3-vw width-100-pe">

                        {/* Formulario */}

                        {/* Nombre de nuevo usuario */}
                        <IonItem className="ion-main-bg ion-web-txt ion-primary ion-border-main width-70-vw">
                            <IonInput 
                            className={`${isNamed && 'ion-valid'} ${isNamed === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`} 
                            label="User name"
                            type="text"
                            errorText={userMessage}
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
                            errorText={rutMessage}
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
                            errorText={emailMessage}
                            label-placement="floating"
                            onIonInput={(event) => validate(event)}
                            onIonBlur={() => markTouched()}
                            ></IonInput>
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

                        <div className="flex-column">
                            <p className="font-bold">This password must contain:</p>
                            <ul>
                                <li><IonText color={passwordValidation.length? 'success' : 'danger'}>At least 8 characters</IonText></li>
                                <li><IonText color={passwordValidation.uppercase? 'success' : 'danger'}>At least one uppercase letter</IonText></li>
                                <li><IonText color={passwordValidation.lowercase? 'success' : 'danger'}>At least one lowercase letter</IonText></li>
                                <li><IonText color={passwordValidation.number? 'success' : 'danger'}>At least two numbers</IonText></li>
                                <li><IonText color={passwordValidation.specialChar? 'success' : 'danger'}>At least one special character</IonText></li>
                            </ul>
                        </div>

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
                        
                        {/* Boton de registrar el usuario */}
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