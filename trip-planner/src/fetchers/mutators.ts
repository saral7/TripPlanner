import { ITripSummary } from '@/typings/trip';
import { fetcher } from './fetchers';
import { IActivityItem } from '@/typings/activity';

export async function createTrip(url: string, { arg }: { arg: ITripSummary }) {
	console.log(arg, JSON.stringify(arg));
	await fetcher<ITripSummary>(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(arg),
	});
}

export async function createActivity(url: string, { arg }: { arg: IActivityItem }) {
	console.log(arg, JSON.stringify(arg));
	await fetcher<IActivityItem>(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(arg),
	});
}
