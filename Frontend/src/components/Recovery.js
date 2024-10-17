import React from 'react';
import { Link } from 'react-router-dom';
//import avatar from '../assets/profile.png';
import styles from '../styles/username.module.css';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../Helper/Validate';

export default function Recovery() {

  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validate: passwordValidate,
    validateOnBlur: true,
    validateOnChange: false,   // Allow validation on input change to show errors while typing
    onSubmit: async (values) => {
      console.log(values);
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
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password.
            </span>
          </div>

          <form className="pt-20" onSubmit={formik.handleSubmit}>
          

            <div className="textbox flex flex-col items-center gap-20">
              <div className='input text-center'>
                <span className='py-4 text-sm text-left text-gray-500'>Enter a 6 digit OTP sent to your email address.</span>
                  <input
                    type="text"
                    placeholder="OTP  "
                    className={styles.textbox}
                    onBlur={displayErrors}>     
                  </input>
              </div>
              <button 
                type="submit" 
                className={styles.btn}
                onClick={displayErrors} // Trigger toast only if validation fails on submit
              >
                Recover
              </button>
            </div>

            <div className="text-center py-10">
              <span className="text-gray-500">
                Did not receive OTP? {' '}
                <Link className="text-red-500" to="/recovery"> 
                   Resend
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
