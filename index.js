require('dotenv').config()
const express = require('express');
const cors = require('cors');
const axios = require('axios');
var zipcodes = require('zipcodes');

const app = express().disable('x-powered-by');

const corsOptions = {
	origin: 'http://localhost:3000',
	methods: 'OPTIONS,GET',
	allowedHeaders: 'Content-Type, Authorization',
	credentials: true,
}
app.use(cors(corsOptions));

app.get('', function(req, res) {

	if (req.headers.authorization !== process.env.AUTH) {
		return res.status(401).json({ error: 'Not Authorized' });
	}

	const weatherApi = process.env.WEATHER_API;
	const { location } = req.query;


	let lookupQuery = `?query=${location}`;
	if (/[0-9]/.test(location)) {
		const lookup = zipcodes.lookup(location);

		if (lookup == null) {
			return res.status(400).json({error: 'invalid zipcode'});
		}

		const latlong = lookup.latitude + ',' + lookup.longitude;
		lookupQuery = `?lattlong=${latlong}`;
	}

	// get location woeid
	axios({
		method: 'GET',
		url: weatherApi + 'location/search/' + lookupQuery
	})
	.then((result) => {

		if (!result.data.length) {
			return res.status(200).json(result.data);
		}

		const { woeid } = result.data[0];
		// get forecast
		axios({
			method: 'GET',
			url: weatherApi + 'location/' + woeid
		}).then((result2) => {
			return res.status(200).json(result2.data);
		})
		.catch((err) => {
			return res.status(404).json({ error: 'woeid not valid' });
		});

	})
	.catch((err) => {
		return res.status(404).json({ error: 'Not Found' });
	});
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on port ${server.address().port}`);
});
