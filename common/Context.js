import React from 'react';

export const DetailContext = React.createContext({
  product: '',
  route: '',
  productInfo: {},
  handleStateChange: () => {},
});
