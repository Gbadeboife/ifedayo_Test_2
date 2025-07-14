import React, { memo } from 'react';
import { areEqual } from 'utils/equalityChecks';
import { Icon } from 'Components/Icons';

import classes from './noLocationPlaceholder.module.css';

const NoLocationPlaceholder = () => (
  <div className={classes.container}>
    <h3 className={classes.bolded}>No Units in Project</h3>
    <div>Add units and rooms to project to set affected locations</div>
    <Icon className={classes.icon} type="rocketemblemsmall" />
  </div>
);

const NoLocationPlaceholderMemo = memo(NoLocationPlaceholder, areEqual);

export { NoLocationPlaceholderMemo as NoLocationPlaceholder };
