import React, { memo } from 'react';

import { Modal } from 'Components/Modal';

import { areEqual } from 'utils/equalityChecks';
import { Button } from 'Components/Button';
import classes from './deleteNoteModal.module.css';

interface Props {
  id: number;
  isOpen: boolean;
  noteType: string;
  closeDeleteNoteModalClick: (e: any) => void;
  onDeleteButtonClick: (e: any) => void;
}
const DeleteNoteModal = ({ id, isOpen, noteType, closeDeleteNoteModalClick, onDeleteButtonClick }: Props) => (
  <Modal
    id={id && id.toString()}
    classes={classes}
    title={`Delete Note from ${noteType}?`}
    isOpen={isOpen}
    modalHeader
    modalFooter
    closeButtonText="Cancel"
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    modalCloseClick={closeDeleteNoteModalClick}
  >
    <div className={classes.deleteModalCopy}>
      <p className={classes.lede}>Are you sure you want to delete this note?</p>
      <p>You will not be able to undo this action</p>
    </div>

    {/* TODO::Please create a red outline button! */}
    <Button className={`${classes.modalButtons} ${classes.delete}`} onClick={onDeleteButtonClick}>
      Delete Note
    </Button>
  </Modal>
);

const DeleteNoteModalMemo = memo(DeleteNoteModal, areEqual);

export { DeleteNoteModalMemo as DeleteNoteModal };
