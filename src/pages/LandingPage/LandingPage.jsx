import { Box, Typography, Button } from '@mui/material';
import Mainlayout from '../../layouts/Mainlayout';
import heroImg from '../../assets/hero-img.svg';
import { useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import { openSignUp } from '../SignUp/signUpFromDialogSlice';
import { useEffect } from 'react';
import { auth } from '../../services/firebase/firebase';
import { useNavigate } from 'react-router-dom';
import AuthLoginViewModel from '../../viewModels/AuthLoginViewModel';

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        AuthLoginViewModel.setUser(user);
        navigate('/home');
      }
    });
    return unsubscribe;
  }, [navigate]);

  return (
    <Mainlayout>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '100vh',
          width: '100vw',
          padding: {
            xs: '100px 50px', // Add padding for smaller screens
            md: '100px', // Adjust padding for medium screens
            xl: '300px',
          },
          gap: {
            xs: '20px', // Adjust gap for smaller screens
            md: '200px', // Maintain gap for medium screens
          },
          flexDirection: useMediaQuery((theme) => theme.breakpoints.down('md'))
            ? 'column'
            : 'row', // Change to column layout on small screens
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '20px',
            flex: 2,
          }}
        >
          <Typography variant='h3' fontWeight={'bold'}>
            From User Stories to Object-Oriented Design
          </Typography>
          <Typography variant='subtitle1'>
            Translate use cases into class diagrams with PlantUML&apos;s syntax.
            Simplify your design process and bridge the gap between user needs
            and software architecture.
          </Typography>
          <Button variant='contained' onClick={() => dispatch(openSignUp())}>
            Get Started
          </Button>
        </Box>
        <img
          src={heroImg}
          style={{
            width: '350px',
            order: useMediaQuery((theme) => theme.breakpoints.down('md'))
              ? 1
              : 2,
            display: useMediaQuery((theme) => theme.breakpoints.down('xl'))
              ? 'none'
              : 'block',
          }}
        />
        {/* Move image above content on small screens */}
      </Box>
    </Mainlayout>
  );
};

export default LandingPage;
