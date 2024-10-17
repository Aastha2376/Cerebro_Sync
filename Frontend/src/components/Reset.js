import React from 'react';
import styles from '../styles/username.module.css';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetpasswordValidate } from '../Helper/Validate';

export default function Reset() {

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmpassword: ''
    },
    validate: resetpasswordValidate,
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
        <div className={styles.glass} style={{width:"35%"}}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter new Password
            </span>
          </div>

          <form className="py-20" onSubmit={formik.handleSubmit}>

            <div className="textbox flex flex-col items-center gap-6">
              <input 
                {...formik.getFieldProps('password')}
                type="text"
                placeholder="New Password"
                className={styles.textbox}
                onBlur={displayErrors} // Trigger validation on blur
              />
              <input 
                {...formik.getFieldProps('confirmpassword')}
                type="text"
                placeholder="Confirm Password"
                className={styles.textbox}
                onBlur={displayErrors} // Trigger validation on blur
              />
              <button 
                type="submit" 
                className={styles.btn}
                onClick={displayErrors} // Trigger toast only if validation fails on submit
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
