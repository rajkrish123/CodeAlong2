import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#008b8b",
    },

    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default function FormDialog(props) {
  const submitUsername = (e) => {
    e.preventDefault();
    const textField = document.querySelector("#userName");
    const username = textField.value;

    if (username.length > 0) {
      localStorage.setItem("userName", username);
      props.onSubmit();
    }
  };

  const username = localStorage.getItem("userName") ?? "";
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        disableEnforceFocus
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Provide a username</DialogTitle>

        <DialogContent>
          <DialogContentText>
            The username you enter below will allow other members of the room to
            easily identify you
          </DialogContentText>

          <form onSubmit={submitUsername}>
            <TextField
              autoFocus
              margin="dense"
              id="userName"
              label="Username"
              fullWidth
              defaultValue={username}
            />
            <input type="submit" hidden />
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={submitUsername} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
