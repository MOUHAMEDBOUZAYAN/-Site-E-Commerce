import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Comments = ({ productId }) => {
  const [message, setMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      rating: '',
      comment: '',
    },
    validationSchema: Yup.object({
      rating: Yup.number().min(1).max(5).required('note est obligatoire'),
      comment: Yup.string().min(1).max(500).required('commentaire est obligatoire'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/api/Comments', {
          productId,
          rating: values.rating,
          comment: values.comment,
          userId: 'userIdHere',
        });
        setMessage('comment avec succès !');
      } catch (error) {
        setMessage('Erreur lors de\ comments');
      }
    },
  });

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2 className="text-lg font-semibold mb-4">Comments</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Note</label>
          <input
            id="rating"
            type="number"
            min="1"
            max="5"
            {...formik.getFieldProps('rating')}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
          {formik.touched.rating && formik.errors.rating ? <div className="text-red-500 text-sm">{formik.errors.rating}</div> : null}
        </div>

        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Commentaire</label>
          <textarea
            id="comment"
            {...formik.getFieldProps('comment')}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
          {formik.touched.comment && formik.errors.comment ? <div className="text-red-500 text-sm">{formik.errors.comment}</div> : null}
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default Comments;
