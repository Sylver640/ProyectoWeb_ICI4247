import { IonRouterOutlet,IonTabBar,IonTabButton,IonTabs, IonIcon, IonLabel, IonApp} from "@ionic/react";
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from "@ionic/react-router";
import {pages} from "./menu_pages";
import '../styles/login/Menu.css';

const Menu = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>

                        {pages.map((page) => {
                            return <Route key={page.id} exact path={page.path} component={page.component}/>;
                        })}

                        <Redirect exact path="/menu" to="/home" />

                    </IonRouterOutlet>

                    <IonTabBar slot="bottom">

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