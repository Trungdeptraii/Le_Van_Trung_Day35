let apiServer = 'https://dxpy28-8080.csb.app'
export const Fetch = async (medthod, source, body = {})=>{
    const header = new Headers();
    header.append('Content-Type', 'application/json');

    const options = {
        medthod: medthod,
        header: header,
        body: medthod != 'GET' ? JSON.stringify(body) : null
    }
    try {
        const data = await fetch(`${apiServer}/${source}`, options);
        const result = await data.json();
        return result;
    } catch (Ex) {
        console.log('Exception: ', Ex);
        return false;
    }
}
export default apiServer