import axios from 'axios';

class TokenService {

    static async getAccessToken() {
        // check local storage for existing access token
        let existing_token = JSON.parse(window.localStorage.getItem('HS_API_AccessToken'));
        
        // If existing token and expire time is at least more than 5 seconds in the future
        if (existing_token && existing_token.tokenExpires > new Date().getTime() - 5000) {
            return existing_token.access_token;
        } else {
            const formData = new FormData();
            formData.append('grant_type', 'client_credentials');
    
            // Get access token from HS API
            return await axios.post('https://us.battle.net/oauth/token', formData, {
                auth: {
                    username: 'CLIENT_ID_HERE',
                    password: 'CLIENT_SECRET_HERE'
                },
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(res => {
                // Insert token and expire time into local storage
                let now = new Date().getTime();
    
                let token = {
                    tokenAcquired: now,
                    tokenExpires: now + (res.data.expires_in * 1000),
                    access_token: res.data.access_token
                }
                window.localStorage.setItem('HS_API_AccessToken',  JSON.stringify(token))
    
                return token.access_token;
            })
            .catch(error => {
                // Figure out something better to do here than just console logging
                console.log(error);
    
                return null;
            });
        }
    }

}

export default TokenService;