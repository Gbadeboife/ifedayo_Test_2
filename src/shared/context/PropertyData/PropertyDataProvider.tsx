import React, { memo, ReactNode } from 'react';

import { areEqual } from 'utils/equalityChecks';

import { PropertyDataContext, PropertyDataFunctions } from 'Context/PropertyData';

interface Props {
  children: ReactNode;
}

const PropertyDataProvider = ({ children }: Props) => {
  const propertyData = PropertyDataFunctions();

  return <PropertyDataContext.Provider value={{ ...propertyData }}>{children}</PropertyDataContext.Provider>;
};

const PropertyDataProviderMemo = memo(PropertyDataProvider, areEqual);

export { PropertyDataProviderMemo as PropertyDataProvider };
