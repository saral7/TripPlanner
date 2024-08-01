import { IDate } from './datetime';

export interface ITripSummary {
	titleImage?: string;
	title: string;
	startDate: string;
	endDate: string;
	destination: string;
	tripId?: string;
	tripOwnerUsername: string; //trip owner username
}
