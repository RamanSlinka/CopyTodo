import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from "formik";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if(!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 4) {
                errors.password = 'Password must be 4 characters or more'
            }


            return errors;
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    })


    return <Grid container justify="center">
        <Grid item xs={4}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}>here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <TextField
                        label="Email"
                        margin="normal"
                        type='email'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email && <div style={{'color': 'red'}}>{formik.errors.email}</div> }

                    <TextField
                        type="password"
                        label="Password"
                        margin="normal"
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && <div style={{'color': 'red'}}>{formik.errors.password}</div> }
                    <FormControlLabel
                        label={'Remember me'}
                        control={<Checkbox name='rememberMe'
                                           checked={formik.values.rememberMe}
                                           onChange={formik.handleChange} />}
                    />
                    <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                </FormGroup>
                    </form>
            </FormControl>
        </Grid>
    </Grid>
}
