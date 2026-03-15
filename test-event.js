const axios = require("axios");

axios.post("https://tracking-server-q8wk.onrender.com/event", {
    event: "Purchase",
    value: 49.99
})
.then(res => console.log(res.data))
.catch(err => console.error(err.response?.data || err.message));