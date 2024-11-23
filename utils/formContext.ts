import { useState } from "react";

// Define the interface for the form data
interface FormData {
  fullName: string;
  email: string;
  dateOfBirth: string;
  country: string;
  address: string;
  phoneNumber: string;
  idNumber: string;
  documentFile: File | null;
  mothersMaidenName: string;
  favoriteColor: string;
  cityOfBirth: string;
  petsName: string;
}

interface FormState {
  formData: FormData;
  currentStep: number;
}

export const useForm = () => {
  // Initialize formData with default values to match the FormData interface
  const [formState, setFormState] = useState<FormState>({
    formData: {
      fullName: "",
      email: "",
      dateOfBirth: "",
      country: "",
      address: "",
      phoneNumber: "",
      idNumber: "",
      documentFile: null,
      mothersMaidenName: "",
      favoriteColor: "",
      cityOfBirth: "",
      petsName: "",
    },
    currentStep: 1,
  });

  const updateData = (newData: Partial<FormData>) => {
    setFormState((prevState) => ({
      ...prevState,
      formData: { ...prevState.formData, ...newData },
    }));
  };

  const setCurrentStep = (step: number) => {
    setFormState((prevState) => ({
      ...prevState,
      currentStep: step,
    }));
  };

  return {
    formData: formState.formData,
    currentStep: formState.currentStep,
    updateData,
    setCurrentStep,
  };
};
