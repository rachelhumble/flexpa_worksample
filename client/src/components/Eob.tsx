import React from "react";
import { Bundle, ExplanationOfBenefit } from "fhir/r4";
import Grid from '@mui/material/Unstable_Grid2';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';

function Eob(props: { eobDisplay: Bundle<ExplanationOfBenefit> }) {

    return (
        <Grid xs={12}>
            <Card style={{ marginTop: '15px', width: '100%' }}>
                <CardContent>
                    <Typography variant="h4" component="div" style={{ marginBottom: '10px' }}>
                        Explanation of Benefits
                    </Typography>
                    {props.eobDisplay.entry?.map((e, i) =>
                        <Card style={{ marginBottom: '10px' }} key={i}>
                            <CardContent>
                                <Typography variant="h6">
                                    Item {i + 1}:
                                </Typography>
                                <Typography variant="subtitle1">
                                    Status: {titleCase(e.resource?.status)}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Date Created: {titleCase(e.resource?.created)}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Outcome: {titleCase(e.resource?.outcome)}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Insurer: {titleCase(e.resource?.insurer.display)}
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
}

export default Eob;

export function titleCase(string) {
    const sentence = string.toLowerCase();
    let normalCaseString = sentence.replace(sentence[0], sentence[0].toUpperCase());
    return normalCaseString;
};
