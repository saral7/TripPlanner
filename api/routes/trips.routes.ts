import { getAllTripsByUser, getTripByUser, insertTrip } from '../db-helpers';
import { ITripSummary } from '../typings/trip';

import express from 'express';
export const router = express.Router();

const imageAPI = 'https://picsum.photos/id';

export const keys = {
	randomImage: (id: string) => `${imageAPI}/${id}/500`,
};

export const mockTrips: ITripSummary[] = [
	{
		title: 'Roadtrip around France',
		titleImage: `${keys.randomImage(`${17 + 256}`)}`,
		startDate: '30/10/2022',
		endDate: '7/11/2022',
		destination: 'France',
		id: '1',
		username: 'Sara',
	},
	{
		title: 'Bol na Braču',
		startDate: '05/2019',
		endDate: '06/2019',
		destination: 'France',
		id: '2',
		username: 'Sara',
	},
	{
		title: 'Spain',
		titleImage: `${keys.randomImage(`${15 + 256}`)}`,
		startDate: '05/2019',
		endDate: '06/2019',
		destination: 'France',
		id: '2',
		username: 'Sara',
	},
	{
		title: 'Scandinavia - Finland, Sweden, Norway',
		titleImage: `${keys.randomImage(`${27 + 256}`)}`,
		startDate: '7/1/2003',
		endDate: '18/1/2003',
		destination: 'France',
		id: '3',
		username: 'Sara',
	},
];

router.get('/', async (req, res, next) => {
	console.log(req.headers.uuid);
	const trips = await getAllTripsByUser(req.headers.uuid);
	res.send(trips);
});

router.get('/:id', async (req, res, next) => {
	console.log(req.headers.uuid, req.params.id);
	const trips = await getTripByUser(req.headers.uuid, req.params.id);
	console.log(trips);
	res.send(trips);
});

router.post('/', async (req, res, next) => {
	try {
		const trips: ITripSummary[] = await getAllTripsByUser('Sara');

		let filteredTrips = trips
			.map((trip) => trip.id)
			.sort((a, b) => parseInt(a) - parseInt(b))
			.at(-1);

		const id: number = filteredTrips ? parseInt(filteredTrips) + 1 : 1;

		console.log('dobijes ovaj id ', id);
		const trip = { ...req.body, username: 'Sara', id: `${id}` };
		await insertTrip(trip);
	} catch (err) {
		console.log('ulovio sam', err);
		if (err) res.status(400).end();
		else res.status(204).end();
	}
});
