import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ errors, touched, values, status }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    status && setUsers(users => [...users, status]);
  }, [status]);

  return (
    <div className='onboarding-form'>
      <Form>
        <h1>User Information</h1>
        <Field 
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
        />
        {touched.name && errors.name && <p>{errors.name}</p>}

        <Field 
          type="text"
          name="email"
          placeholder="Email"
          value={values.email}
        />
        {touched.email && errors.email && <p>{errors.email}</p>}

        <Field 
          type="text"
          name="password"
          placeholder="Password"
          value={values.password}
        />
        {touched.password && errors.password && <p>{errors.password}</p>}

        <label>
          <Field 
            type="checkbox"
            name="tos"
            value={values.checkbox}
          />
        </label>

        <button type="submit">Submit</button>
      </Form>

      {users.map(user => (
        <ul>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Password: {user.password}</li>
          <li>Terms of Services Checked: {user.tos? "Yes" : "No"}</li>
        </ul>
      ))}
    </div>
  );
}

const FormikUserForm = withFormik({
  mapPropsToValues({}) {
    return {
      name: "",
      email:  "",
      password: "",
      tos: false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Please enter a name'),
    email: Yup.string().required('Please enter an email'),
    password: Yup.string().required('Please enter a password')
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("Submitting user form:", values);

    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        // console.log("Success:", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log("Error:", err));
  }
})(UserForm)

export {FormikUserForm};
