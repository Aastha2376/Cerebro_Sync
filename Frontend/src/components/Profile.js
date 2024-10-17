import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/username.module.css';
// import extend from '../styles/profilemodule.css';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../Helper/Validate';
import convertToBase64 from '../Helper/convert';

export default function Profile() {

  const [file, setFile] = useState();
  
  const formik = useFormik({
    initialValues: {
      firstName:'',
      lastName:'',
      email: '',
      mobile: '',
      address: ''
    },
    validate: profileValidation,
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
        <div className={styles.glass} style={{width:'20%'}}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              About you
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
              <div className='name flex w-3/4 gap-10'>
                <input 
                  {...formik.getFieldProps('firstName')}
                  type="text"
                  placeholder="First Name"
                  className={styles.textbox}
                />
                <input 
                  {...formik.getFieldProps('lastName')}
                  type="text"
                  placeholder="Last Name"
                  className={styles.textbox}
                />
              </div>
              <div className='name flex w-3/4 gap-10'>
                <input 
                  {...formik.getFieldProps('mobile')}
                  type="text"
                  placeholder="Phone Number"
                  className={styles.textbox}
                />
                <input 
                  {...formik.getFieldProps('email')}
                  type="text"
                  placeholder="Email"
                  className={styles.textbox}
                />
              </div>
              <div className='name flex w-3/4 gap-10'>
                <input 
                  {...formik.getFieldProps('address')}
                  type="text"
                  placeholder="Address"
                  className={styles.textbox}
                  style={{ width: '80%' }} // Adjust the width value as needed
                />
              </div>
                <button 
                type="submit" 
                className={styles.btn}
                >
                Update
                </button> 

              {/* <input 
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
              /> */}
              
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Come back later?{' '}
                <Link className="text-red-500" to="/">
                  Logout
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
