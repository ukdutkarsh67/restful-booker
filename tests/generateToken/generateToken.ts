import authentication from "../test-data/authentication.json";
export async function generateToken({request,baseURL}){
    const authenticatKey=await request.post(`${baseURL}/auth`,{
        data: {
            "username" : authentication.username,
            "password" : authentication.password
        }
    });
    const authBody=await authenticatKey.json();
    return `${authBody["token"]}`; 
}