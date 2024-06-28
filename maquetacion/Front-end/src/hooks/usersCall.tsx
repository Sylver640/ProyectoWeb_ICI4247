import { CapacitorHttp, HttpResponse } from '@capacitor/core';

// ========================================================================
// ==================  USERS CALLS  =======================================
export const UsersCall = () => {

    // ========================================================================
    // Obtener usuario por email
    const getUserByEmail = async(email: string) => {
        const options = {
            method: 'GET',
            url: `http://127.0.0.1:5000/users/${email}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try{
            const response: HttpResponse = await CapacitorHttp.request(options);
            return response.data;
        }catch(e){
            console.log(e);
            return {error: e};
        }
    }
    // ========================================================================

    // ========================================================================
    // Crear usuario
    const createUser = async (user: string, rut:string, email:string, password: string) =>{
        
        const options = {
            method: 'POST',
            url: `http://127.0.0.1:5000/users`,
            headers: {
                'Content-Type': 'application/json'
            },
            data:{
                username: user,
                rut: rut,
                email: email,
                password: password
            }
        }

        try{
            const response: HttpResponse = await CapacitorHttp.request(options);
            return response.data;

        }catch(e){
            console.log(e);
            return {error: e};
        }
    };
    // ========================================================================

    // ========================================================================
    // Obtener usuario
    const getUser = async(email: string, password: string): Promise<any> =>  {

        const options = {
            method: 'POST',
            url: "http://127.0.0.1:5000/verify_user",
            headers: {
                'Content-Type': 'application/json'
            },

            data:{
                email: email,
                password: password
            }
        }

        try{
            const response: HttpResponse = await CapacitorHttp.request(options);
            return response.data;

        }catch(e){
            console.log(e);
            return {error: e};
        }
    }
    // ========================================================================

    // ========================================================================
    // Obtener playlist de usuario
    const getPlaylistUser = async(email:string) => {
            
            const options = {
                method: 'GET',
                url: `http://127.0.0.1:5000/users/${email}/playlists`,
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            try{
                const response: HttpResponse = await CapacitorHttp.request(options);
                return response.data;
            }catch(e){
                console.log(e);
                return {error: e};
            }
    }
    // ========================================================================

    // ========================================================================
    // Crear playlist
    const createPlaylist = async(id: string, name: string) => {
        const options = {
            method: 'POST',
            url: `http://127.0.0.1:5000/playlists`,
            headers: {
                'Content-Type': 'application/json'
            },

            data: {
                user_id: id,
                name: name,
                url: "https://www.w3schools.com/howto/img_avatar.png",
            }
        }

        try{
            const response: HttpResponse = await CapacitorHttp.request(options);
            return response.data;
        }catch(e){
            console.log(e);
            return {error: e};
        }
    }
    // ========================================================================

    // ========================================================================
    // Obtener lista de playlist
    const getlistPlaylist = async (email: string, playlist: string) => {
        const options = {
            method: 'GET',
            url: `http://127.0.0.1:5000/users/${email}/playlists/${playlist}/songs`,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try{
            const response: HttpResponse = await CapacitorHttp.request(options);
            return response.data;

        }catch(e){
            console.log(e);
            return {error: e};
        }
    }
    // ========================================================================

    // ========================================================================
    // Obtener playlist por id
    const getPlaylist_byId = async (playlist: string) => {

        const options = {
            method: 'GET',
            url: `http://127.0.0.1:5000/playlists/${playlist}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try{
            const response: HttpResponse = await CapacitorHttp.request(options);
            return response.data;
        }catch(e){
            console.log(e);
            return {error: e};
        }
    }
    // ========================================================================

    // ========================================================================
    // Añadir canción a playlist
    const addSongPlaylist = async (name: string, id: string) =>{
        const options = {
            method: 'POST',
            url: `http://127.0.0.1:5000/playlists/${name}/songs`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                song_id: id
            }
        }

        try{
            const response: HttpResponse = await CapacitorHttp.request(options);
            return response.data;
        }catch(e){
            console.log(e);
            return {error: e};
        }
    }
    // ========================================================================

    // ========================================================================
    // Eliminar playlist
    const deletePlaylist = async (name: string) => {

        const options = {
            method: 'DELETE',
            url: `http://127.0.0.1:5000/playlists/${name}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try{
            const response: HttpResponse = await CapacitorHttp.request(options);
            return response.data;
        }catch(e){
            console.log(e);
            return {error: e};
        }
    }
    // ========================================================================

    // ========================================================================
    // Actualizar usuario
    const update_user = async (update:string, key:string, email:string) => {
        const options = {
            method: 'PUT',
            url: `http://127.0.0.1:5000/users/${email}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data:{
                key: key,
                value: update
            }
        }

        try{
            const response: HttpResponse = await CapacitorHttp.request(options);
            return response.data;
        }catch(e){
            console.log(e);
            return {error: e};
        }
    }
    // ========================================================================

    // ========================================================================
    // Eliminar canción de playlist
    const deleteSongPlaylist = async (name: string, id: string) => {
        const options = {
            method: 'DELETE',
            url: `http://127.0.0.1:5000/playlists/${name}/songs/${id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try{
            const response: HttpResponse = await CapacitorHttp.request(options);
            return response.data;
        }catch(e){
            console.log(e);
            return {error: e};
        }
    }
    // ========================================================================

    // ========================================================================
    // Actualizar playlist
    const update_playlist = async (key:string, value:string, name:string) => {
        const options = {
            method: 'PUT',
            url: `http://127.0.0.1:5000/playlists/${name}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data:{
                key: key,
                value: value
            }
        }

        try{
            const response: HttpResponse = await CapacitorHttp.request(options);
            return response.data;
        }catch(e){
            console.log(e);
            return {error: e};
        
        }
    }
    // ========================================================================

    // ========================================================================
    // Retornar las funciones
    return { getUserByEmail, createUser, getUser, getPlaylistUser, createPlaylist, getlistPlaylist, getPlaylist_byId, addSongPlaylist, deletePlaylist, update_user, deleteSongPlaylist, update_playlist };

};

export default UsersCall;