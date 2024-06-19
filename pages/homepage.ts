import { Page } from '@playwright/test';

export class Homepage {
	page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async searchByTerm(term: string): Promise<void> {
		await this.page.getByRole('link', { name: 'Toggle Search' }).click();
		await this.page.getByPlaceholder('Search here...').fill(term);
		await this.page.locator('.m_slideout-search-go').click();
	}

	async searchByLocation(location: string): Promise<void> {
		await this.page.getByPlaceholder('type location').fill(location);
		await this.page.getByRole('button', { name: 'Go', exact: true }).click();
	}

	async goToLoginPage(): Promise<void> {
		await this.page.getByRole('link', { name: 'Toggle Log in' }).click();
	}

	async goToSignUpPage(): Promise<void> {
		await this.page.getByRole('link', { name: 'Toggle Log in' }).click();
		await this.page.getByRole('link', { name: 'Join Artrabbit' }).click();
	}
}
