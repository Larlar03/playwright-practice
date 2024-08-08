import { test, expect } from '@playwright/test';
import { Homepage } from '../pages/homePage';
import formatDate from '../helpers/formatDate';
import {
	cities,
	positiveSearchTerms,
	negativeSearchTerms,
} from '../helpers/constants';

// TODO
//  Search for people, organisations and artworks
export const headingClasses = [
	'h2.b_categorical-heading',
	'h1.b_large-heading',
	// 'h4.b_instuctional-text',
	// 'a.b_self-target',
];
export const informationText = [
	'Location and hours',
	'Travel information',
	'Contact and socials',
];

test.describe('Search Journey - Happy Path', () => {
	test('user can search for event by interest', async ({ page }) => {
		for (let term of positiveSearchTerms) {
			const homepage = new Homepage(page);

			// Go to homepage
			await page.goto('/');

			// Search for term
			const resultsPage = await homepage.searchByTerm(term);
			await expect(page).toHaveTitle(`Searching for ${term}`);
			await expect(
				page.getByRole('heading', { name: `Searching for '${term}'` })
			).toBeVisible();

			// Select events menu and click a result
			await resultsPage.selectSubMenuTab(1);
			const results = await resultsPage.getResults('.l_container');
			await resultsPage.goToAnyResult(results);

			for (let heading of headingClasses) {
				await expect(page.locator(heading)).toBeVisible();
			}

			const hasTimeAndDetails = page.getByText('Time and details');

			if (hasTimeAndDetails) {
				await expect(page.getByText('Time and details')).toBeHidden();
			} else {
				for (let information of informationText) {
					await expect(
						page.locator(`button:text('${information}')`)
					).toBeVisible();
				}
			}
		}
	});

	test('user can search for event by location', async ({ page }) => {
		for (let city of cities) {
			const homepage = new Homepage(page);

			// Go to homepage
			await page.goto('/');

			// Search for location
			const resultsPage = await homepage.searchByLocation(city);

			// Check date
			const date = formatDate();
			await expect(page.getByText(`${date}`)).toBeVisible();

			// Go to a result
			await page.waitForSelector('.m_columnised', { timeout: 10000 });

			const results = await resultsPage.getResults('.m_listing-item');
			// await expect(page.locator('.m_result-text')).toHaveText(
			// 	`Showing 1 to ${results.length} sorted by start date.`
			// );

			resultsPage.goToAnyResult(results);

			// Verify page
			for (let heading of headingClasses) {
				await expect(page.locator(heading)).toBeVisible();
			}

			const hasTimeAndDetails = page.getByText('Time and details');

			if (hasTimeAndDetails) {
				await expect(page.getByText('Time and details')).toBeHidden();
			} else {
				for (let information of informationText) {
					await expect(
						page.locator(`button:text('${information}')`)
					).toBeVisible();
				}
			}
		}
	});
});

test.describe('Search Journey - Unhappy Paths', () => {
	test('finds 0 results', async ({ page }) => {
		const homepage = new Homepage(page);

		// search for negative terms
		for (let term of negativeSearchTerms) {
			await page.goto('/');
			await homepage.searchByTerm(term);
			await expect(page.getByText('No results found.')).toBeVisible();
		}

		// on the results page search for a short term
		await page.getByRole('searchbox', { name: 'Search here...' }).fill('Hi');
		await page.getByRole('button', { name: 'Go' }).click();
		await expect(
			page.getByText('You need a longer search query')
		).toBeVisible();
	});

	test('search term is too short', async ({ page }) => {
		// const homepage = new Homepage(page);
		await page.goto('/');
		// on the results page search for a short term
		await page.getByRole('searchbox', { name: 'Search here...' }).fill('Hi');
		await page.getByRole('button', { name: 'Go' }).click();
		await expect(
			page.getByText('You need a longer search query')
		).toBeVisible();
	});

	test.only('displays message when invalid location is searched', async ({
		page,
	}) => {
		// const homepage = new Homepage(page);
		await page.goto('/');

		// search for invalid location
		await page.getByPlaceholder('type location').click();
		await page.getByPlaceholder('type location').fill('xyz');
		await page.getByText("XYZ by The Art of XYZQueen's").click();
		await page.getByRole('button', { name: 'Go', exact: true }).click();
		await page.pause();
		await expect(
			page.getByText(
				"We can't find any art events happening near XYZ by The Art of XYZ"
			)
		).toBeVisible();
	});
});
