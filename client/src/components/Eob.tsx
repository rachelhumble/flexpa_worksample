import React from "react";
import Grid from '@mui/material/Unstable_Grid2';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';

function Eob(resource) {
    console.log(resource)

    return (
        <Grid xs={12}>
            <Card style={{ marginTop: '15px', width: '100%' }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Explanation of Benefits
                    </Typography>
                    <Typography variant="subtitle1">
                        Status: {resource.status}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default Eob;
