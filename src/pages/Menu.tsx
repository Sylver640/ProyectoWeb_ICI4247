import { IonRouterOutlet,IonTabBar,IonTabButton,IonTabs, IonIcon, IonLabel, IonApp } from "@ionic/react";
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from "@ionic/react-router";
import {pages} from "./menu_pages";
import Home from "./menu_pages/Home";
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

                        <Route exact path="/">
                            <Redirect to={pages.filter((page) => page.redirect)[0].path} />
                        </Route>

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

            <Home/>

        </IonApp>
    );
}

export default Menu;