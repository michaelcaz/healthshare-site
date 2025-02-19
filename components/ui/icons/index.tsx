// Create custom icon components
export const BeeIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M24 14C27.5 14 30.2 16.8 30.2 20.4C30.2 24 27.4 26.8 23.8 26.8C20.2 26.8 17.5 24 17.5 20.4C17.5 16.8 20.3 14 24 14Z"
      fill="#FFD54F"
      stroke="#424242"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M31 22C34.5 25.5 35 32 31 36C27 40 20 39.5 16.5 36C13 32.5 12.5 26 16.5 22"
      stroke="#424242"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M24 27V34M20 30.5H28"
      stroke="#424242"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M19 18.5C19 19.3284 18.3284 20 17.5 20C16.6716 20 16 19.3284 16 18.5C16 17.6716 16.6716 17 17.5 17C18.3284 17 19 17.6716 19 18.5Z"
      fill="#424242"
    />
    <path
      d="M32 18.5C32 19.3284 31.3284 20 30.5 20C29.6716 20 29 19.3284 29 18.5C29 17.6716 29.6716 17 30.5 17C31.3284 17 32 17.6716 32 18.5Z"
      fill="#424242"
    />
    <path
      d="M21 15.5C21.5 13.5 26.5 13.5 27 15.5"
      stroke="#424242"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const ShieldIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M24 12C24 12 31 16 38 16V28C38 32 35 37 24 42C13 37 10 32 10 28V16C17 16 24 12 24 12Z"
      fill="white"
      stroke="#424242"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 17V37M17 22L24 29L31 22"
      stroke="#424242"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MoneyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 20C15 16 18 14 24 14C30 14 33 16 33 20C33 26 15 24 15 30C15 34 18 36 24 36C30 36 33 34 33 30"
      stroke="#424242"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M24 10V14M24 36V40"
      stroke="#424242"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 18C8 21 6 28 12 34M36 18C40 21 42 28 36 34"
      stroke="#424242"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="2 3"
    />
  </svg>
);

export const QuestionIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M24 14C20 14 17 16.5 17 20C17 22.5 18.5 24.5 21 26C23.5 27.5 24 28.5 24 30"
      stroke="#424242"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle
      cx="24"
      cy="35"
      r="2"
      fill="#424242"
    />
    <path
      d="M17 19C17 15 20 12 24 12C28 12 31 15 31 19C31 23 28 25 24 25"
      stroke="#424242"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="2 3"
    />
  </svg>
);

import { SVGProps } from 'react';

export const IconShare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

export const IconGlobe = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const IconShield = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
); 