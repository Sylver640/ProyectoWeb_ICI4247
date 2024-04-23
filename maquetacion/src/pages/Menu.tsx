import { IonRouterOutlet,IonTabBar,IonTabButton,IonTabs, IonIcon, IonLabel, IonApp} from "@ionic/react";
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from "@ionic/react-router";
import {pages} from "../Data/index";

import "../theme/ion.css";

const Menu = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        {/*Paginas que tendra los botones inferiores de la aplicacion, dirigiendolos a su respectiva ubicacion*/}
                        {pages.map((page) => {
                            return <Route key={page.id} exact path={page.path} component={page.component}/>;
                        })}

                        {/*Redireccionamiento a la pagina de inicio*/}
                        <Redirect exact path="/menu" to="/home" />

                    </IonRouterOutlet>

                    <IonTabBar slot="bottom" className="ion-main-look ion-main-txt ion-secondary">
                        
                        {/*Botones inferiores de la aplicacion*/}
                        {pages.map((page) => {
                            const {label , path, icon} = page;
                            
                            return(
                                <IonTabButton key={page.id} tab={label} href={path}>
                                    <IonIcon icon={icon}/>
                                    <IonLabel>{label}</IonLabel>
                                </IonTabButton>    
                            );
                        })}

                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>

        </IonApp>
    );
}

export default Menu;