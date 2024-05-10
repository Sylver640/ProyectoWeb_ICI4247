import axios from 'axios';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

export const apiCall = () => {
    let url: string;

    const searchData = async (url: string): Promise<any> => {
        try{
            // Variables para axios get de songs
            const options = {
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            // Fetch de la data
            const response: HttpResponse = await CapacitorHttp.request(options);
            return (response.data.songs);

        }catch(error){

            console.error('Something is wrong: ',error);
            return [];

        };
    };

    const searchDataId = async (url:string): Promise<any> => {
        try{

            const options = {
                method: 'GET',
                url: url
            };

            const response: HttpResponse = await CapacitorHttp.request(options);
            return (response.data.songs);
        
        }catch(error){
            console.error('Something is wrong: ',error);
        }
    };

    return { searchData , searchDataId };

};

export default apiCall;