import React, { memo } from 'react';
import { areEqual } from 'utils/equalityChecks';
import { PeopleTabs } from './PeopleTabs';

const PeopleContainer = () => <PeopleTabs />;

const PeopleContainerMemo = memo(PeopleContainer, areEqual);

export { PeopleContainerMemo as PeopleContainer };
