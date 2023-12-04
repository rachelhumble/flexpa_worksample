import './App.css'
import "./style.css";
import React, { useEffect, useState } from "react";
import { FlexpaConfig, LinkExchangeResponse } from "./flexpa_types";
import displaySuccessMessage from "./link_success";
import displayCoverage from "./coverage_display";
import { Bundle, Coverage, FhirResource, Patient } from "fhir/r4";
import Grid from '@mui/material/Unstable_Grid2';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

declare const FlexpaLink: {
  create: (config: FlexpaConfig) => Record<string, unknown>;
  open: () => Record<string, unknown>;
};


function App() {

  const [authorized, setAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [eob, setEob] = useState<Bundle<FhirResource>>()

  let eobResource;
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
                // eobResource = eobBody.entry[0].resource
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
  console.log(eob)

  // function createRows(
  //   variable: string,
  //   data: string,
  // ) {
  //   return { variable, data };
  // }

  // if(eob) {
  //   const rows = [
  //     createRows('Status:', eob?.entry[0].resource.status),
  //     createRows('Outcome:', eob?.entry[0].request.outcome),
  //     createRows('Date Created:', eob?.entry[0].resource.created),
  //   ];
  //   console.log(rows)
  // }




  return (
    <Grid container id="flexpa-link">
      <Grid xs={12}>
        <Typography variant="h2">Flexpa Work Sample</Typography>
      </Grid>
      {authorized && isLoading && <Grid xs={12}><Typography variant='h6'>Loading...</Typography></Grid>}
      {authorized && !isLoading && eob ? <Grid xs={12}>
        <Card style={{ marginTop: '15px', width: '100%' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Explanation of Benefits
            </Typography>
            <Typography variant="subtitle1">
              Status: {eob ? titleCase(eob.entry[0].resource.status) : `null`}
            </Typography>
            <Typography variant="subtitle1">
              Date Created: {eob ? titleCase(eob.entry[0].resource.created) : `null`}
            </Typography>
            <Typography variant="subtitle1">
              Outcome: {eob ? titleCase(eob.entry[0].resource.outcome) : `null`}
            </Typography>
            <Typography variant="subtitle1">
              Insurer: {eob ? titleCase(eob.entry[0].resource.insurer.display) : `null`}
            </Typography>
          </CardContent>
        </Card>
      </Grid> : <Grid xs={12}>
        <Button onClick={() => FlexpaLink.open()} variant="contained" style={{ marginTop: '10px' }}>
          Connect your health plan with Flexpa Link
        </Button>
      </Grid>}
    </Grid>
  )
}

export default App;

export function titleCase(string) {
  const sentence = string.toLowerCase();
  let normalCaseString = sentence.replace(sentence[0], sentence[0].toUpperCase());
  return normalCaseString;
};
