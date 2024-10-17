import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/username.module.css';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../Helper/Validate';

export default function Username() {
  const formik = useFormik({
    initialValues: {
      username: ''
    },
    validate: usernameValidate,
    validateOnBlur: true,  // Validation on blur
    validateOnChange: false, // Avoid validation while typing
    onSubmit: async values => {
      if (formik.errors.username) {
        // Show toast notification if there is a validation error
        toast.error(formik.errors.username);
      } else {
        // No errors, proceed with form submission
        console.log(values);  
      }
    }
  });

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false} />

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore more by connecting with us
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} className="w-32 h-32 rounded-full object-cover" alt="Profile" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input 
                {...formik.getFieldProps('username')}
                type="text"
                placeholder="Username"
                className={styles.textbox}
              />
              <button 
                type="submit" 
                className={styles.btn}
              >
                Let's Go
              </button>
            </div>

            <div className="text-center py-7">
              <span className="text-gray-500">
                Not a Member?{' '}
                <Link className="text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
