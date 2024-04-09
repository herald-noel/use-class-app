import { Button } from '@mui/material';
import SignUpFormDialog from './components/SignUpFormDialog';
import { useDispatch } from 'react-redux';
import { openSignUp } from './signUpFromDialogSlice';

const SignUpButton = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Button
        onClick={() => dispatch(openSignUp())}
        variant='contained'
        sx={{
          width: '100px',
          height: '50px',
          marginLeft: '18px',
          borderRadius: 0,
          background: '#000',
        }}
      >
        Sign Up
      </Button>
      <SignUpFormDialog />
    </>
  );
};

export default SignUpButton;
