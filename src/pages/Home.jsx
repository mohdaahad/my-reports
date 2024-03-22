import React, { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// import { Pagination } from 'swiper/modules';
// import im from '../assets/images/i.jpg';
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Hidden 
} from '@mui/material';

const Home = () => {
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // window.location.href = '/sign-in'; // Redirect to login page if access token is not present
    } else {
      // Fetch data or perform any other actions here if needed
      setMessage('You are authenticated!'); // Example message
    }
  }, []); // Empty dependency array to run the effect only once after initial render

  return (
    <div >
    <Container  className="px5 bgPrimary">
      <Grid container spacing={5} alignItems="center" justifyContent="center">
        <Grid item md={8} lg={7} xl={6}>
          <div className="mt5">
            <Typography variant="h2" align="center" gutterBottom className="textWhite">
              We provide <span className="textWarning"> medical </span>services that you can <span className="textWarning">trust!</span>
            </Typography>
          
            <Typography variant="subtitle1" align="center" className="textWhite50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis praesentium adipisci dolorem reiciendis, minus illum vel quae libero asperiores {message}?
            </Typography>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              <Button variant="contained" className="btnLight">
                Button 1
              </Button>
              <Button variant="outlined"  className="btnLight1">
                Button 2
              </Button>
            </Grid>
          </div>
        </Grid>
        <Hidden lgDown>
          <Grid item lg={5} xl={6} className="textCenter">
            <img 
              src="https://webartinfo.com/templatemonster/doctorweb/img/banner.png" 
              alt="" 
              style={{ width: '100%', maxWidth: '100%' }} 
            />
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  </div>

  
  );
}

export default Home;
