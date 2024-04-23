import {homeOutline, settingsOutline, libraryOutline, searchOutline} from 'ionicons/icons';
import Home from '../pages/menu_pages/Home';
import Settings from '../pages/menu_pages/Settings';
import library from '../pages/menu_pages/Library';
import Search from '../pages/menu_pages/Search';

{/* Paginas de la aplicacion */}
export const pages = [

    {
        id:0,
        label:"Home",
        path:"/home",
        icon:homeOutline,
        component:Home,
        redirect:true
    },

    {
        id:1,
        label:"Settings",
        path:"/settings",
        icon:settingsOutline,
        component:Settings,
        redirect:true
    },

    {
        id:2,
        label:"Library",
        path:"/library",
        icon:libraryOutline,
        component:library,
        redirect:true
    },

    {
        id:3,
        label:"Search",
        path:"/search",
        icon:searchOutline,
        component:Search,
        redirect:true
    }

];