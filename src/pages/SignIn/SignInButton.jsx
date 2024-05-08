import * as React from "react";
import Button from "@mui/material/Button";
import SignInFormDialog from "./components/SignInFormDialog";
import AuthLoginViewModel from "../../viewModels/AuthLoginViewModel";
import { observer } from "mobx-react";

const SignInButton = observer(() => {
  const handleClick = () => {
    AuthLoginViewModel.toggleModal();
  };

  return (
    <React.Fragment>
      <Button sx={{ color: "#000" }} onClick={handleClick}>
        Log In
      </Button>

      <SignInFormDialog isModalOpen={AuthLoginViewModel.isModalOpen} />
    </React.Fragment>
  );
});

export default SignInButton;
