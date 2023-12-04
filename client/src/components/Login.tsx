import React, { MouseEventHandler } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import '@fontsource/roboto/400.css';

function Login(onLinkClick: any) {

    return (
        <Grid container>
            <Grid xs={12}>
                <Typography variant="h2">Flexpa Work Sample</Typography>
            </Grid>
            <Grid xs={12}>
                <Button onClick={onLinkClick} variant="contained" style={{marginTop: '10px'}}>
                    Connect your health plan with Flexpa Link
                </Button>
            </Grid>
        </Grid>
    )
}

export default Login;