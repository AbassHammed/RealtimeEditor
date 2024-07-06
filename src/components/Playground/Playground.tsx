import React, { useState, useEffect } from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import ACTIONS from '@/utils/action';
import EditorFooter from './Footer';
import { useReadLocalStorage } from '@/hooks/useReadLocalStorage';
import CodeMirror from '@uiw/react-codemirror';
import { languages } from '@/lib/lang';

type PlaygroundProps = {
  socketRef: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  onCodeChange: (value: string) => void;
  editorRoomId: string;
};

const Playground = ({ socketRef, onCodeChange, editorRoomId }: PlaygroundProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('C++');
  const fontSize = useReadLocalStorage<string>('lcc-fontsize');
  const [currentCode, setCurrentCode] = useState('');

  const handleCodeChange = (value: string) => {
    setCurrentCode(value);
    onCodeChange(value);
    socketRef?.emit(ACTIONS.CODE_CHANGE, {
      editorRoomId,
      currentCode,
    });
  };

  useEffect(() => {
    if (socketRef) {
      socketRef.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          setCurrentCode(code);
        }
      });
    }

    return () => {
      socketRef?.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef]);

  const handleGenerate = () => {
    const fileExtension = languages[selectedLanguage as keyof typeof languages].fileExtension;
    const blob = new Blob([currentCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleLanguageSelect = (language: string) => setSelectedLanguage(language);

  return (
    <div className="flex flex-auto flex-col w-full">
      <div
        onClick={e => e.preventDefault()}
        tabIndex={-1}
        className="rounded-md overflow-hidden mx-2 focus:ring-1 focus-within:ring-[#969696] focus:ring-opacity-50 
                       active:ring-1 active:ring-[#969696] active:ring-opacity-50">
        <PreferenceNav
          onLanguageSelect={handleLanguageSelect}
          socketRef={socketRef}
          editorRoomId={editorRoomId}
        />
        <div className="w-full overflow-auto dark:bg-[#262626] bg-white select-none h-[calc(100vh-140px)]">
          <CodeMirror
            value={currentCode}
            onChange={handleCodeChange}
            theme={'dark'}
            extensions={[languages[selectedLanguage as keyof typeof languages].extension]}
            style={{ fontSize: fontSize || '13px' }}
          />
        </div>
      </div>
      <div
        tabIndex={-1}
        className="focus:ring-1 focus:ring-[#969696] focus:ring-opacity-50 
                       active:ring-1 active:ring-[#969696] active:ring-opacity-50 rounded-lg mx-2 mt-2">
        <EditorFooter handleGenerate={handleGenerate} />
      </div>
    </div>
  );
};

export default Playground;
