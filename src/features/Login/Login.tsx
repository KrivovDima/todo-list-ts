import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./authReducer";
import {AppRootStateType} from "../../app/store";
import {Redirect} from "react-router-dom";

type ErrorsFormikType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: ErrorsFormikType = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      } else if (values.password.length < 3) {
        errors.password = 'Short password';
      }
      return errors;
    },
    onSubmit: values => {
      dispatch(loginTC(values.email, values.password, values.rememberMe))
      formik.resetForm();
    }
  })

  if (isLoggedIn) {
    return <Redirect to={'/'}/>
  }

  return <Grid container justifyContent={'center'}>
    <Grid item justifyContent={'center'}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel>
            <p>To log in get registered
              <a href={'https://social-network.samuraijs.com/'}
                 target={'_blank'}> here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <FormGroup>
            <TextField label="Email"
                       margin="normal"
                       type="email"
                       {...formik.getFieldProps('email')}
                       />
            {formik.touched.email && formik.errors.email && <div style={{color: "tomato"}}>{formik.errors.email}</div>}
            <TextField type="password"
                       label="Password"
                       margin="normal"
                       {...formik.getFieldProps('password')}/>
            {formik.touched.password && formik.errors.password && <div style={{color: "tomato"}}>{formik.errors.password}</div>}
            <FormControlLabel label={'Remember me'} control={<Checkbox
              {...formik.getFieldProps('rememberMe')}/>}/>
            <Button type={'submit'} variant={'contained'} color={'primary'}>
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  </Grid>
}