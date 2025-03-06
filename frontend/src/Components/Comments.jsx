import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Comments = ({ productId, onCommentAdded }) => {
  const [message, setMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      comment: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().min(1).max(100).required('Le nom est obligatoire'),
      comment: Yup.string().min(1).max(500).required('Le commentaire est obligatoire'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post('http://localhost:4444/api/Comments', {
          productId,
          name: values.name,
          comment: values.comment,
          userId: 'userIdHere',
        });
        setMessage('Commentaire ajouté avec succès !');
        resetForm();
        if (onCommentAdded) onCommentAdded();
      } catch (error) {
        setMessage('Erreur lors de l\'ajout du commentaire. Veuillez réessayer.');
      }
    },
  });

  return (
    <div className="p-4 bg-[#efcfbd] rounded">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Ajouter un Commentaire</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            id="name"
            type="text"
            {...formik.getFieldProps('name')}
            className="mt-1 p-2 w-full border placeholder:text-black placeholder:opacity-50 border-amber-900 rounded"
          />
          {formik.touched.name && formik.errors.name ? <div className="text-red-600 text-sm">{formik.errors.name}</div> : null}
        </div>

        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Commentaire</label>
          <textarea
            id="comment"
            {...formik.getFieldProps('comment')}
            className="mt-1 p-2 w-full placeholder:text-black placeholder:opacity-50 border border-amber-900 rounded"
          />
          {formik.touched.comment && formik.errors.comment ? <div className="text-red-600 text-sm">{formik.errors.comment}</div> : null}
        </div>

        <button type="submit" className="px-4 py-2 bg-[#815135] text-white rounded">Ajouter</button>
      </form>

      {message && <p className="mt-4 text-center text-gray-800 font-medium">{message}</p>}
    </div>
  );
};

export default Comments;
