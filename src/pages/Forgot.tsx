import { IonButton, IonContent, IonPage, IonInput } from '@ionic/react';
import '../styles/login/Forgot.css'

const Forgot = () => {
    return(
        <IonPage>
            <IonContent>
                <div id='titulo-forfor'>Forgot your password</div>

                <IonButton color={'success'}> Apreta si te gusta la pichula</IonButton>

                <IonInput></IonInput>
            </IonContent>            
        </IonPage>

        
    );
};

export default Forgot;