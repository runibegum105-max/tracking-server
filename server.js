const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Secret API key for simple auth
const API_KEY = "rakib007";

// Event endpoint
app.post("/event", async (req,res)=>{
    const key = req.headers["x-api-key"];
    if(key !== API_KEY){
        return res.status(403).send("Forbidden");
    }

    const eventData = req.body;
    console.log("Event received:", eventData);

    // Send to Meta Conversion API
    try{
        const pixel_id = "834597762895737"; // replace with your Meta Pixel ID
        const access_token = "EAAVrdkkB5IIBQyx70SaOGiQ6q9DdnjiKEGfFzEVWD1NEZAwoszuRVczlHEVYHo2Ggaitpy658woIlZBX7tBrP4rmgGLSMXcykqXfrQ1VkJztXq2nZApkTt6GM3wWQohtY4SqpZBiRwL9AdlohGOeYeHQOHvf86M6na0PvHtaosRTHJPmLbGtVAxZBkI8HAgZDZD"; // replace with Meta access token

        const payload = {
            data: [
                {
                    event_name: eventData.event,
                    event_time: Math.floor(Date.now() / 1000),
                    event_source_url: "https://yourwebsite.com",
                    action_source: "website",
                    custom_data: {
                        value: eventData.value,
                        currency: "USD"
                    }
                }
            ]
        };

        const response = await axios.post(
            `https://graph.facebook.com/v17.0/${pixel_id}/events?access_token=${access_token}`,
            payload
        );

        console.log("Meta response:", response.data);
        res.send("ok");

    }catch(err){
        console.error(err.response?.data || err.message);
        res.status(500).send("Error sending to Meta");
    }
});

app.get("/", (req,res)=>{
    res.send("Server is running 🚀");
});

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
});