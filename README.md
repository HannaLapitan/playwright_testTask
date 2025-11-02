# ClosedLoop AI Test Automation

## Overview
This repository contains automated tests for the ClosedLoop AI platform, a customer feedback automation system. The test suite includes both API and UI tests using Playwright, covering critical functionality of the insights dashboard and API endpoints.

## Prerequisites
- Node.js (v20 or higher)
- npm or yarn
- Playwright

## Setup

1. Clone the repository:
```bash
git clone https://github.com/HannaLapitan/playwright_testTask.git
cd playwright_testTask
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Create a `.env` file in the root directory with the following credentials:
```env
USER_EMAIL=testclosedloopai@seekercompany.anonaddy.me
USER_PASSWORD=PassWord123!
API_KEY=48f31e05419b2c99f659bdb8063aa250993935f8a62a4251142b06e6d4bf7ee7
```

## Running Tests

### UI Tests with Visual Interface
```bash
npx playwright test --ui
# or
yarn playwright test --ui
```

### API Tests Only
```bash
npx playwright test --project=api-tests
# or
yarn playwright test --project=api-tests
```

### All Tests
```bash
npx playwright test
# or
yarn playwright test
```

## Test Structure

- `/api-tests` - API test scenarios
- `/tests` - UI test scenarios
- `/test-plans` - Detailed test plans and documentation

## CI/CD

The project includes GitHub Actions workflows that run:
- API tests
- UI tests (Chromium)
- Test reports are automatically generated and uploaded as artifacts

## Reports

After test execution, you can find the HTML report in:
- `playwright-report/index.html`

## Available Test Scenarios

1. API Tests:
   - Feedback ingestion endpoints
   - Error handling
   - Authentication validation

2. UI Tests:
   - Page load verification
   - Authentication flows
   - Navigation and layout
   - Data display verification

## Notes

- Tests are configured to run in parallel by default
- Retries are enabled for CI environments
- HTML reports are generated automatically
- Authentication state is preserved between test runs for efficiency