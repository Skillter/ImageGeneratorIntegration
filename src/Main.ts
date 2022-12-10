//const axios = require('axios');
import axios from "axios"
import fs from "fs"
const util = require('util');
import { send } from "process";
import { Config } from './Config';


const PLAYGROUND_BASE_URL = " https://playgroundai.com/"
const PLAYGROUND_GENERATE_URL = `${PLAYGROUND_BASE_URL}api/models/`
const config = new Config(1,"Session ID Here")

let headerForPlayground = { headers: {Cookie: `Cookie: __Host-next-auth.csrf-token=dd9f4b93bd25397cd18c8f0123eed4152506da4c111c353f7e2a3cf52e7399d6%7Cba3c98e0348f8dc122007eb8f08ea84c1d2f742b587028d1f0bfc93c633825b4; __Secure-next-auth.callback-url=https%3A%2F%2Fplaygroundai.com%2Flogin; __Secure-next-auth.session-token=67b4607f-93ce-414e-ba0a-c213404eb83d`,}}

sendPlaygroundPOSTRequest("W1bIgzFCyN", "rainbow and a house", 1, 768, 512);

async function sendPlaygroundPOSTRequest(batchid:string, prompt:string, seed:number, width:number, height:number) {
    try {
        let payload = {width:768, height:512, seed:520455056, num_images:1, sampler:1, cfg_scale:20, steps:50, dream_booth_model:"", prompt:"gorilla on fire, detailed 2", negativePrompt:"nsfw", modelType:"stable-diffusion", isPrivate:true, batchId:"W1bIgzFCyN", generateVariants:false}
        let data = await (await axios.post(PLAYGROUND_GENERATE_URL, payload, headerForPlayground)).data
        let image = data.images[0].url
        //require('child_process').spawn('clip').stdin.end(util.inspect(image));

        console.log(image)

        fs.writeFile("image.jpg", image, (callback) => {
            callback?.stack
        });
    } catch (error) {
        console.log(error)
    }
}