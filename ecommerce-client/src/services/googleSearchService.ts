import axios from "axios";

const SEARCH_URL = "https://www.googleapis.com/customsearch/v1";
// console.log(process.env.API_KEY)
const API_KEY = "AIzaSyBt4D6bh18hCcTiNVYuLsVk3fC8wFfWnuY";
const API_ID = "613bc8fe98a5e40dd";

export const googleSearch = async (searchParam: string) => {
    try {
    const response = await axios.get(SEARCH_URL, {
        params: {
        q: searchParam,
        key: API_KEY,
        cx: API_ID,
        num: 10,
        imgSize: "small",
        },
    });
    return response.data;

    } catch (error) {
    throw new Error();
    }
};