import { expect, test } from '@playwright/test';
import { countryCodes } from './consts';
import { GoogleComMapsPage } from '../pages/google-com-maps-page';

// Given a user is on the Google Maps page
// Then the on-screen keyboard should be visible
test.describe('accessibility of on screen keyboard', () => {
	// failed tests due to some countries are actually missing on screen keyboard
	for (const code of countryCodes) {
		test(` for language code ${code}`, async ({ page }) => {
			const googleComMaps = new GoogleComMapsPage(page);
			await googleComMaps.goto({ languageCode: code });
			// decided to use language independent x-path locator for consent, only for language accessibility tests
			const consentAcceptanceXpath =
				'//*[@id="yDmH0d"]/c-wiz/div/div/div/div[2]/div[1]/div[3]/div[1]/div[1]/form[2]/div/div/button';
			await page.locator(`xpath=${consentAcceptanceXpath}`).click();
			await expect(page.locator('#itamenu')).toBeVisible({ timeout: 3000 });
		});
	}
});
