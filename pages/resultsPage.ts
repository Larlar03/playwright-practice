import { Locator, Page } from '@playwright/test';

export class ResultsPage {
	page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async selectSubMenuTab(position: number): Promise<void> {
		const submenuLinks = await this.page.locator('.m_submenu-control').all();
		await submenuLinks[position].click();
	}

	async getResults(containerClass: string): Promise<Locator[]> {
		const results = await this.page.locator(containerClass).all();
		return results;
	}

	async goToAnyResult(results: Locator[]): Promise<void> {
		if (results.length === 0) {
			console.log('0 results returned');
			return;
		} else {
			const index = Math.floor(Math.random() * results.length);
			await results[index].click();
		}
	}
}
