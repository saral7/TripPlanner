import express from 'express';
import cors from 'cors';
const app = express();

var corsOptions = {
	origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

import bodyParser from 'body-parser';

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());

import { mockTrips, router as tripsRouter } from './routes/trips.routes.ts';
import { createDatabase, insertTrip, insertUser } from './db-helpers.ts';
import { IUser } from './typings/user.ts';
import { router as activitiesRouter } from './routes/activities.routes.ts';

app.use('/trips', tripsRouter);
app.use('/activities', activitiesRouter);

const Sara: IUser = {
	email: 'sara@sara.com',
	password: '12345',
	username: 'Sara',
};
insertUser(Sara);

app.listen(5000, () => console.log('Listening on port 5000'));
