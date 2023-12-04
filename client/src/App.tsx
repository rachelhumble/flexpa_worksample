import './App.css'
import "./style.css";
import React, { useEffect, useState } from "react";
import Eob from "./components/Eob";
import { FlexpaConfig, LinkExchangeResponse } from "./flexpa_types";
import { Bundle, FhirResource, ExplanationOfBenefit } from "fhir/r4";
import Grid from '@mui/material/Unstable_Grid2';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

declare const FlexpaLink: {
  create: (config: FlexpaConfig) => Record<string, unknown>;
  open: () => Record<string, unknown>;
};


function App() {

  const [authorized, setAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [eob, setEob] = useState<Bundle<FhirResource > | Bundle<ExplanationOfBenefit>>()

  let eobResponse;
  let eobBody: Bundle;

  useEffect(() => {
    FlexpaLink.create({
      publishableKey: import.meta.env.VITE_FLEXPA_PUBLISHABLE_KEY,
      onSuccess: async (publicToken: string) => {
        /*  Make a request to the `POST /flexpa-access-token` endpoint that we wrote in `server`.
            include the `publicToken` in the body. */
        let resp;
        try {
          resp = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/flexpa-access-token`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ publicToken }),
            },
          );
        } catch (err) {
          console.log("err", err);
        }

        if (!resp) {
          return;
        }

        // Parse the response body
        const { accessToken, expiresIn } =
          (await resp.json()) as LinkExchangeResponse;
          
        // Fetch additional data when authorized
        if (accessToken) {
          setAuthorized(true);
          setIsLoading(true);
          const fetchData = async () => {
            eobResponse = await fetch(
              `${import.meta.env.VITE_SERVER_URL
              }/fhir/ExplanationOfBenefit?patient=$PATIENT_ID`,
              {
                method: "GET",
                headers: {
                  authorization: `Bearer ${accessToken}`,
                },
              },
            )

            eobBody = await eobResponse.json();
            return eobBody;
          }

          await fetchData()
            .then(eobBody => {
              if (eobBody.entry) {
                setEob(eobBody)
                setIsLoading(false);
                return eobBody;
              }
            })
            .catch((error) => {
              console.log("Eob error: ", error);
              return;
            })
        }
      }
    })
  }, [])

  if (!import.meta.env.VITE_FLEXPA_PUBLISHABLE_KEY) {
    console.error(
      "No publishable key found. Set VITE_FLEXPA_PUBLISHABLE_KEY in .env",
    );
  }

  return (
    <Grid container id="flexpa-link">
      <Grid xs={12}>
        <Typography variant="h2">Flexpa Work Sample</Typography>
      </Grid>
      {authorized && isLoading && <Grid xs={12}><Typography variant='h6'>Loading...</Typography></Grid>}
      {authorized && !isLoading && eob ? <Eob eobDisplay={eob} /> : <Grid xs={12} id="eob-grid">
        <Button onClick={() => FlexpaLink.open()} variant="contained" style={{ marginTop: '10px' }}>
          Connect your health plan with Flexpa Link
        </Button>
      </Grid>}
    </Grid>
  )
}

export default App;
