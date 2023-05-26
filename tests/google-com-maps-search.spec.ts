import { test, expect } from '@playwright/test';
import { GoogleComMapsPage } from '../pages/google-com-maps-page';

test.describe('on the Google Maps page', () => {
	let googleComMaps;
	test.beforeEach(async ({ page }) => {
		googleComMaps = new GoogleComMapsPage(page);
		await googleComMaps.goto();
		await googleComMaps.clickConsentButton();
	});

	// Given a user is on the Google Maps page
	// When the user enters “Paris” in the search box
	// AND clicks “Search”
	// Then the left panel should have "Paris" as the headline text
	test('left panel should have "Paris" as the headline text', async ({
		page,
	}) => {
		const locationName = 'Paris';
		await googleComMaps.enterLocationName(locationName);
		await googleComMaps.clickSearchButton();

		await expectLocationHeadline(locationName);
		await expectVisualSnapshot(page);
	});

	// Given a user is on the Google Maps page
	// When the user enters “London” in the search box
	// AND clicks “Search”
	// Then the left panel should have "London" as the headline text
	// When the user clicks the “Directions” button
	// Then the destination field should contain "London"
	test('left panel should have "London" as the headline text', async ({
		page,
	}) => {
		const locationName = 'London';
		await googleComMaps.enterLocationName(locationName);
		await googleComMaps.clickSearchButton();

		await expectLocationHeadline(locationName);
		await expectDestinationField(locationName);
		await expectVisualSnapshot(page);
	});

	// Given a user is on the Google Maps page
	// When the user enters “Paris” in the search box
	// AND clicks “Restaurans”
	// Then the search box field should contain "Restaurans"
	test(
		'search input should have Restaurants if Restaurants button clicked ' +
			'even after typing location name',
		async () => {
			const locationName = 'Paris';
			const buttonName = 'Restaurants';
			await googleComMaps.enterLocationName(locationName);
			await googleComMaps.clickRestaurantsButton();
			await expect(googleComMaps.searchboxInput).toHaveValue(buttonName);
		}
	);

	const expectLocationHeadline = async (locationName) => {
		await expect(googleComMaps.headline).toHaveText(locationName);
	};

	const expectDestinationField = async (locationName) => {
		await test.step(`destination field should contain ${locationName}`, async () => {
			const re = new RegExp(locationName);
			await googleComMaps.clickDirectionsButton();
			await expect(googleComMaps.directionSearchbox).toHaveValue(re);
		});
	};

	const expectVisualSnapshot = async (page) => {
		if (process.env.ENABLE_VISUAL_CHECK === 'true') {
			await test.step(`map is visible on page`, async () => {
				// in case of false positives below diff can be increased
				// example pixels diff between London and Paris is around 80000 pixels
				// so 10000 seems to be a safe value
				const maxDiffPixels = 10_000;
				await page.waitForLoadState();
				await expect(page).toHaveScreenshot({ maxDiffPixels });
			});
		}
	};
});
