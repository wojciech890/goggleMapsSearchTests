# Playwright tests for Google Maps.

## Table of Contents

- [To run tests locally](#To-run-tests-locally)
- [References](#References)

## To run tests locally

Prerequisites:  
Node installed:
https://nodejs.org/en

Clone current repo

```sh
git clone https://github.com/wojciech890/goggleMapsSearchTests.git
```

Install Playwright dependencies:

```
npm install
npx playwright install --with-deps
```

Run Playwright tests:  
`npm run test`  
Run Playwright tests with map visibility check:  
`npm run test:visual`  
Run Playwright tests for on-screen keyboard accessibility check:  
`npm run test:accesibility`
See test report:  
`npm run test:report`

## References

Resources used:

Page object structure:
https://playwright.dev/docs/pom

Text input:
https://playwright.dev/docs/input
https://playwright.bootcss.com/python/docs/selectors#best-practices
https://stackoverflow.com/questions/62002041/getting-value-of-input-element-in-playwright

Screenshot on failure:
https://testersdock.com/playwright-screenshot-capture/

Video capture on failure:
https://playwright.dev/docs/videos

Test steps:
https://timdeschryver.dev/blog/keep-your-playwright-tests-structured-with-steps#steps
