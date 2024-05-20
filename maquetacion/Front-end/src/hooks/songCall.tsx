import { CapacitorHttp, HttpResponse } from '@capacitor/core';

export const songCall = () => {
    const searchAudio = async (key : string): Promise<any> => {

        try{
            const response: HttpResponse = await CapacitorHttp.get({
                url: `http://localhost:3000/?key=${key}`
            });

            return response.data;
        }
        catch(error){
            console.error('Something is wrong: ',error);
            return [];
        }
    };

    return { searchAudio };
};

export default songCall;