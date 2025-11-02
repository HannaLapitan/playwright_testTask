# playwrite_testTask
run yarn install
# Run tests in UI mode
<!-- run ui tests loading runner -->
yarn playwright test --ui 
<!-- run api tests striggering separate project -->
yarn playwright test --project=api-tests

<!-- password and user are provided for the testing purpose -->
Add .env file
| Key | Value |
| :--- | :--- |
| `USER_EMAIL` | `testclosedloopai@seekercompany.anonaddy.me` |
| `USER_PASSWORD` | `PassWord123!` |
| `API_KEY` | `48f31e05419b2c99f659bdb8063aa250993935f8a62a4251142b06e6d4bf7ee7` |
