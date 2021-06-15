import React, { useState } from "react";
import { useRouter } from "next/router";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import MuiTextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Select } from "formik-material-ui";
import CssBaseline from "@material-ui/core/CssBaseline";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DialogBoxCom from "./components/DialogBoxCom";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import cookie from "js-cookie";
import axios from "axios";
import * as Yup from "yup";

const schema = Yup.object().shape({
  vehical_number: Yup.string().required(),
  modole: Yup.string().required(),
  vehical_type: Yup.string().required(),
  millage: Yup.string().required(),
  service_notes: Yup.string().required(),
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function VehicleForm(props) {
  const { closeDialog, isShowDialog, getAllVehicle, customers = [], vehicleTypes = [] } = props;
  const classes = useStyles();
  const [error, setError] = React.useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState("");

  React.useEffect(() => {
    if (customers.length > 0) setSelectedCustomer(customers[0]["_id"]);

    if (vehicleTypes.length > 0) setSelectedVehicleType(vehicleTypes[0]["_id"]);
  }, []);

  const submitFunc = (value) =>
    axios
      .post(
        `http://localhost:1337/vehicles`,
        {
          vehicle_number: value.vehical_number,
          model: value.model,
          milage: value.millage,
          service_notes: value.service_notes,
          users_permissions_user: value.customer,
          vehicle_type: value.vehical_type,
        },
        {
          Headers: {
            Authorization: `Bearer ${cookie.get("token")}`,
          },
        }
      )
      .then((res) => {
        getAllVehicle();
        closeDialog();
      });

  return (
    <DialogBoxCom closeDialog={closeDialog} open={isShowDialog} isShowAction={false} title="Add New Vehicle">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Vehicale Details
          </Typography>
          <Formik
            enableReinitialize
            initialValues={{
              customer: selectedCustomer,
              vehical_number: "",
              model: "",
              vehical_type: selectedVehicleType,
              millage: "",
              service_notes: "",
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              console.log("p", values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <Form className={classes.form} noValidate>
                <FormControl fullWidth>
                  <InputLabel htmlFor="customer">Select Customer</InputLabel>
                  <Field
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    component={Select}
                    name="customer"
                    inputProps={{
                      id: "customer",
                    }}
                  >
                    {customers.map((cu) => (
                      <MenuItem value={cu["_id"]}>{cu.name}</MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <Field
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="vehical_number"
                  label="vehical_number"
                  name="vehical_number"
                  autoFocus
                  component={TextField}
                />
                <Field
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="model"
                  label="model"
                  name="model"
                  autoFocus
                  component={TextField}
                />
                <FormControl fullWidth>
                  <InputLabel htmlFor="vehical_type">Select Vehicle type</InputLabel>
                  <Field
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    component={Select}
                    name="vehical_type"
                    inputProps={{
                      id: "vehical_type",
                    }}
                  >
                    {vehicleTypes.map((cu) => (
                      <MenuItem value={cu["_id"]}>{cu.name}</MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <Field
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="millage"
                  label="millage"
                  name="millage"
                  autoFocus
                  component={TextField}
                />
                <Field
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="service_notes"
                  label="service_notes"
                  type="service_notes"
                  id="service_notes"
                  component={TextField}
                />
                <Button
                  onClick={() => submitFunc(values)}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </DialogBoxCom>
  );
}
