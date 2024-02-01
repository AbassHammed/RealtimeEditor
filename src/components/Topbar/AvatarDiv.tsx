import React from 'react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Avatar, AvatarGroup, Tooltip } from '@nextui-org/react';

type TClients = {
  socketId: string;
  collaboratorName: string;
};

type AvatarDivProps = {
  clients?: TClients[];
};

const AvatarDiv: React.FC<AvatarDivProps> = ({ clients }: AvatarDivProps) => {
  const { collaboratorName } = useSelector((state: RootState) => state.editor);

  const editorName = collaboratorName;
  return (
    <AvatarGroup isBordered max={6}>
      {clients &&
        clients.map(client => (
          <Tooltip
            content={editorName === client.collaboratorName ? 'me' : client.collaboratorName}>
            <Avatar
              color={editorName === client.collaboratorName ? 'success' : 'default'}
              name={client.collaboratorName}
            />
          </Tooltip>
        ))}
    </AvatarGroup>
  );
};
export default AvatarDiv;
