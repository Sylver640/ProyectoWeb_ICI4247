import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';


// Direcciones de las paginas
import LogIn from './pages/login_pages/logIn';
import SignIn from './pages/login_pages/signIn';
import Forgot from './pages/login_pages/forgot';
import Menu from './pages/login_pages/menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" render={() => <LogIn />}/>
        <Route path="/signin" render={() => <SignIn />}/>
        <Route path="/menu" render={props => <Menu />}/>
        <Route path="/forgot" render={() => <Forgot />}/>
        <Route exact path="/" render={() => <Redirect to="/login"/>} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
