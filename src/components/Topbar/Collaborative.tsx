import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { IoIosShareAlt } from 'react-icons/io';
import { useState } from 'react';
import { Button, Card, CardBody, Divider, Tab, Tabs } from '@nextui-org/react';
import { GiCheckMark } from 'react-icons/gi';
import { GoPeople } from 'react-icons/go';
import { IoOptionsOutline } from 'react-icons/io5';
import CopyDocumentIcon from '@/components/Icons/CopyDocumentIcon';
import { useToast } from '../Shared/toast';
import { TClients } from '@/types';

type CollaboratorProps = {
  clients?: TClients[];
  isDropdownOpen: boolean;
  setIsDropdownOpen: (prev: (prev: boolean) => boolean) => void;
};

const Collaborator = ({ clients, isDropdownOpen, setIsDropdownOpen }: CollaboratorProps) => {
  const { editorRoomId, collaboratorName } = useSelector((state: RootState) => state.editor);
  const [copy, setCopy] = useState(false);
  const [selected, setSelected] = useState('share');
  const { toast } = useToast();

  const editorName = collaboratorName;

  const handleCopyRoomId = () => {
    setCopy(true);
    navigator.clipboard.writeText(editorRoomId).then(() => {
      toast({
        variant: 'warn',
        description: 'Room Id copied successfully',
      });
      setTimeout(() => {
        setCopy(false);
      }, 3000);
    });
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsDropdownOpen((prev: boolean) => !prev)}
        color="success"
        size="sm"
        className="p-2 m-0"
        startContent={<IoOptionsOutline />}>
        {' '}
        Options{' '}
      </Button>

      {isDropdownOpen && (
        <Card className="absolute z-50 w-80 top-12 right-0 bg-[#0f0f0f] p-4 border-2 rounded-xl">
          <CardBody className="overflow-hidden p-0">
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={keys => setSelected(keys as string)}
              variant="bordered"
              color="success">
              <Tab
                key="share"
                title={
                  <div className="flex items-center space-x-2">
                    <IoIosShareAlt />
                    <span>Share</span>
                  </div>
                }>
                <Button
                  color={copy ? 'success' : 'primary'}
                  className="w-full"
                  startContent={copy ? <GiCheckMark /> : <CopyDocumentIcon />}
                  onClick={handleCopyRoomId}>
                  {copy ? 'Copied' : 'Copy Invite Code'}
                </Button>
                <Divider className="my-4 bg-white" />
              </Tab>
              <Tab
                key="people"
                title={
                  <div className="flex items-center space-x-2">
                    <GoPeople />
                    <span>Connected</span>
                  </div>
                }>
                <div className="max-h-48 mt-3 overflow-y-auto">
                  {clients &&
                    clients.map(client => (
                      <div
                        className="flex items-center gap-3 py-2 text-white"
                        key={client.socketId}>
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
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default Collaborator;
