export async function fetcher<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
	let data;
	try {
		const response = await fetch(input, init);
		if (!response.ok) {
			throw response;
		}
		if (response.status !== 204) data = await response.json();
	} catch (error) {
		throw error;
	}
	return data;
}

export async function authFetcher<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
	return fetcher(input, {
		headers: { uuid: 'Sara' },
		...init,
	});
}
