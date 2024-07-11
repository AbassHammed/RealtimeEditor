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
  TabsContent,
  TabsTrigger,
} from '@/components';
import { Check, Copy, List, Share2, Users } from 'lucide-react';
import { ProfilePicture } from '../Shared/ImageTooltip';

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
        variant: 'default',
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
        <Button className="bg-green-600 m-0 p-1 h-8 w-20 text-sm">
          <List className="mr-2 h-4 w-4" /> Options
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-[#323232] ring-1 ring-[#969696] ring-opacity-50">
        <Tabs defaultValue="share">
          <TabsList className="grid w-full grid-cols-2 bg-[#262626] items-center justify-center p-0 px-2 m-0 h-12 ring-1 ring-[#969696] ring-opacity-50">
            <TabsTrigger value="share" className="rounded-md hover:text-white">
              <div className="flex items-center space-x-2">
                <Share2 />
                <span>Share</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="people"
              className="flex items-center space-x-2 rounded-md hover:text-white">
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
          <TabsContent value="people" className="mr-2">
            {clients &&
              clients.map(client => (
                <div
                  className="flex items-center justify-start gap-3 py-2 text-white"
                  key={client.socketId}>
                  <ProfilePicture name={client.collaboratorName} notRounded />
                  <p>
                    {client.collaboratorName.split(' ')[0]}
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
