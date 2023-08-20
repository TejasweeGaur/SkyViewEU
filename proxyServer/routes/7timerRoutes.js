const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');
const axios = require('axios').default;
const apicache = require('apicache');
const { type } = require('os');
require('dotenv').config();

//Env varaibles
const API_BASE_URL = process.env.WEATHER_API_BASE_URL;

// Initialize cache
let cache = apicache.middleware;

router.get("/", cache('15 seconds'), async (req, res) => {
    try {
        const params = new URLSearchParams({
            ...url.parse(req.url, true).query,
        });
        axios.get(`${API_BASE_URL}?${params}`)
            .then(function (response) {
                const data = response.data;
                res.status(200).send(data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                console.log("Response received !!!");
            });
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;