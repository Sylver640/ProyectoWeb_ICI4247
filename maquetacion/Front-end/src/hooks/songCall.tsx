import { CapacitorHttp, HttpResponse } from '@capacitor/core';

export const songCall = () => {
    const searchAudio = async (key : string): Promise<any> => {

        try{
            const response: HttpResponse = await CapacitorHttp.get({
                url: `http://54.233.215.80:3001/?key=${key}`
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