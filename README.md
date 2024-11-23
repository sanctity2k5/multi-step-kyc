# Multi-Step Form with Validation

## Overview

This project is a responsive, multi-step form built with **Next.js**. It provides a clean and intuitive UI to collect user data in multiple steps while validating the input in real-time using **Yup**. The form ensures data integrity and improves user experience by guiding the user through smaller sections of information.

## Features

- Multi-step navigation for improved usability.
- **Yup** validation for real-time input validation.
- Dynamic error handling and highlighting of invalid fields.
- State management using React's `useState`.
- Step-specific validation schemas for modular and reusable validation logic.
- Ability to navigate back and forth between steps while preserving entered data.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/multi-step-form.git
   cd multi-step-form

   ```

2. Install dependencies:
   npm install

3. Run the development server:

npm run dev

4. Open the project in your browser at http://localhost:3000.

Usage
Fill out the fields in each step.
Click Next to proceed to the next step or Back to go to the previous step.
Errors will be displayed in real-time if the input does not meet the requirements.
On the final step, all the data will be validated and submitted.
Technologies Used
React.js: For building user interfaces.
Next.js: For server-side rendering and routing.
Yup: For validation.
TypeScript: For static type checking.
