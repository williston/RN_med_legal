import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
    email: string;
    subject: string;
    message: string;
    department: string;
  }
  
  export const EmailTemplate: React.FC<EmailTemplateProps> = ({
    firstName,
    email,
    subject,
    message,
    department,
  }) => (
    <div>
      <h1>New Contact Form Submission</h1>
      <p>From: {firstName} ({email})</p>
      <p>Department: {department}</p>
      <p>Subject: {subject}</p>
      <p>Message:</p>
      <p>{message}</p>
    </div>
  );