import { test, expect } from '@playwright/test';
import formatDate from '../helpers/formatDate';

const cities: string[] = [
	'Bristol',
	'New York',
	'Manchester',
	'London',
	'Edinburgh',
];

test.describe('Location Search Functionality', () => {
	// Positive tests
	for (let city of cities) {
		test(`has title with location of ${city}`, async ({ page }) => {
			await page.goto('https://www.artrabbit.com');

			await page.getByPlaceholder('type location').fill(city);
			await page.getByRole('button', { name: 'Go', exact: true }).click();

			await expect(page).toHaveTitle(
				`Contemporary art exhibitions and events near ${city}`
			);
		});
	}

	test('displays todays date', async ({ page }) => {
		await page.goto('https://www.artrabbit.com');

		await page.getByPlaceholder('type location').fill(cities[0]);
		await page.getByRole('button', { name: 'Go', exact: true }).click();
		const date = formatDate();

		await expect(page.getByText(`${date}`)).toBeVisible();
	});

	test('displays results', async ({ page }) => {
		await page.goto('https://www.artrabbit.com');

		await page.getByPlaceholder('type location').fill(cities[1]);
		await page.getByRole('button', { name: 'Go', exact: true }).click();

		await page.waitForSelector('.m_columnised', { timeout: 10000 });

		const results = await page.locator('.m_listing-item').all();
		const resultsLength = results.length;

		console.log(`Number of results: ${resultsLength}`);

		await expect(page.locator('.m_result-text')).toHaveText(
			`Showing 1 to ${resultsLength} sorted by start date.`
		);
	});

	// Negative tests
	// test('displays message when 0 results are returned', async ({
	// 	page,
	// }) => {
	// 	await page.goto('https://www.artrabbit.com');

	// 	await page.getByPlaceholder('type location').fill('Satellite Bus Stand');
	// 	await page.pause();
	// 	await page.getByRole('button', { name: 'Go', exact: true }).click();

	// 	await expect(page.locator('.mod--location')).toHaveText(
	// 		"We can't find any art events happening  near Satellite Bus Stand"
	// 	);
	// });
});
