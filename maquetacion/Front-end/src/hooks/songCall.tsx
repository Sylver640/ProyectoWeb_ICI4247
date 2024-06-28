import { CapacitorHttp, HttpResponse } from '@capacitor/core';

// ========================================================================
// ==================  SONG CALLS  =======================================
export const songCall = () => {

    // ========================================================================
    // Buscar audio
    const searchAudio = async (directory:string, key:string): Promise<any> => {

        try{
            const response: HttpResponse = await CapacitorHttp.get({
                url: `http://54.233.215.80:3001/?directory=${directory}&key=${key}`,
            });

            return response.data;
        }
        catch(error){
            console.error('Something is wrong: ',error);
            return [];
        }
    };
    // ========================================================================

    // ========================================================================
    // Retornar funciones
    return { searchAudio };
};

export default songCall;