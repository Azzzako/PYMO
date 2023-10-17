import * as React from "react";
import { Button, buttonClasses } from "@mui/base/Button";
import { styled } from "@mui/system";

export default function CustomButton1({label, onClick}) {
  return (
    <div>
      <Button onClick={onClick}>
        <CustomButton type="reset">{label}</CustomButton>
      </Button>
    </div>
  );
}


const CustomButton = styled(Button)`
  font-family: "Agora", sans-serif;
  font-size: 0.875rem;
  background-color:#1D22DC;
  color: white;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 160ms ease;
  border: none;

  &:hover:not(:disabled) {
    background-color: #E28E25;
  }

  &:active:not(:disabled) {
    background-color: red};
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgb(61 71 82 / 0.1), 0 0 0 5px rgb(0 127 255 / 0.5);
    outline: none;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
