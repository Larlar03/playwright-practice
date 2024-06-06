import { Page } from '@playwright/test';

export class Homepage {
	page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async Search(term: string) {
		await this.page.getByRole('link', { name: 'Toggle Search' }).click();
		await this.page.getByPlaceholder('Search here...').fill(term);
		await this.page.locator('.m_slideout-search-go').click();
	}

	async goToLoginPage() {}
}
