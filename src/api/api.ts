import axios from "axios";

const instatnse = axios.create({     
    baseURL: "https://api.exchangerate.host/convert",
})

export const getCurrencyApi = {
    getEurData() {
        return  instatnse.get("?from=UAH&to=EUR").then((response: any) => {
            if(response.data.success) {
                return response.data.result
            } else {
                alert('SOME ERROR')
            }
            
        });
    },
    getUsdData() {
        return instatnse.get(`?from=UAH&to=USD`).then((response: any) => {
            if(response.data.success) {
                return response.data.result
            } else {
                alert('SOME ERROR')
            }
        });
    },
    getPlnData() {
        return instatnse.get(`?from=UAH&to=PLN`).then((response: any) => {
            if(response.data.success) {
                return response.data.result
            } else {
                alert('SOME ERROR')
            }
        });
    }
}