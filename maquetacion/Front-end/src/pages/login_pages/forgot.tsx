import React from 'react';
import { IonContent, IonPage, IonInput, IonButton } from '@ionic/react';

const Forgot = () => {
    return(
        <IonPage>
            <IonContent>
                <div className='flex-column flex-center align-center ion-padding ion-margin'>

                    <h1 className='look-txt font-bold'>Reset your password</h1>

                    <div className='flex-column flex-center gap-15-px align-center'>
                        <p className='font-bold'>Enter your email, and we will send you a link to get back into your account.</p>

                        <IonInput
                            className='ion-main-bg ion-wf5-txt ion-primary width-70-vw'
                            type="email"
                            placeholder="email@domain.com"
                            label="Email"
                            labelPlacement='stacked'
                            fill="outline"
                        />

                        <IonButton expand="block" shape='round' className='width-65-vw ion-main-look ion-main-txt'>Send</IonButton>
                    </div>

                </div>
            </IonContent>            
        </IonPage>

        
    );
};

export default Forgot;