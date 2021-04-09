import axios from "axios";

const useMail = () => {
    const URL = "/.netlify/functions";

    const sendMail = async ( email: string, title: string, msg: string, name: string ) => {
        const data: Mail = {
            msg,
            name,
            email,
            title
        }

        return axios.post(`${URL}/sendMail`, data);
    }

    return { sendMail }
}

export interface Mail {
    msg: string,
    name: string,
    email: string,
    title: string
}

export default useMail;