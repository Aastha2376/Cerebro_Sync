import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/username.module.css';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../Helper/Validate';
import convertToBase64 from '../Helper/convert';

export default function Register() {

  const [file, setFile] = useState();
  
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: ''
    },
    validate: registerValidation,
    validateOnBlur: true,  // Validate on blur
    validateOnChange: false,   // Avoid validation while typing
    onSubmit: async (values) => {
      // Assign profile image (if any) to values object
      values = await Object.assign(values, { profile: file || '' });

      // Check if there are validation errors before submitting
    //   if (formik.errors.email || formik.errors.username || formik.errors.password) {
    //     if (formik.errors.email){
    //       toast.error(formik.errors.email);
    //     } 
    //     else if (formik.errors.username) {
    //       toast.error(formik.errors.username);
    //     }
    //     else if (formik.errors.password) {
    //       toast.error(formik.errors.password);
    //     } 
    //     else {
    //     // Proceed with form submission if no errors
    //     console.log(values);
    //   }
    // }
  }});

  // Handle file upload for profile image
  const upload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false} />

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor='profile'>
                <img src={file || avatar} className="w-32 h2 rounded-full object-cover" alt="Profile" />
              </label>
              <input onChange={upload} type='file' id='profile' name='profile' />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input 
                {...formik.getFieldProps('email')}
                type="text"
                placeholder="Email*"
                className={styles.textbox}
              />
              <input 
                {...formik.getFieldProps('username')}
                type="text"
                placeholder="Username*"
                className={styles.textbox}
              />
              <input 
                {...formik.getFieldProps('password')}
                type="password"  // Changed to "password" type
                placeholder="Password*"
                className={styles.textbox}
              />
              <button 
                type="submit" 
                className={styles.btn}
              >
                Register
              </button>
            </div>

            <div className="text-center py-1">
              <span className="text-gray-500">
                Already Registered?{' '}
                <Link className="text-red-500" to="/">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
