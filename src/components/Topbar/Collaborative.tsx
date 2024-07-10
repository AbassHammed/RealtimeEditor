import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useState } from 'react';
import { useToast } from '../Shared/toast';
import { TClients } from '@/types';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components';
import { Check, Copy, List, Share2, Users } from 'lucide-react';
import { TabsContent } from '@radix-ui/react-tabs';

interface CollaboratorProps {
  clients?: TClients[];
}

const Collaborator = ({ clients }: CollaboratorProps) => {
  const { editorRoomId, collaboratorName } = useSelector((state: RootState) => state.editor);
  const [copy, setCopy] = useState(false);
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
    <Popover>
      <PopoverTrigger>
        <Button className="bg-green-600">
          <List className="mr-2 h-4 w-4" /> Options
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-[#323232]">
        <Tabs defaultValue="share">
          <TabsList className="grid w-full grid-cols-2 bg-[#262626] items-center justify-center p-0 px-2 m-0 h-12">
            <TabsTrigger value="share">
              <div className="flex items-center space-x-2">
                <Share2 />
                <span>Share</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="people" className="flex items-center space-x-2">
              <Users />
              <span>People</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="share" className="flex w-full items-center space-x-2 py-2">
            <Button
              className={`w-full ${copy ? 'cursor-not-allowed bg-green-500' : 'cursor-pointer bg-white'}`}
              onClick={handleCopyRoomId}>
              {copy ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copy ? 'Copied!' : 'Copy Room Id'}
            </Button>
          </TabsContent>
          <TabsContent
            value="people"
            className="flex w-full items-center space-x-2 max-h-48 overflow-y-auto">
            {clients &&
              clients.map(client => (
                <div className="flex items-center gap-3 py-2 text-white" key={client.socketId}>
                  <Avatar
                    name={client.collaboratorName.split(' ')[0]}
                    size="36"
                    round="4px"
                    maxInitials={2}
                    textSizeRatio={2}
                  />
                  <p>
                    {client.collaboratorName}
                    <span className="text-xs font-semibold text-zinc-400">
                      {editorName === client.collaboratorName && ' (you)'}
                    </span>
                  </p>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default Collaborator;
