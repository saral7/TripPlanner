const imageAPI = 'https://picsum.photos/id';

export const keys = {
	randomImage: (id: string) => `${imageAPI}/${id}/500`,
};

const API = 'http://localhost:5000';
export const swrKeys = {
	trips: (id: string) => `${API}/trips${id}`,
	activities: (tripId: string, tripOwnerUsername: string) => `${API}/activities/${tripOwnerUsername}/${tripId}`,
};
