import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../Conponents/Header";

export default function NewUser() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit = () => {
    handleClick();
  };

  // select box value
  const [role, setRole] = useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  //   user and email patterns
  const regEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  //snackbar
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <Box>
      <Header title={"New User"} description={"Create a New User Profile"} />

      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            sx={{ width: "50%" }}
            label="First Name"
            variant="outlined"
            error={errors.firstName}
            helperText={
              errors.firstName
                ? "this Filed is Required & Minimum Length 5 chars."
                : null
            }
            {...register("firstName", { required: true, minLength: 5 })}
          />
          <TextField
            sx={{ width: "50%" }}
            label="Last Name"
            variant="outlined"
            error={errors.lastName}
            helperText={
              errors.lastName
                ? "This Filed is Required & Minimum Length 5 chars."
                : null
            }
            {...register("lastName", { required: true, minLength: 5 })}
          />
        </Box>

        <TextField
          sx={{ width: "100%" }}
          label="Email"
          variant="outlined"
          error={errors.email}
          helperText={errors.email ? "This Email is Unvalid." : null}
          {...register("email", { required: true, pattern: regEmail })}
        />
        <TextField
          sx={{ width: "100%" }}
          label="Password"
          variant="outlined"
          error={errors.password}
          helperText={
            errors.password
              ? "This Filed is Required & Minimum Length 5 chars"
              : null
          }
          {...register("password", { required: true, minLength: 5 })}
        />
        <TextField
          sx={{ width: "100%" }}
          label="Phone Number"
          variant="outlined"
          error={errors.phoneNumber}
          helperText={
            errors.phoneNumber ? "This Phone Number is Unvalid." : null
          }
          {...register("phoneNumber", { required: true, pattern: phoneRegExp })}
        />
        <TextField sx={{ width: "100%" }} label="Adreess" variant="outlined" />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            label="Role"
            onChange={handleChange}
            value={role}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
          </Select>
        </FormControl>

        <Box textAlign={"right"}>
          <Button
            sx={{
              textTransform: "Capitalize",
              backgroundImage: "var(--fourthGrad)",
              boxShadow: 0,
            }}
            type="submit"
            variant="contained"
          >
            Create User
          </Button>
        </Box>
      </Box>

      {/* snackbar  */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="outlined"
          sx={{ width: "100%" }}
        >
          User Created Successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
