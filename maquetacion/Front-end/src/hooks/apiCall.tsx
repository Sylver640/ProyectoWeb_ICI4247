import { CapacitorHttp, HttpResponse } from '@capacitor/core';

// ========================================================================
// ==================  API CALLS  =======================================
export const apiCall = () => {

    // ========================================================================
    // Buscar datos
    const searchData = async (type:string, query: string): Promise<any> => {
        try{

            const options = {
                method: 'GET',
                url: `http://54.233.215.80:3000/${type}${query}`,
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            // Fetch de la data
            const response: HttpResponse = await CapacitorHttp.request(options);
            
            if(type === 'songs'){
                return (response.data.songs);
            }else{
                return (response.data.games);
            }

        }catch(error){

            console.error('Something is wrong: ',error);
            return [];

        };
    };
    // ========================================================================

    // ========================================================================
    // Buscar datos por id
    const searchDataId = async (query:string, type:string): Promise<any> => {
        try{

            const options = {
                method: 'GET',
                url: `http://54.233.215.80:3000/${type}/${query}`,
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            const response: HttpResponse = await CapacitorHttp.request(options);
            return (response.data.game);
        
        }catch(error){
            console.error('Something is wrong: ',error);
        }
    };
    // ========================================================================

    // ========================================================================
    // Retornar funciones
    return { searchData , searchDataId };

};

export default apiCall;