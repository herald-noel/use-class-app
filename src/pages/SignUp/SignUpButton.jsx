import { Button } from "@mui/material";
import SignUpFormDialog from "./components/SignUpFormDialog";
import { useDispatch } from "react-redux";
import { openSignUp } from "./signUpFromDialogSlice";
import AuthRegisterViewModel from "../../viewModels/AuthRegisterViewModel";
import { observer } from "mobx-react";

const SignUpButton = observer(() => {
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    AuthRegisterViewModel.toggleSignUpModal();
  };

  return (
    <>
      <Button
        onClick={handleButtonClick}
        variant='contained'
        sx={{
          width: "100px",
          height: "50px",
          marginLeft: "18px",
          borderRadius: 0,
          background: "#000",
        }}
      >
        Sign Up
      </Button>
      <SignUpFormDialog isModalOpen={AuthRegisterViewModel.isSignUpModalOpen} />
    </>
  );
});

export default SignUpButton;
