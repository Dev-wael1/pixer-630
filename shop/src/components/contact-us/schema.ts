import * as yup from 'yup';

export const contactUsFormSchema = yup.object().shape({
  name: yup.string().required('Name is required.'),
  email: yup.string().email().required('Email is required.'),
  subject: yup.string().required('Subject is required.'),
  description: yup.string().required('Description is required.'),
});
