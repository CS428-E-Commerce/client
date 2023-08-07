import { memo } from "react";

import CloseIcon from "assets/images/icons/close.svg";

export const SvgSuccessIcon = memo(() => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="18" fill="#0F9F59" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M25.3484 13.8485L15.4999 23.6971L10.1514 18.3485L11.8484 16.6515L15.4999 20.303L23.6514 12.1515L25.3484 13.8485Z"
        fill="white"
      />
    </svg>
  );
});

export const SvgFailureIcon = memo(() => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="18" fill="#CA1130" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.7475 20L16.5 11H19.5L19.2525 20H16.7475Z"
        fill="white"
      />
      <path
        d="M16.5 23.5C16.5 24.3284 17.1716 25 18 25C18.8284 25 19.5 24.3284 19.5 23.5C19.5 22.6716 18.8284 22 18 22C17.1716 22 16.5 22.6716 16.5 23.5Z"
        fill="white"
      />
    </svg>
  );
});

export const CloseButton = memo(() => {
  return <img src={CloseIcon} className="close-button" alt="CloseIcon" />;
});

export const MessageFailureComponent = memo(({ message }) => {
  return <span className="invalid-feedback-span">{message}</span>;
});

export const MessageSuccessComponent = memo(({ message }) => {
  return <span className="invalid-feedback-span">{message}</span>;
});
