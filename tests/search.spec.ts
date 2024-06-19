import { test, expect } from '@playwright/test';
import { Homepage } from '../pages/homepage';
import formatDate from '../helpers/formatDate';
import { ResultsPage } from '../pages/resultsPage';
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
			const resultsPage = new ResultsPage(page);

			// Go to homepage
			await page.goto('/');

			// Search for term
			await homepage.searchByTerm(term);
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
			// Go to homepage
			const homepage = new Homepage(page);
			const resultsPage = new ResultsPage(page);
			await page.goto('/');

			// Search for location
			await homepage.searchByLocation(city);

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

// test.describe('Search Journey - Unhappy Path', () => {
// 	test('finds 0 results', async ({ page }) => {
// 		for (let term of negativeSearchTerms) {
// 			const homepage = new Homepage(page);
// 			await page.goto('https://www.artrabbit.com');
// 			await homepage.searchForExhibitionByTerm(term);
// 			await expect(page.getByText('No results found.')).toBeVisible();
// 		}
// 	test('search term is too short', async ({ page }) => {
// 	  const homepage = new Homepage(page);
// 	  await page.goto('https://www.artrabbit.com');
// 	  await homepage.searchForExhibitionByTerm('hi');
// 	  await expect(
// 	    page.getByText('You need a longer search query')
// 	  ).toBeVisible();
// 	});
// 	test('displays message when 0 results are returned', async ({ page }) => {
// 		const homepage = new Homepage(page);
// 		await page.goto('https://www.artrabbit.com');
// 		homepage.searchForExhibitionByLocation('xyz');
// 		await page.pause();
// 		await expect(page.locator('.mod--location')).toHaveText(
// 			"We can't find any art events happening near xyz"
// 		);
// 	});
// });
