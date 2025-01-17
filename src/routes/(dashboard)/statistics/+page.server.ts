import { getPersonsCountPerBuilding, getPersonsCountPerDepartment } from '$lib/server/db/person';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { database } = locals;
	try {
		const personsCountP = getPersonsCountPerDepartment(database);
		const personsInsideCountP = getPersonsCountPerBuilding(database);

		const personsCount = await personsCountP;
		const personsInsideCount = await personsInsideCountP;

		return {
			personsCount,
			personsInsideCount
		};
	} catch (err: unknown) {
		console.debug(`Failed to get statistics: ${(err as Error).message}`);
		return fail(500, {
			message: 'Failed to get statistics'
		});
	}
};

export const actions: Actions = {
	default: async ({ locals }) => {
		const { database } = locals;
		try {
			const personsCountP = getPersonsCountPerDepartment(database);
			const personsInsideCountP = getPersonsCountPerBuilding(database);

			const personsCount = await personsCountP;
			const personsInsideCount = await personsInsideCountP;

			return {
				personsCount,
				personsInsideCount,
				message: 'Successfully refreshed statistics'
			};
		} catch (err: unknown) {
			console.debug(`Failed to get statistics: ${(err as Error).message}`);
			return fail(500, {
				message: 'Failed to get statistics'
			});
		}
	}
};
