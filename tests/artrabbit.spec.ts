import { test, expect } from '@playwright/test';

const positiveSearchTerms: string[] = [
	'pottery',
	'textiles',
	'purple',
	'transport',
];

const negativeSearchTerms: string[] = [
	'voucher',
	'hair dye',
	'conveyancer',
	'ibuprophen',
];

// Positive tests
test('searches term', async ({ page }) => {
	for (let term of positiveSearchTerms) {
		await page.goto('https://www.artrabbit.com');
		await page.getByRole('link', { name: 'Toggle Search' }).click();
		await page.getByPlaceholder('Search here...').fill(term);
		await page.locator('.m_slideout-search-go').click();

		await expect(page.getByText(`Searching for '${term}'`)).toBeVisible();
	}
});

// Negative tests
test('finds 0 results', async ({ page }) => {
	for (let term of negativeSearchTerms) {
		await page.goto('https://www.artrabbit.com');
		await page.getByRole('link', { name: 'Toggle Search' }).click();
		await page.getByPlaceholder('Search here...').fill(term);
		await page.locator('.m_slideout-search-go').click();

		await expect(page.getByText('No results found.')).toBeVisible();
	}
});

test('search term is too short', async ({ page }) => {
	await page.goto('https://www.artrabbit.com');
	// await page.pause();
	await page.getByRole('link', { name: 'Toggle Search' }).click();
	await page.getByPlaceholder('Search here...').fill('hi');
	await page.locator('.m_slideout-search-go').click();

	await expect(page.getByText('You need a longer search query')).toBeVisible();
});
