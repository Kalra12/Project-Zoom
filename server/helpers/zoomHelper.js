require('dotenv').config()
const axios = require('axios');

const ZOOM_API_KEY = process.env.ZOOM_API_KEY;
const ZOOM_API_SECRET = process.env.ZOOM_API_SECRET;
const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;

const getZoomAccessToken = async () => {
    try {
        const response = await axios.post(
            'https://zoom.us/oauth/token',
            null,
            {
                params: {
                    'grant_type': 'account_credentials',
                    'account_id': ZOOM_ACCOUNT_ID
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${Buffer.from(`${ZOOM_API_KEY}:${ZOOM_API_SECRET}`).toString('base64')}`
                }
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Failed to get Zoom access token:', error.response?.data || error.message);
        throw error;
    }
};

module.exports = { getZoomAccessToken };
