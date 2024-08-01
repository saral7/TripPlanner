import express from 'express';
import { getAllActivitiesOnTrip, insertActivity } from '../db-helpers';
import { IActivityItem } from '../typings/activity';
export const router = express.Router();

router.get('/:tripOwnerUsername/:tripId', async (req, res, next) => {
	const tripId = req.params.tripId;
	const tripOwnerUsername = req.params.tripOwnerUsername;
	console.log('get activities', tripId, tripOwnerUsername);
	const activities = await getAllActivitiesOnTrip(tripId, tripOwnerUsername);
	res.send(activities);
});

router.post('/:tripOwnerUsername/:tripId', async (req, res, next) => {
	const tripId = req.params.tripId;
	const tripOwnerUsername = req.params.tripOwnerUsername;
	console.log('post a new activity', tripId, tripOwnerUsername);
	try {
		const activities: IActivityItem[] = await getAllActivitiesOnTrip(tripId, tripOwnerUsername);
		console.log(activities);
		let filteredActivities =
			activities && activities.length >= 1
				? activities
						.map((activity) => activity.activityId)
						.filter((id) => id !== undefined)
						.sort((a, b) => parseInt(a) - parseInt(b))
						.at(-1)
				: undefined;

		const id: number = filteredActivities ? parseInt(filteredActivities) + 1 : 1;
		console.log(id);
		console.log('dobijes ovaj id ', id);
		await insertActivity({ ...req.body, tripId: tripId, tripOwnerUsername: tripOwnerUsername, activityId: id });
	} catch (err) {
		console.log('ulovio sam', err);
		if (err) res.status(400).end();
		else res.status(204).end();
	}
});
