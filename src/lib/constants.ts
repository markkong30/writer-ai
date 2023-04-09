export const nodejs = `const axios = require("axios");

const options = {
    method: 'POST',
    url: 'https://author-ai.vercel.app/api/v1/generate',
    params: {
      mode: 'extend',
      input: 'Input text',
    },
    headers: {
      'Authorization': 'YOUR_API_KEY',
    }
  };
  
axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});`;

export const python = `import requests

url: 'https://author-ai.vercel.app/api/v1/generate'
api_key = 'YOUR_API_KEY'
mode: 'extend'
input: 'Input text'

headers = {
    'Authorization': api_key
}

payload = {
    'mode': mode,
    'input': input
}

response = requests.post(url, headers=headers, json=payload)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f'Request failed with status code {response.status_code}')`;

export const metaDescription =
  'Free & open-source API to improve your writings';
