import React, { useState, useEffect, useRef } from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/selection/active-line';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/theme/material.css';
import CodeMirror, { EditorFromTextArea } from 'codemirror';
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
  /* eslint-disable */
  const [fontSize, setFontSize] = useLocalStorage('lcc-fontSize', '16px');
  const [settings, setSettings] = useState({
    fontSize,
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
  });
  const editorRef = useRef<EditorFromTextArea | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('C++');
  /* eslint-enable */

  useEffect(() => {
    editorRef.current = CodeMirror.fromTextArea(
      document.getElementById('code') as HTMLTextAreaElement,
      {
        mode: { name: 'python', version: 3, singleLineStringErrors: false },
        theme: 'material',
        autoRefresh: true,
        autoCloseTags: true,
        autocorrect: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        lineWrapping: true,
        tabSize: 4,
        autofocus: true,
        matchBrackets: true,
        lint: true,
        gutters: ['CodeMirror-lint-markers'],
        styleActiveLine: true,
      },
    );

    editorRef.current.on('change', (instance, changes) => {
      const { origin } = changes;
      const code = instance.getValue();
      onCodeChange(code);
      if (origin !== 'setValue') {
        socketRef?.emit(ACTIONS.CODE_CHANGE, {
          editorRoomId,
          code,
        });
      }
    });

    return () => {
      editorRef.current!.toTextArea();
    };
  }, [editorRoomId, onCodeChange, socketRef]);

  useEffect(() => {
    if (socketRef) {
      socketRef.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current!.setValue(code);
        }
      });
    }

    return () => {
      socketRef?.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef]);

  const handleLanguageSelect = (language: string) => setSelectedLanguage(language);

  return (
    <div className="flex flex-col relative bg-[#0f0f0f] h-[calc(100vh-58px)] rounded-lg shadow-xl overflow-hidden mr-2 ml-2 mb-2">
      <PreferenceNav
        socketRef={socketRef}
        editorRoomId={editorRoomId}
        settings={settings}
        setSettings={setSettings}
        onLanguageSelect={handleLanguageSelect}
      />
      <div className="w-full h-screen overflow-auto bg-[#282828] shadow-xl select-none">
        <textarea name="code" id="code" className="w-full h-full"></textarea>
      </div>
      {/* <EditorFooter handleGenerate={handleGenerate} /> */}
    </div>
  );
};

export default Playground;
