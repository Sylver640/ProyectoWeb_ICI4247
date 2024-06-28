import React from "react";
import { IonTabBar,IonTabButton,IonTabs, IonIcon, IonApp, IonRouterOutlet} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";

// Import provisorio de las paginas de la aplicacion
import {pages} from "../../Data";

// Import de los themes de css
import "../../theme/ion.css";

// ========================================================================
// Menú de la aplicación
const Menu = () => {

    return (
        <IonApp>

            {/*Router de la aplicacion*/}
            <IonReactRouter>
                <IonTabs className="flex-row flex-center align-center">
                    <IonRouterOutlet>
                        {/*Paginas que tendra los botones inferiores de la aplicacion, dirigiendolos a su respectiva ubicacion*/}
                        {pages.map((page) => {
                            return <Route key={page.id} exact path={page.path} render={() => <page.component />} />;
                        })}

                        {/*Redireccionamiento a la pagina de inicio*/}
                        <Route exact path="/menu" render={() => <Redirect to="/home" />} />

                    </IonRouterOutlet>
                    
                    <IonTabBar slot="bottom" translucent={true} className="ion-tab-home">
                        
                        {/*Botones inferiores de la aplicacion*/}
                        {pages.map((page) => {
                            if(!page.isTab) return null;
                            const {label, path, icon} = page;
                            
                            return(
                                <IonTabButton key={page.id} tab={label} href={path} mode="md" className="ion-tab-button">
                                    <IonIcon icon={icon} size="large"/>
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