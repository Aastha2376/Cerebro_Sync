import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/username.module.css';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../Helper/Validate';

export default function Password() {

  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validate: passwordValidate,
    validateOnBlur: true,   // Only validate on blur
    validateOnChange: false, // Disable validation on input change
    onSubmit: async (values) => {
      const errors = formik.errors;
  
      // Check if there are any errors after validation and show toast notifications
      if (errors.password) {
        toast.error(errors.password);  // Show toast only on error after submission or blur
      } else {
        console.log(values);
        // Proceed with form submission
      }
    }
  });

  // Show error toast notifications only when there are validation errors
  const displayErrors = () => {
    if (formik.errors.password) {
      toast.error(formik.errors.password);
    }
  };

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
                {...formik.getFieldProps('password')}
                type="text"
                placeholder="Password"
                className={styles.textbox}
                onBlur={displayErrors} // Trigger validation on blur
              />
              <button 
                type="submit" 
                className={styles.btn}
                onClick={displayErrors} // Trigger toast only if validation fails on submit
              >
                Sign In
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Forgot Password?{' '}
                <Link className="text-red-500" to="/recovery">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
