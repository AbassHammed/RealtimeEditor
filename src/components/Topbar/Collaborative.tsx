import Avatar from 'react-avatar';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { IoIosPeople } from 'react-icons/io';
import { BsClipboard } from 'react-icons/bs';

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

  const editorName = collaboratorName;

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(editorRoomId);
    toast.success('Room Id copied successfully');
  };

  return (
    <div className="relative">
      <span className="absolute -right-2 -top-2 rounded-full w-6 text-center p-1 bg-white text-black text-xs">
        {clients?.length}
      </span>
      <button
        onClick={() => setIsDropdownOpen((prev: boolean) => !prev)}
        className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 border-2 border-gray-600 rounded-sm p-3 font-semibold ease-in duration-75">
        <IoIosPeople />
        Collaborators
      </button>

      {isDropdownOpen && (
        <div className="absolute z-50 w-80 top-14 right-0 bg-zinc-800 p-4 border-2 border-gray-600 rounded-sm drop-shadow-xl">
          <button
            className="flex items-center justify-center gap-2 bg-blue-600 w-full p-3 cursor-pointer font-semibold rounded-sm text-sm hover:bg-blue-700 ease-in duration-75"
            onClick={handleCopyRoomId}>
            <BsClipboard />
            Copy Invite Code
          </button>
          <span className="block w-full h-px bg-[#5d5d5d] mt-4"></span>
          <div className="max-h-48 mt-3 overflow-y-auto">
            {clients &&
              clients.map(client => (
                <div className="flex items-center gap-3 py-2" key={client.socketId}>
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
                      {editorName === client.collaboratorName && ' (You)'}
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
