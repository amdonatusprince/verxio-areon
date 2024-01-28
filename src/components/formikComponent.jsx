import { ErrorMessage, Field } from 'formik';
import React from 'react'

const formikComponent = () => {
  return (
    <div className="flex flex-col gap-3 text-16 ">
      <label htmlFor="paymentMethod">{label}</label>
      <Field
        name="name"
        as="as"
        className="border outline-none rounded-[4px] border-black p-2"
      >
        <option value="">Select Coin Eg. ICP</option>
        <option value="etherum">Ethereum</option>
      </Field>
      <ErrorMessage name="paymentMethod" component={Error} />
    </div>
  );
}

export default formikComponent