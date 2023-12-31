# <img src="./client/public/flexpa_logo.png" height="60px" align="center" alt="Flexpa logo"> Flexpa Work Sample - Rachel Humble

### This small app uses much of the "quick start" [boilerplate](https://www.flexpa.com/docs/getting-started/quickstart) code to get the /ExplanationOfBenefit resource and crudely display a small amount of the returned data.

## To use:
1. Clone repo: https://github.com/rachelhumble/flexpa_worksample.git
2. Get API keys
    * Create an account in the Flexpa [developer portal](https://portal.flexpa.com/) to get your test mode keys.
3. Configure .env files
    * In the /server directory, create a .env, set the following variables:
        - FLEXPA_PUBLIC_API_BASE_URL=https://api.flexpa.com
        - FLEXPA_API_SECRET_KEY=your_secret_test_mode_key
    * In the /client directory, create a .env, set the following variables:
        - VITE_SERVER_URL=http://localhost:6060
        - VITE_FLEXPA_PUBLISHABLE_KEY=your_publishable_test_mode_key
4. Install dependencies:
    ```cd client npm install```
    ```cd server npm install```
5. Compile:
    ```cd server npm run build```
6. Run the project by running both the frontend and server:
    * ```cd client npm run dev```
    * ```cd server npm run dev```
7. Test app functionality
    1. Login using "Flexpa Test Mode Sample Patient" health plan 
    2. Choose a [test login](https://www.flexpa.com/docs/getting-started/test-mode#test-mode-logins), ie ```email: patient2@flexpa.com pw: examplepatient```