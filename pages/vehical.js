import React from 'react';
import { useRouter } from 'next/router'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField } from 'formik-material-ui'
import CssBaseline from '@material-ui/core/CssBaseline';
import cookie from 'js-cookie'
import axios from 'axios'
import * as Yup from 'yup'

const schema = Yup.object().shape({
    vehical_number: Yup.string().required(),
    modole: Yup.string().required(),
    vehical_type: Yup.string().required(),
    millage: Yup.string().required(),
    service_notes: Yup.string().required()
})

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const [error, setError] = React.useState(null)
    const router = useRouter()

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
             
                <Typography component="h1" variant="h5">
                    Vehicale Details
                </Typography>
                <Formik initialValues={{vehical_number: "" , module: "", vehical_type: "",millage:"" ,service_notes:""}} validationSchema={schema} onSubmit={(values, { setSubmitting }) => {
                    console.log("p", values)
                   
                }}>
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
                                id="module"
                                label="module"
                                name="module"
                                autoFocus
                                component={TextField}
                            />

                            <Field
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="vehical_type"
                                label="vehical_type"
                                name="vehical_type"
                                autoFocus
                                component={TextField}
                            />
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
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Vehicale Details
                            </Button>

                        </Form>
                    )}
                </Formik>
            </div>
            
        </Container>
    );
}
