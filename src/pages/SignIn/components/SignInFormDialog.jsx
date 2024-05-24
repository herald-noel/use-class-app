import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Link,
  Typography,
} from '@mui/material';
import useSignIn from '../hooks/useSignIn';
import { observer } from 'mobx-react';

const SignInFormDialog = observer(({ isModalOpen }) => {
  const {
    handleSubmit,
    email,
    setEmail,
    emailError,
    emailErrorMsg,
    password,
    setPassword,
    passwordError,
    passwordErrorMsg,
    toggleSignInModal,
    toggleSignUpModal,
  } = useSignIn();

  const handleClose = () => {
    toggleSignInModal();
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLinkSignUp = () => {
    toggleSignInModal();
    toggleSignUpModal();
  };

  return (
    <Dialog open={isModalOpen} onClose={handleClose}>
      <DialogTitle textAlign={'center'}>Welcome back.</DialogTitle>
      <form>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Email Address'
            type='email'
            fullWidth
            error={emailError}
            value={email}
            helperText={emailErrorMsg}
            onChange={handleEmail}
            autoComplete='username'
          />
          <TextField
            margin='dense'
            label='Password'
            type='password'
            fullWidth
            error={passwordError}
            value={password}
            helperText={passwordErrorMsg}
            onChange={handlePassword}
            sx={{ marginBottom: '10px' }}
            autoComplete='current-password'
          />
          <Link href='#' underline='none'>
            Forgot Password?
          </Link>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant='contained' type='submit'>
            Submit
          </Button>
        </DialogActions>
      </form>
      <DialogContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant='body4'>
          No account yet?
          <Button onClick={handleLinkSignUp} underline='none'>
            Sign Up
          </Button>
        </Typography>
      </DialogContent>
    </Dialog>
  );
});

export default SignInFormDialog;
