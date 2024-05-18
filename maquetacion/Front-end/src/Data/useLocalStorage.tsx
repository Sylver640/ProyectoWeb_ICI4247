export const useLocalStorage = (key: string) => {
    const setValue = (value : unknown) => {
        try{
            window.localStorage.setItem(key, JSON.stringify(value));
        }
        catch(e){
            console.error(e);
        }
    };

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

    return { setValue , getValue }
}