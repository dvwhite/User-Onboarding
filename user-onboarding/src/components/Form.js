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
        <div class='text-fields'>
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
        </div>
        <label>
          I accept the TOS
          <Field 
            type="checkbox"
            name="tos"
            value={values.checkbox}
          />
        </label>
        <div className='btn-container'>
          <button type="submit">Submit</button>
        </div>
      </Form>

      <div className='card-container'>
        {users.map(user => (
          <div className="card">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
            <p>Accepted the TOS: {user.tos ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
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
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log("Error:", err));
  }
})(UserForm)

export {FormikUserForm};
