"use client";
import { useForm } from "@/utils/formContext";
import {
  step1ValidationSchema,
  step2ValidationSchema,
  step3ValidationSchema,
} from "@/validations/formValidationSchema";
import React, { useState } from "react";
import * as Yup from "yup";

const MultiStepForm = () => {
  const { formData, currentStep, updateData, setCurrentStep } = useForm();
  const [isAnimating, setIsAnimating] = useState(false);
  const [errors, setErrors] = useState<boolean>(false);

  // Validation function based on current step
  const validateStep = async (step: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schemas: Record<number, Yup.ObjectSchema<any>> = {
      1: step1ValidationSchema,
      2: step2ValidationSchema,
      3: step3ValidationSchema,
    };

    const schema = schemas[step];

    if (!schema) {
      throw new Error("Validation schema not found for the current step");
    }

    try {
      await schema.validate(formData, { abortEarly: false });
      return true;
    } catch (err: unknown) {
      // Type guard to check if 'err' is a Yup ValidationError
      if (err instanceof Yup.ValidationError) {
        setErrors(true);
        setTimeout(() => {
          setErrors(false);
        }, 3000);
        return err.errors;
      } else {
        // Handle unexpected errors
        setErrors(true);
        setTimeout(() => {
          setErrors(false);
        }, 3000);
        throw err; // rethrow or handle as needed
      }
    }
  };

  // Next button handler with validation
  const handleNext = async () => {
    const errors = await validateStep(currentStep);

    if (errors === true) {
      // Proceed if validation is successful
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      // Show validation errors on the UI
      // alert(errors.join("\n"));
      // Optionally, display the errors next to the relevant fields.
    }
  };

  // Back button handler
  const handleBack = () => {
    if (currentStep > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-8 transform transition-all duration-300">
        {/* Progress Bar */}
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of 4
            </span>
          </div>
          <div className="flex mb-2 items-center justify-between">
            <div className="w-full bg-gray-200 rounded-full">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${
                  currentStep === 1
                    ? "bg-blue-600 w-1/3"
                    : currentStep === 2
                    ? "bg-blue-600 w-2/3"
                    : "bg-blue-600 w-full"
                }`}
              ></div>
            </div>
          </div>
        </div>
        {errors && (
          <h1 className="bg-red-500 px-2 py-1 rounded-lg text-white text-center">
            Please fill all the required fields correctly before submitting
          </h1>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1 */}
          {currentStep === 1 && (
            <div
              className={`space-y-8 transition-all ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              <h2 className="text-center text-xl font-bold mb-6 text-gray-800">
                Personal Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-4 transition duration-200 transform hover:scale-105 focus:outline-none"
                    value={formData.fullName || ""}
                    onChange={(e) => updateData({ fullName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-4 transition duration-200 transform hover:scale-105 focus:outline-none"
                    value={formData.email || ""}
                    onChange={(e) => updateData({ email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-4 transition duration-200 transform hover:scale-105 focus:outline-none"
                    value={formData.dateOfBirth || ""}
                    onChange={(e) =>
                      updateData({ dateOfBirth: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <select
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-4 transition duration-200 transform hover:scale-105 focus:outline-none"
                    value={formData.country || ""}
                    onChange={(e) => updateData({ country: e.target.value })}
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">UK</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div
              className={`space-y-8 transition-all ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              <h2 className="text-center text-xl font-bold mb-6 text-gray-800">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-4 transition duration-200 transform hover:scale-105 focus:outline-none"
                    value={formData.address || ""}
                    onChange={(e) => updateData({ address: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-4 transition duration-200 transform hover:scale-105 focus:outline-none"
                    value={formData.phoneNumber || ""}
                    onChange={(e) =>
                      updateData({ phoneNumber: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ID Number
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-4 transition duration-200 transform hover:scale-105 focus:outline-none"
                    value={formData.idNumber || ""}
                    onChange={(e) => updateData({ idNumber: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload CV
                  </label>
                  <input
                    type="file"
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-4 transition duration-200 transform hover:scale-105 focus:outline-none"
                    onChange={(e) =>
                      updateData({
                        documentFile: e.target.files ? e.target.files[0] : null,
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div
              className={`space-y-8 transition-all ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              <h2 className="text-center text-xl font-bold mb-6 text-gray-800">
                KYC Information
              </h2>
              <div className="space-y-6">
                {/* KYC Form */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mother&apos;s Maiden Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-4"
                    value={formData.mothersMaidenName || ""}
                    onChange={(e) =>
                      updateData({ mothersMaidenName: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Favorite Color
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-4"
                    value={formData.favoriteColor || ""}
                    onChange={(e) =>
                      updateData({ favoriteColor: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City of Birth
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-4"
                    value={formData.cityOfBirth || ""}
                    onChange={(e) =>
                      updateData({ cityOfBirth: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pet&apos;s Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-4"
                    value={formData.petsName || ""}
                    onChange={(e) => updateData({ petsName: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* After Submit - Display Summary */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-sm text-gray-700">
                Name: {formData.fullName}
              </h3>
              <h3 className="text-sm text-gray-700">Email: {formData.email}</h3>
              <h3 className="text-sm text-gray-700">
                Date of Birth: {formData.dateOfBirth}
              </h3>
              <h3 className="text-sm text-gray-700">
                Country: {formData.country}
              </h3>
              <h3 className="text-sm text-gray-700">
                Address: {formData.address}
              </h3>
              <h3 className="text-sm text-gray-700">
                Phone Number: {formData.phoneNumber}
              </h3>
              <h3 className="text-sm text-gray-700">
                ID Number: {formData.idNumber}
              </h3>
              <h3 className="text-sm text-gray-700">
                Document:{" "}
                {formData.documentFile ? formData.documentFile.name : "None"}
              </h3>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              type="button"
              onClick={handleBack}
              className={`${
                currentStep === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white px-6 py-2 rounded-lg transition duration-200`}
              disabled={currentStep === 1}
            >
              Back
            </button>
            {currentStep === 3 ? (
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Submit
              </button>
            ) : currentStep !== 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Next
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
