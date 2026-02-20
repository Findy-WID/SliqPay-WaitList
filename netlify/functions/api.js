import axios from 'axios';

const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

export const handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email, name } = JSON.parse(event.body);

    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Valid email required' })
      };
    }

    // Call Google Sheets via Apps Script
    const response = await axios.post(GOOGLE_APPS_SCRIPT_URL, {
      email: email.toLowerCase(),
      name: name || '',
      timestamp: new Date().toISOString(),
      source: 'website'
    });

    if (response.data.status === 'duplicate') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email already on waitlist!' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Joined waitlist!',
        position: response.data.position 
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' })
    };
  }
};