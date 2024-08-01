import sqlite3 from 'sqlite3';
import { ITripSummary } from './typings/trip';
import { IUser } from './typings/user';
import { resolve } from 'styled-jsx/css';
import { IActivityItem } from './typings/activity';
const sqlite = sqlite3.verbose();

let db;

export function createDatabase() {
	db = new sqlite.Database('trip-planner.db', (error) => {
		if (error) {
			console.log('An error occured!');
			return false;
		} else {
			console.log('Successfully connected to Database');
			createTables();
			return true;
		}
	});
}

function createTables() {
	db.exec(`
      CREATE TABLE USER
      (
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      email TEXT NOT NULL,
      PRIMARY KEY (username),
      UNIQUE (email)
      );

      CREATE TABLE TRIP
      (
      tripId TEXT NOT NULL,
      title TEXT NOT NULL,
      startDate TEXT NOT NULL,
      endDate TEXT NOT NULL,
      titleImage TEXT,
      tripOwnerUsername TEXT NOT NULL,
      PRIMARY KEY (tripId, tripOwnerUsername),
      FOREIGN KEY (tripOwnerUsername) REFERENCES USER(username) ON DELETE CASCADE
      );

      CREATE TABLE wentOn
      (
      username TEXT NOT NULL,
      tripId TEXT NOT NULL,
      tripOwnerUsername TEXT NOT NULL,
      PRIMARY KEY (username, tripId, tripOwnerUsername),
      FOREIGN KEY (username) REFERENCES USER(username) ON DELETE CASCADE,
      FOREIGN KEY (tripId, tripOwnerUsername) REFERENCES TRIP(tripId, tripOwnerUsername) ON DELETE CASCADE
      );

		CREATE TABLE ACTIVITY
		(
		activityId TEXT NOT NULL,
		activityCreatorUsername TEXT,
		activityUrl TEXT,
		date TEXT,
		location TEXT,
		locationUrl TEXT,
		title TEXT NOT NULL,
		description TEXT,
		cost REAL,
		tripId INT NOT NULL,
		tripOwnerUsername INT NOT NULL,
		PRIMARY KEY (activityId, tripOwnerUsername, tripId),
		FOREIGN KEY (tripId, tripOwnerUsername) REFERENCES TRIP(tripId, tripOwnerUsername) 
		);
		`);
}

export function insertTrip({ tripOwnerUsername, tripId, titleImage, startDate, endDate, title }: ITripSummary) {
	console.log('uspio trip');
	console.log(tripOwnerUsername, tripOwnerUsername, titleImage, startDate, endDate, title);
	const db = new sqlite.Database('trip-planner.db', sqlite.OPEN_READWRITE);

	try {
		return new Promise((resolve, reject) => {
			db.run(
				`insert into trip (tripOwnerUsername, tripId, title, startDate, endDate, titleImage)   
                        values (?, ?, ?, ?, ?, ?) `,
				[tripOwnerUsername, tripId, title, startDate, endDate, titleImage],
				(err) => {
					console.log('TUUU');
					//throw new Error('ERORCINA');
					reject(err);
				}
			);
		});
	} catch (err) {
		console.log('i TUU');
		throw err;
	}
}

export function insertUser({ username, email, password }: IUser) {
	console.log('uspio usera');
	console.log(username, email, password);
	const db = new sqlite.Database('trip-planner.db', sqlite.OPEN_READWRITE, (err) => {
		if (err) {
			console.log('Error on user insert');
			return false;
		} else {
			db.run(
				`insert into user (username, email, password)   
                        values (?, ?, ?) `,
				[username, email, password],
				(err) => {
					console.log('Evo error:', err);
				}
			);
		}
	});
}

export function insertActivity({
	tripOwnerUsername,
	tripId,
	activityId,
	activityCreatorUsername,
	title,
	activityUrl,
	description,
	location,
	locationUrl,
	cost,
	date,
}: IActivityItem) {
	console.log(
		tripOwnerUsername,
		tripId,
		activityId,
		activityCreatorUsername,
		title,
		activityUrl,
		description,
		location,
		locationUrl,
		cost,
		date
	);
	const db = new sqlite.Database('trip-planner.db', sqlite.OPEN_READWRITE);

	try {
		return new Promise((resolve, reject) => {
			db.run(
				`insert into activity (tripOwnerUsername, tripId, activityId, activityCreatorUsername, title, activityUrl, description, location, locationUrl, cost, date)   
            values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `,
				[
					tripOwnerUsername,
					tripId,
					activityId,
					activityCreatorUsername,
					title,
					activityUrl,
					description,
					location,
					locationUrl,
					cost,
					date,
				],
				(err) => {
					console.log('Evo error:', err);
					reject(err);
				}
			);
		});
	} catch (err) {
		console.log('i TUU');
		throw err;
	}
}

export async function getAllTripsByUser(username: string) {
	const db = new sqlite.Database('trip-planner.db', sqlite.OPEN_READWRITE);
	return new Promise((resolve: (value: ITripSummary[]) => void, reject) => {
		db.all(`select * from trip where trip.tripOwnerUsername = ?`, [username], (err, rows) => {
			if (err) {
				console.log(`Cannot get trips by user ${username}`);
				reject();
			} else {
				resolve(rows as ITripSummary[]);
			}
		});
	});
}

export async function getAllActivitiesOnTrip(tripId: string, tripOwnerUsername: string) {
	const db = new sqlite.Database('trip-planner.db', sqlite.OPEN_READWRITE);
	return new Promise((resolve: (value: IActivityItem[]) => void, reject) => {
		db.all(
			`select * from activity where activity.tripId = ? and activity.tripOwnerUsername = ?`,
			[tripId, tripOwnerUsername],
			(err, rows) => {
				if (err) {
					console.log(`Cannot get activities on trip ${tripId} by ${tripOwnerUsername}`);
					reject();
				} else {
					resolve(rows as IActivityItem[]);
				}
			}
		);
	});
}

export async function getTripByUser(username: string, id: string) {
	const db = new sqlite.Database('trip-planner.db', sqlite.OPEN_READWRITE);
	return new Promise((resolve: (value: ITripSummary) => void, reject) => {
		db.all(`select * from trip where trip.tripownerUsername = ? and trip.tripId = ?`, [username, id], (err, rows) => {
			if (err) {
				console.log(`Cannot get trips by user ${username}`);
				reject();
			} else {
				resolve(rows[0] as ITripSummary);
			}
		});
	});
}
