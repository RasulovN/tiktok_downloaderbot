const axios = require("axios");

async function tiktokDown(tiktok_url){
    const options = {
      method: 'GET',
      url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/',
      params: {url: tiktok_url, hd: '0'},
      headers: {
        'X-RapidAPI-Key': '9a2b7fd244msh4f3338519de0171p1fabc4jsn9a8e84bb411a',
        'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com'
      }
    };
    
    const response = await axios.request(options)
    const results = {
            data: response.data.data,
            title: response.data.data.title,
            play: response.data.data.play,
            music: response.data.data.music
        }
        return results;
    // console.log(results.music);
    // console.log(results.title);
    // console.log(results.play);
}

// tiktokDown()
module.exports = { tiktokDown }

