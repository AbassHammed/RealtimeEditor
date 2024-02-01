import React, { useState, useMemo, useEffect } from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import EditorFooter from './Footer';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import ACTIONS from '@/utils/action';

export interface ISettings {
  fontSize: string;
  settingsModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}

type PlaygroundProps = {
  socketRef: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  onCodeChange: (value: string) => void;
  editorRoomId: string;
};

const Playground = ({ socketRef, onCodeChange, editorRoomId }: PlaygroundProps) => {
  const [fontSize, setFontSize] = useLocalStorage('lcc-fontSize', '16px');
  const [settings, setSettings] = useState({
    fontSize,
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
  });
  const [selectedLanguage, setSelectedLanguage] = useState('C++');
  const [currentCode, setCurrentCode] = useState('');

  const languages = useMemo(
    () => ({
      JavaScript: {
        extension: javascript(),
        initialCode: 'console.log("Hello, JavaScript!");',
        fileExtension: '.js',
        backendIdentifier: 'javascript',
      },
      C: {
        extension: cpp(),
        initialCode: '#include <stdio.h>\nint main() {\n   printf("Hello, C!");\n   return 0;\n}',
        fileExtension: '.c',
        backendIdentifier: 'c',
      },
      'C++': {
        extension: cpp(),
        initialCode:
          '#include <iostream>\nint main() {\n    std::cout << "Hello, C++!";\n    return 0;\n}',
        fileExtension: '.cpp',
        backendIdentifier: 'cpp',
      },
      Python: {
        extension: python(),
        initialCode: 'print("Hello, Python!")',
        fileExtension: '.py',
        backendIdentifier: 'python',
      },
    }),
    [],
  );

  useEffect(() => {
    if (socketRef) {
      socketRef.on(ACTIONS.CODE_CHANGED, ({ currentCode }) => {
        if (currentCode !== null) {
        }
      });
    }
  });

  useEffect(() => {
    setCurrentCode(languages[selectedLanguage as keyof typeof languages].initialCode);
  }, [selectedLanguage]);

  const handleLanguageSelect = (language: string) => setSelectedLanguage(language);

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

  return (
    <div className="flex flex-col relative bg-[#0f0f0f] h-[calc(100vh-58px)] rounded-lg shadow-xl overflow-hidden mr-2 ml-2 mb-2">
      <PreferenceNav
        settings={settings}
        setSettings={setSettings}
        onLanguageSelect={handleLanguageSelect}
      />
      <div className="w-full h-screen overflow-auto bg-[#282828] shadow-xl select-none">
        <CodeMirror
          value={currentCode}
          onChange={setCurrentCode}
          theme={vscodeDark}
          extensions={[languages[selectedLanguage as keyof typeof languages].extension]}
          style={{ fontSize: settings.fontSize }}
        />
      </div>
      <EditorFooter handleGenerate={handleGenerate} />
    </div>
  );
};

export default Playground;
