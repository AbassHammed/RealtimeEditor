import Avatar from 'react-avatar';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { IoIosPeople } from 'react-icons/io';
import { BsClipboard } from 'react-icons/bs';
import { useState } from 'react';
import { Badge, Button, Divider } from '@nextui-org/react';
import { GiCheckMark } from 'react-icons/gi';

type TClients = {
  socketId: string;
  collaboratorName: string;
};

type CollaboratorProps = {
  clients?: TClients[];
  isDropdownOpen: boolean;
  setIsDropdownOpen: (prev: (prev: boolean) => boolean) => void;
};

const Collaborator = ({ clients, isDropdownOpen, setIsDropdownOpen }: CollaboratorProps) => {
  const { editorRoomId, collaboratorName } = useSelector((state: RootState) => state.editor);
  const [copy, setCopy] = useState(false);

  const editorName = collaboratorName;

  const handleCopyRoomId = () => {
    setCopy(true);
    navigator.clipboard.writeText(editorRoomId).then(() => {
      toast.success('Room Id copied successfully');
      setTimeout(() => {
        setCopy(false);
      }, 3000);
    });
  };

  return (
    <div className="relative">
      <Badge content={clients?.length} color="success">
        <Button
          onClick={() => setIsDropdownOpen((prev: boolean) => !prev)}
          color="success"
          variant="bordered"
          startContent={<IoIosPeople />}>
          {' '}
          Collaborators{' '}
        </Button>
      </Badge>

      {isDropdownOpen && (
        <div className="absolute z-50 w-80 top-14 right-0 bg-zinc-800 p-4 border-2 border-gray-600 rounded-sm drop-shadow-xl">
          <Button
            color={copy ? 'success' : 'primary'}
            className="w-full"
            startContent={copy ? <GiCheckMark /> : <BsClipboard />}
            onClick={handleCopyRoomId}>
            {copy ? 'Copied' : 'Copy Invite Code'}
          </Button>
          <Divider className="my-4 bg-white" />
          <div className="max-h-48 mt-3 overflow-y-auto">
            {clients &&
              clients.map(client => (
                <div className="flex items-center gap-3 py-2 text-white" key={client.socketId}>
                  <Avatar
                    name={client.collaboratorName}
                    size="36"
                    round="4px"
                    maxInitials={1}
                    textSizeRatio={2}
                  />
                  <p>
                    {client.collaboratorName}
                    <span className="text-xs font-semibold text-zinc-400">
                      {editorName === client.collaboratorName && ' (😛)'}
                    </span>
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Collaborator;
