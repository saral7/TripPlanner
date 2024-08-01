export interface IActivityItem {
	tripOwnerUsername: string;
	tripId: string;
	activityId: string;
	activityCreatorUsername: string;
	title: string;
	activityUrl?: string;
	description?: string;
	location?: string;
	locationUrl?: string;
	cost?: number;
	date?: string;
}

export interface IActivityItemDisplay {
	activityCreatorUsername: boolean;
	description: boolean;
	location: boolean;
	cost: boolean;
	date: boolean;
}
