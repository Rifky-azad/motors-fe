import React from "react";
import { useRouter } from "next/router";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField } from "formik-material-ui";
import CssBaseline from "@material-ui/core/CssBaseline";
import DialogBoxCom from "./components/DialogBoxCom";
import cookie from "js-cookie";
import axios from "axios";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

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

export default function CustomerForm(props) {
  const { closeDialog, isShowDialog,getAllCustomers } = props;
  const classes = useStyles();
  const [error, setError] = React.useState(null);
  const router = useRouter();

  return (
    <DialogBoxCom closeDialog={closeDialog} open={isShowDialog} isShowAction={false} title="Add Customer">
      <Container component="main" maxWidth="xs" style={{ paddingBottom: "10px" }}>
        <CssBaseline />
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .post(
                `http://localhost:1337/auth/local/register`,
                {
                  username: values.email,
                  email: values.email,
                  name: values.name,
                  password: values.password,
                  confirmed: true,
                  blocked: false,
                },
                {
                  Headers: {
                    Authorization: `Bearer ${cookie.get("token")}`,
                  },
                }
              )
              .then((res) => {
                getAllCustomers();
                closeDialog();
                setError(null);
              })
              .catch((err) => {
                setError(err);
              })
              .finally(() => {
                setSubmitting(false);
              });
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
              <Field
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
                component={TextField}
              />
              <Field
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                component={TextField}
              />
              <Field
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                component={TextField}
              />
              {error && (
                <>
                  {" "}
                  <br /> <div style={{ color: "red" }}> Request fail try again later </div> <br />{" "}
                </>
              )}
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Submit
              </Button>
              <Button fullWidth variant="outlined" color="primary" onClick={closeDialog}>
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </DialogBoxCom>
  );
}
