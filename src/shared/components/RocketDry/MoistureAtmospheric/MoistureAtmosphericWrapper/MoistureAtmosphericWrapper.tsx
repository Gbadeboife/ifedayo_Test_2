import React, { memo } from 'react';
import { areEqual } from 'utils/equalityChecks';
import { MoistureAtmosphericProvider } from 'Context/MoistureAtmospheric';
import { MoistureAtmospheric } from 'Components/RocketDry';

const MoistureAtmosphericWrapper = () => (
  <MoistureAtmosphericProvider>
    <MoistureAtmospheric />
  </MoistureAtmosphericProvider>
);

const MoistureAtmosphericWrapperrMemo = memo(MoistureAtmosphericWrapper, areEqual);

export { MoistureAtmosphericWrapperrMemo as MoistureAtmosphericWrapper };
