import React, {useState} from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonIcon, IonItem, IonText } from '@ionic/react';
import {chevronBackOutline} from "ionicons/icons";
import {UsersCall} from "../../hooks/usersCall";
import { useHistory } from 'react-router-dom';

const Forgot = () => {
    const history = useHistory();
    const {getUserByEmail, update_user} = UsersCall();
    const [email, setEmail] = useState<string>('');
    const [canUpdate, setCanUpdate] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');

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

    const getBack = () => {
        history.goBack();
    }

    const handleEmail = async (e: any) => {
        const value = (e.target as HTMLInputElement).value;
        setEmail(value);
    }

    const validate = async () => {
        try{
            const user = await getUserByEmail(email);
            if(user){
                setCanUpdate(true);
            }else{
                setCanUpdate(false);
            }

        }catch(e){
            setCanUpdate(false);
            console.log(e);
        }
    }

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
    
    const resetValidations = () => {
        setPasswordValidation(initialValidationState);
    };

    // Si un input es tocado
    const markTouched = () => {
        setIsTouched(true);
    };

    const handleUpdate = async () => {

        if(isValidPassword){
            try{
                const response = await update_user(password, 'password', email);
                if(response.status === "user_updated"){
                    console.log("User updated");
                    history.push('/login');
                }else{
                    console.log("User not updated");
                }
            }catch(e){
                console.log(e);
            }
        }

    }

    return(
        <IonPage>
            <IonContent>
                <div className='flex-row flex-between'>
                    <IonButton className='ion-border-circle ion-main-bg no-shadow ion-txt-look ion-margin width-10-pe' slot='start' onClick={() => getBack()}>
                        <IonIcon slot="icon-only" icon={chevronBackOutline}/>
                    </IonButton>

                    <h1 className='look-txt font-bold width-90-pe'>Reset your password</h1>
                </div>
                
                <div className='flex-column flex-center align-center ion-padding ion-margin'>

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

                        <IonButton expand="block" shape='round' className='width-65-vw ion-main-look ion-main-txt' onClick={() => handleUpdate()}>Change</IonButton>

                    </div>
                }
            </IonContent>            
        </IonPage>

        
    );
};

export default Forgot;