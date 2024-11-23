import * as Yup from 'yup';

// Validation schema for Step 1: Personal Information
export const step1ValidationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  country: Yup.string().required("Country is required"),
});

// Validation schema for Step 2: Contact Information
export const step2ValidationSchema = Yup.object({
  address: Yup.string().required("Address is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  idNumber: Yup.string().required("ID Number is required"),
  documentFile: Yup.mixed().required("Document is required"),
});

// Validation schema for Step 3: KYC Information
export const step3ValidationSchema = Yup.object({
  mothersMaidenName: Yup.string().required("Mother's Maiden Name is required"),
  favoriteColor: Yup.string().required("Favorite Color is required"),
  cityOfBirth: Yup.string().required("City of Birth is required"),
  petsName: Yup.string().required("Pet's Name is required"),
});
