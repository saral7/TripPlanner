import sqlite3 from 'sqlite3';
import { ITripSummary } from './typings/trip';
import { IUser } from './typings/user';
import { resolve } from 'styled-jsx/css';
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
      id TEXT NOT NULL,
      title TEXT NOT NULL,
      startDate TEXT NOT NULL,
      endDate TEXT NOT NULL,
      titleImage TEXT,
      username TEXT NOT NULL,
      PRIMARY KEY (id, username),
      FOREIGN KEY (username) REFERENCES USER(username) ON DELETE CASCADE
      );

      CREATE TABLE wentOn
      (
      username TEXT NOT NULL,
      id TEXT NOT NULL,
      ownerUsername TEXT NOT NULL,
      PRIMARY KEY (username, id, ownerUsername),
      FOREIGN KEY (username) REFERENCES USER(username) ON DELETE CASCADE,
      FOREIGN KEY (id, ownerUsername) REFERENCES TRIP(id, username) ON DELETE CASCADE
      );`);
}

export function insertTrip({ username, id, titleImage, startDate, endDate, title }: ITripSummary) {
	console.log('uspio trip');
	console.log(username, id, titleImage, startDate, endDate, title);
	const db = new sqlite.Database('trip-planner.db', sqlite.OPEN_READWRITE);

	try {
		return new Promise((resolve, reject) => {
			db.run(
				`insert into trip (username, id, title, startDate, endDate, titleImage)   
                        values (?, ?, ?, ?, ?, ?) `,
				[username, id, title, startDate, endDate, titleImage],
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

export async function getAllTripsByUser(username: string) {
	const db = new sqlite.Database('trip-planner.db', sqlite.OPEN_READWRITE);
	return new Promise((resolve: (value: ITripSummary[]) => void, reject) => {
		db.all(`select * from trip where trip.username = ?`, [username], (err, rows) => {
			if (err) {
				console.log(`Cannot get trips by user ${username}`);
				reject();
			} else {
				resolve(rows as ITripSummary[]);
			}
		});
	});
}

export async function getTripByUser(username: string, id: string) {
	const db = new sqlite.Database('trip-planner.db', sqlite.OPEN_READWRITE);
	return new Promise((resolve: (value: ITripSummary) => void, reject) => {
		db.all(`select * from trip where trip.username = ? and trip.id = ?`, [username, id], (err, rows) => {
			if (err) {
				console.log(`Cannot get trips by user ${username}`);
				reject();
			} else {
				resolve(rows[0] as ITripSummary);
			}
		});
	});
}
