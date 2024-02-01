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

  function capitalizeString(input: string): string {
    if (!input) return '';
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  const editorName = collaboratorName;
  return (
    <AvatarGroup isBordered max={6}>
      {clients &&
        clients.map(client => (
          <Tooltip
            key={client.socketId}
            content={
              editorName === client.collaboratorName
                ? 'me'
                : capitalizeString(client.collaboratorName)
            }>
            <Avatar
              size="sm"
              color={editorName === client.collaboratorName ? 'success' : 'default'}
              name={capitalizeString(client.collaboratorName)}
            />
          </Tooltip>
        ))}
    </AvatarGroup>
  );
};

export default AvatarDiv;
