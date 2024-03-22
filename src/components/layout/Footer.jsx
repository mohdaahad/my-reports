import React from 'react';
import { Container, Grid, IconButton, Typography } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
    return (
            <Container>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="body2" color="textSecondary" align="left">
                            © {new Date().getFullYear()} Nereus. All rights reserved.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton aria-label="Facebook" color="inherit">
                            <Facebook />
                        </IconButton>
                        <IconButton aria-label="Twitter" color="inherit">
                            <Twitter />
                        </IconButton>
                        <IconButton aria-label="Instagram" color="inherit">
                            <Instagram />
                        </IconButton>
                    </Grid>
                </Grid>
            </Container>
    );
}

export default Footer;
