import React from "react";
import { observer } from "mobx-react";
import HomeViewModel from "../../../../../viewModels/HomeViewModel";

const ErrorMessage = observer(() => {
  return <>{HomeViewModel.parseErrors.map((error) => alert(error))}</>;
});

export default ErrorMessage;
