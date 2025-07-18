import React, { memo } from 'react';

import { areEqual } from 'utils/equalityChecks';
import { CheckedMarkSvg } from 'Components/Icons/CheckedMark';
import { Button } from 'Components/Button';

import classes from './deleteToast.module.css';

export interface Props {
  isDisplayed: boolean;
  message: string;
  closeToast: (e: any) => void;
}

const DeleteToast = ({ isDisplayed = false, message, closeToast }: Props) => (
  <div
    className={`toast fade d-flex align-items-center position-fixed border-0 bottom-0 ${
      isDisplayed ? 'show' : 'hide'
    } ${classes.toastBase} ${classes.toastSuccess}`}
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div className={`toast-body ${classes['toast-body-override']} ${classes.toastText}`}>
      {message}
      <span className={`${classes.toastIcon}`}>
        <CheckedMarkSvg />
      </span>
    </div>
    <div className={classes.toastCloseButtonContainer}>
      <Button
        type="button"
        className={`btn-close ${classes.toastCloseButton}`}
        data-bs-dismiss="toast"
        aria-label="Close"
        onClick={closeToast}
      />
    </div>
  </div>
);

DeleteToast.defaultProps = {};

const DeleteToastMemo = memo(DeleteToast, areEqual);

export { DeleteToastMemo as DeleteToast };
