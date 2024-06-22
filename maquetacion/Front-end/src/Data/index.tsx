import {homeOutline, settingsOutline, libraryOutline, searchOutline} from 'ionicons/icons';
import Home from '../pages/menu_pages/home';
import Settings from '../pages/menu_pages/settings';
import library from '../pages/menu_pages/library';
import Search from '../pages/menu_pages/search';
import Game from '../pages/menu_pages/id_pages/game';
import Song from '../pages/menu_pages/id_pages/song';
import Playlist from '../pages/menu_pages/id_pages/playlist';
import PlaylistSongs from '../pages/menu_pages/id_pages/playlistSongs';

{/* Paginas de la aplicacion */}
export const pages = [

    {
        id:0,
        label:"Home",
        path:"/home",
        icon:homeOutline,
        component:Home,
        isTab: true
    },

    {
        id:1,
        label:"Settings",
        path:"/settings",
        icon:settingsOutline,
        component:Settings,
        isTab: false
    },

    {
        id:2,
        label:"Library",
        path:"/library",
        icon:libraryOutline,
        component:library,
        isTab: true
    },

    {
        id:3,
        label:"Search",
        path:"/search",
        icon:searchOutline,
        component:Search,
        isTab: true
    },

    {
        id:4,
        label:"Game",
        path:"/tunebytes/games/:id",
        icon:homeOutline,
        component:Game,
        isTab: false
    },

    {
        id:5,
        label:"Song",
        path:"/tunebytes/songs/:id",
        icon:homeOutline,
        component:Song,
        isTab: false
    },
    
    {
        id:6,
        label: "Playlist",
        path: "/tunebytes/playlist/:id",
        icon: homeOutline,
        component: Playlist,
        isTab: false
    },

    {
        id:7,
        label: "PlaylistSongs",
        path: "/tunebytes/playlist/songs/:id",
        icon: homeOutline,
        component: PlaylistSongs,
        isTab: false
    }

];