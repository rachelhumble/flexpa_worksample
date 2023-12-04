# Flexpa Work Sample - Rachel Humble

# <img src="./flexpa_logo.png" height="60px" align="center" alt="Flexpa logo"> 

## To use:
1. Clone repo: https://github.com/rachelhumble/flexpa_worksample.git
2. Get API keys
    * Create an account in the Flexpa [developer portal](https://portal.flexpa.com/) to get your test mode keys.
3. Configure .env files
    * In your /server .env, set the following variables:
        - FLEXPA_PUBLIC_API_BASE_URL=https://api.flexpa.com
        - FLEXPA_API_SECRET_KEY=your_secret_test_mode_key
    * In the /client .env, set the following variables:
        - VITE_SERVER_URL=http://localhost:6060
        - VITE_FLEXPA_PUBLISHABLE_KEY=your_publishable_test_mode_key
4. Install dependencies:
    ```npm install```
5. Run the project:
    ```npm run dev```
