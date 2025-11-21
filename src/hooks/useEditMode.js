import React from 'react';
import { useLocation } from 'react-router-dom';

export const useEditMode = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get('edit') === 'true';
};