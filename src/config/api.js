let myHeaders = new Headers();
const API_KEY = "y8kLSPaYN1lORyCU83VLs5NIzzQ7tFfx"
const baseCurrency = 'AUD';
const  API_DOMAIN = "https://api.apilayer.com/exchangerates_data/latest?";
myHeaders.append("apikey", API_KEY);
export const heading = "currency converter"
export const REQUESTOPTIONS = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};
export const CURRENCY_API_URL = `${API_DOMAIN}base=${baseCurrency}`;
export const BASE_URL = "http://localhost:8000"

