import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { useRouter } from 'next/router';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import ACTIONS from '@/utils/action';
import { RootState } from '@/redux/store';
import socketInit from '@/utils/socket';
import Topbar from '@/components/Topbar/Topbar';
import Playground from '@/components/Playground/Playground';

type TClients = {
  socketId: string;
  collaboratorName: string;
};

type EditorProps = {};

const Editor: React.FC<EditorProps> = () => {
  const [clients, setClients] = useState<TClients[]>([]);
  const socketRef = useRef<null | Socket<DefaultEventsMap, DefaultEventsMap>>(null);
  const codeRef = useRef<string | null>(null);
  const { editorRoomId, collaboratorName } = useSelector((state: RootState) => state.editor);
  const router = useRouter();
  const editorName = collaboratorName;

  useEffect(() => {
    (async () => {
      const handleSocketError = (error: Error) => {
        toast.error('Unable to join room, try again');
        router.push('/auth');
      };

      socketRef.current = socketInit();

      socketRef.current.on('connect_error', err => handleSocketError(err));
      socketRef.current.on('connect_failed', err => handleSocketError(err));

      socketRef.current.emit(ACTIONS.JOIN, { editorRoomId, collaboratorName });

      socketRef.current.on(ACTIONS.JOINED, ({ clients, collaboratorName, socketId }) => {
        if (collaboratorName !== editorName)
          toast.info(`${collaboratorName} has joined the session`);
        setClients(clients);
        socketRef.current?.emit(ACTIONS.SYNC_CODE, {
          code: codeRef.current,
          socketId,
        });
      });

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, collaboratorName }) => {
        toast.info(`${collaboratorName} has left the session`);
        setClients(prev => {
          return prev.filter(client => client.socketId !== socketId);
        });
      });

      if (!collaboratorName) {
        router.push('/auth');
      }
    })();

    return () => {
      socketRef.current?.off(ACTIONS.JOINED);
      socketRef.current?.off(ACTIONS.DISCONNECTED);
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <>
      <div className="bg-[#0f0f0f] h-[100vh]">
        <Topbar clients={clients} />
        <Playground />
      </div>
    </>
  );
};
export default Editor;
