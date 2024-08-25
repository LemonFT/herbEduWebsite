import { redirect } from "next/navigation";

interface HttpType {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD';
    url: string;
    headers?: any;
    body?: any;
}
const baseUrl = process.env.BASE_URL_v1;
const baseHeader  = {
    'Content-Type': 'application/json',
}

const HttpCall = async (req: HttpType): Promise<any> => {    
    const urlFull = await req.url.startsWith('/') ? `${baseUrl}${req.url}` : `${baseUrl}/${req.url}`
    try {
        const res = fetch(urlFull, {
            method: req?.method ? req?.method : 'GET',
            headers: {
                ...baseHeader,
                'Authorization': `Bearer ${req.headers?.token}`
            },
            body: JSON.stringify(req.body),
        })        
        const status = (await res).status;
        if(status === 401 || status === 403){
            redirect('/')
        }
        return await res;
    } catch (error: any) {
        return {message: "Server error"}
    }
}

export default HttpCall;