import React from 'react';

interface Props {
  onClick: () => void;
}

export const ErrorButton: React.FC<Props> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="m-4 p-2 bg-red-500 text-white self-end"
  >
    Error Button
  </button>
);
