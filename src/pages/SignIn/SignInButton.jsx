import * as React from "react";
import Button from "@mui/material/Button";
import SignInFormDialog from "./components/SignInFormDialog";
import AuthLoginViewModel from "../../viewModels/AuthViewModel";
import { observer } from "mobx-react";

const SignInButton = observer(() => {
  const handleClick = () => {
    AuthLoginViewModel.toggleSignInModal();
  };

  return (
    <React.Fragment>
      <Button sx={{ color: "#000" }} onClick={handleClick}>
        Log In
      </Button>

      <SignInFormDialog isModalOpen={AuthLoginViewModel.isSignInModalOpen} />
    </React.Fragment>
  );
});

export default SignInButton;
