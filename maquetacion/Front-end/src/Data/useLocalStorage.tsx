// ========================================================================
// This file contains the custom hook for local storage
export const useLocalStorage = (key: string) => {

    // ========================================================================
    // Guardar valor en local storage
    const setValue = (value : unknown) => {
        try{
            window.localStorage.setItem(key, JSON.stringify(value));
        }
        catch(e){
            console.error(e);
        }
    };
    // ========================================================================

    // ========================================================================
    // Obtener valor de local storage
    const getValue = () => {
        try{
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : undefined; 
        }
        catch(e){
            console.error(e);
            return undefined;
        }
    };
    // ========================================================================

    // ========================================================================
    // Retornar funciones
    return { setValue , getValue }
}