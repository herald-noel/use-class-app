import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Link,
  Typography,
} from "@mui/material";
import useSignIn from "../hooks/useSignIn";
import AuthLoginViewModel from "../../../viewModels/AuthLoginViewModel";
import { observer } from "mobx-react";

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
  } = useSignIn();

  const handleClose = () => {
    AuthLoginViewModel.toggleSignInModal();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLinkSignUp = () => {
    console.log("hello");
  };

  return (
    <Dialog open={isModalOpen} onClose={handleClose}>
      <DialogTitle textAlign={"center"}>Welcome back.</DialogTitle>
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
            onChange={handleEmailChange}
          />
          <TextField
            margin='dense'
            label='Password'
            type='password'
            fullWidth
            error={passwordError}
            value={password}
            helperText={passwordErrorMsg}
            onChange={handlePasswordChange}
            sx={{ marginBottom: "10px" }}
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
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant='body4'>
          No account yet?{" "}
          <Button onClick={handleLinkSignUp} underline='none'>
            Sign Up
          </Button>
        </Typography>
      </DialogContent>
    </Dialog>
  );
});

export default SignInFormDialog;
