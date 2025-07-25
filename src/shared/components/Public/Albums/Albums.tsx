import React, { memo } from 'react';
import { areEqual } from 'utils/equalityChecks';
import { Album } from 'Containers/Public';

import classes from './albums.module.css';

interface Props {
  albums: any;
  roomId: string;
}

const Albums = ({ albums, roomId }: Props) => (
  <div className={classes.albumsBase}>
    {albums.length > 0 &&
      albums.map((album: any) => (
        <Album key={album.id} id={album.id} name={album.name} albumId={album.id} roomId={roomId} />
      ))}
  </div>
);

const AlbumsMemo = memo(Albums, areEqual);

export { AlbumsMemo as Albums };
