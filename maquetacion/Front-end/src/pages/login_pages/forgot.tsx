import React, {useState} from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonIcon, IonItem, IonText, IonAlert } from '@ionic/react';
import {chevronBackOutline} from "ionicons/icons";
import {UsersCall} from "../../hooks/usersCall";
import { useHistory } from 'react-router-dom';

// ========================================================================
// Página de recuperar contraseña
const Forgot = () => {

    // Llamar a la constante de la historia
    const history = useHistory();

    // Llamar a la constante de la API
    const {getUserByEmail, update_user} = UsersCall();
    const [email, setEmail] = useState<string>('');

    // Declaración de variables
    const [canUpdate, setCanUpdate] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [header, setHeader] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [isValidPassword, setIsValidPassword] = useState<boolean>();

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

    // ========================================================================
    // Función para regresar
    const getBack = () => {
        history.goBack();
    }
    // ========================================================================

    // ========================================================================
    // Función para manejar el email
    const handleEmail = async (e: any) => {
        const value = (e.target as HTMLInputElement).value;
        setEmail(value);
    }
    // ========================================================================

    // ========================================================================
    // Validar el email
    const validate = async () => {
        try{
            const user = await getUserByEmail(email);
            if(user.error === 'Usuario no encontrado'){
                setCanUpdate(false);
                return;
            }else{
                setCanUpdate(true);
                return;
            }

        }catch(e){
            setCanUpdate(false);
            console.log(e);
        }
    }
    // ========================================================================

    // ========================================================================
    //Validación de contraseña
    const validarPassowrd = (e:Event) => {
        const value = (e.target as HTMLInputElement).value;
    
        setIsValidPassword(undefined);
        setPassword(value);

        if(value === ''){
            resetValidations()
        };
    
        setPasswordValidation({
            length: lenght_validate.test(value),
            uppercase: uppercase_validate.test(value),
            lowercase: lowercase_validate.test(value),
            number:number_validate.test(value),
            specialChar: specialChar_validate.test(value),
        });
    
        setIsValidPassword(Object.values(passwordValidation).every(Boolean));
    };
    // ========================================================================
    
    // ========================================================================
    // Resetear las validaciones
    const resetValidations = () => {
        setPasswordValidation(initialValidationState);
    };
    // ========================================================================

    // ========================================================================
    // Si un input es tocado
    const markTouched = () => {
        setIsTouched(true);
    };
    // ========================================================================

    // ========================================================================
    // Actualizar la contraseña
    const handleUpdate = async () => {

        if(isValidPassword){
            try{
                const response = await update_user(password, 'password', email);
                if(response.status === "user_updated"){
                    setHeader("Password updated");
                    setMessage("Your password has been updated successfully");
                    history.push('/login');
                }else{
                    setHeader("Error");
                    setMessage("There was an error updating your password");
                }
            }catch(e){
                setHeader("Error");
                setMessage("There was an error updating your password");
                console.log(e);
            }
        }else{
            setHeader("Error");
            setMessage("The password does not meet the requirements");
        }

    }
    // ========================================================================

    // ========================================================================
    // Renderizado de la página
    return(
        <IonPage>
            <IonContent>

                {/* Cabecera de la página */}
                <div className='flex-row flex-between'>

                    {/* Botón para regresar */}
                    <IonButton className='ion-border-circle ion-main-bg no-shadow ion-txt-look ion-margin width-10-pe' slot='start' onClick={() => getBack()}>
                        <IonIcon slot="icon-only" icon={chevronBackOutline}/>
                    </IonButton>

                    {/* Título de la página */}
                    <h1 className='look-txt font-bold width-90-pe'>Reset your password</h1>

                </div>
                
                {/* Contenido de la página */}
                <div className='flex-column flex-center align-center ion-padding ion-margin'>

                    {/* Sección del correo */}
                    <div className='flex-column flex-center gap-15-px align-center'>
                        <p className='font-bold'>Enter your email, and we will send you a link to get back into your account.</p>

                        <IonInput
                            className='ion-main-bg ion-wf5-txt ion-primary width-70-vw'
                            type="email"
                            placeholder="email@domain.com"
                            label="Email"
                            labelPlacement='stacked'
                            fill="outline"
                            onIonInput={(event) => handleEmail(event)}
                        />

                        <IonButton expand="block" shape='round' className='width-65-vw ion-main-look ion-main-txt' onClick={() => validate()}>Send</IonButton>
                    </div>

                </div>

                {/* Sección de cambio de contraseña */}
                {canUpdate &&
                    <div className='flex-column flex-start align-center gap-15-px'>

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

                        <IonButton expand="block" shape='round' id="alert-pwd" className='width-65-vw ion-main-look ion-main-txt' onClick={() => handleUpdate()}>Change</IonButton>

                        <IonAlert
                                trigger="alert-pwd"
                                header={header}
                                message={message}
                                buttons={['OK']}
                        ></IonAlert>

                    </div>
                }
                
            </IonContent>            
        </IonPage>

        
    );
};

export default Forgot;