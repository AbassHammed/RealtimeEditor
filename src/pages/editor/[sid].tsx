import React, { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { Playground, Topbar, useToast } from '@/components';
import { useSession } from '@/hooks';
import { setCollaboratorName, setEditorRoomId } from '@/redux/editorSlice';
import { RootState } from '@/redux/store';
import { TClients } from '@/types';
import ACTIONS from '@/utils/action';
import socketInit from '@/utils/socket';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';

const Editor: React.FC = () => {
  const { sessionData } = useSession();
  const [clients, setClients] = useState<TClients[]>([]);
  const socketRef = useRef<null | Socket<DefaultEventsMap, DefaultEventsMap>>(null);
  const codeRef = useRef<string | null>(null);
  const { editorRoomId, collaboratorName } = useSelector((state: RootState) => state.editor);
  const [socId, setSocId] = useState<string>('');
  const router = useRouter();
  const editorName = collaboratorName;
  const { toast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const handleSocketError = () => {
        toast({ variant: 'destructive', description: 'Unable to join room, try again' });
        router.push('/auth');
      };

      if (!sessionData) {
        toast({
          variant: 'destructive',
          description: 'Session data not found, please create a session',
        });
        router.push('/auth');
        return;
      }

      dispatch(setCollaboratorName(sessionData.userName));
      dispatch(setEditorRoomId(sessionData.roomId));

      socketRef.current = socketInit();

      socketRef.current.on('connect_error', () => handleSocketError());

      socketRef.current.emit(ACTIONS.JOIN, {
        editorRoomId: sessionData.roomId,
        collaboratorName: sessionData.userName,
      });

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
  }, [editorRoomId, collaboratorName, editorName, router, toast, sessionData, dispatch]);

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
