import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const downloadInvoicePDF = async (invoiceId: string) => {
  // In a real app, this would use html2pdf or a backend service
  // For this demo, we'll simulate a download
  console.log(`Downloading PDF for invoice ${invoiceId}`);
  alert('PDF generation is being processed. In a production environment, this would download the file using html2pdf.js or a server-side generator.');
};
