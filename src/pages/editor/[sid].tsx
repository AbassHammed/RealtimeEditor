import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { useRouter } from 'next/router';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { useSelector } from 'react-redux';
import ACTIONS from '@/utils/action';
import { RootState } from '@/redux/store';
import socketInit from '@/utils/socket';
import Topbar from '@/components/Topbar/Topbar';
import Playground from '@/components/Playground/Playground';
import { useToast } from '@/components/Shared/toast';

type TClients = {
  socketId: string;
  collaboratorName: string;
};

const Editor: React.FC = () => {
  const [clients, setClients] = useState<TClients[]>([]);
  const socketRef = useRef<null | Socket<DefaultEventsMap, DefaultEventsMap>>(null);
  const codeRef = useRef<string | null>(null);
  const { editorRoomId, collaboratorName } = useSelector((state: RootState) => state.editor);
  const [socId, setSocId] = useState<string>('');
  const router = useRouter();
  const editorName = collaboratorName;
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      /* eslint-disable */
      const handleSocketError = (error: Error) => {
        /* eslint-enable */
        toast({ variant: 'destructive', description: 'Unable to join room, try again' });
        router.push('/auth');
      };

      socketRef.current = socketInit();

      socketRef.current.on('connect_error', err => handleSocketError(err));
      socketRef.current.on('connect_failed', err => handleSocketError(err));

      socketRef.current.emit(ACTIONS.JOIN, { editorRoomId, collaboratorName });

      socketRef.current.on(ACTIONS.JOINED, ({ clients, collaboratorName, socketId }) => {
        if (collaboratorName !== editorName) {
          toast({ variant: 'default', description: `${collaboratorName} has joined the session` });
        }
        setClients(clients);
        setSocId(socketId);
        socketRef.current?.emit(ACTIONS.SYNC_CODE, {
          code: codeRef.current,
          socketId,
        });
      });

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, collaboratorName }) => {
        toast({ variant: 'default', description: `${collaboratorName} has left the session` });
        setClients(prev => prev.filter(client => client.socketId !== socketId));
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
  }, [editorRoomId, collaboratorName, editorName, router, toast]);

  return (
    <>
      <div className="bg-[#0f0f0f] h-screen">
        <Topbar clients={clients} />
        <Playground
          editorRoomId={editorRoomId}
          socketRef={socketRef.current}
          socketId={socId}
          onCodeChange={code => {
            codeRef.current = code;
          }}
        />
      </div>
    </>
  );
};
export default Editor;
