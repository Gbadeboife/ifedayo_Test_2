import React, { memo, ReactNode } from 'react';

import { areEqual } from 'utils/equalityChecks';

import { PhotoViewLayout } from 'Components/Layouts';
import { NotesProvider } from 'Context/Notes';

interface Props {
  children: ReactNode;
}

const PhotoViewWrapperContainer = ({ children }: Props) => (
  <PhotoViewLayout>
    <NotesProvider>{children}</NotesProvider>
  </PhotoViewLayout>
);

const PhotoViewWrapperContainerMemo = memo(PhotoViewWrapperContainer, areEqual);

export { PhotoViewWrapperContainerMemo as PhotoViewWrapper };
