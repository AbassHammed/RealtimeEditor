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
import 'codemirror/theme/material-darker.css';
import 'codemirror/theme/ayu-dark.css';
import CodeMirror, { EditorFromTextArea } from 'codemirror';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import ACTIONS from '@/utils/action';
import EditorFooter from './Footer';

type Language = 'C++' | 'C' | 'JavaScript' | 'Python';
const languageModes: Record<Language, string> = {
  'C++': 'clike',
  C: 'clike',
  JavaScript: 'javascript',
  Python: 'python',
};

const fileExtensions: Record<Language, string> = {
  C: '.c',
  'C++': '.cpp',
  JavaScript: '.js',
  Python: '.py',
};

type PlaygroundProps = {
  socketRef: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  onCodeChange: (value: string) => void;
  editorRoomId: string;
};

const Playground = ({ socketRef, onCodeChange, editorRoomId }: PlaygroundProps) => {
  const editorRef = useRef<EditorFromTextArea | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('C++');
  const [fontSize, setFontSize] = useState('13px');
  const [currentCode, setCurrentCode] = useState('');

  useEffect(() => {
    editorRef.current = CodeMirror.fromTextArea(
      document.getElementById('code') as HTMLTextAreaElement,
      {
        mode: { name: languageModes[selectedLanguage] },
        theme: 'ayu-dark',
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
      setCurrentCode(code);
      onCodeChange(code);
      if (origin !== 'setValue') {
        socketRef?.emit(ACTIONS.CODE_CHANGE, {
          editorRoomId,
          code,
        });
      }
    });
    editorRef.current.getWrapperElement().style.fontSize = fontSize;
    editorRef.current.refresh();
    return () => {
      editorRef.current!.toTextArea();
    };
  }, [editorRoomId, onCodeChange, socketRef, selectedLanguage, fontSize, setCurrentCode]);

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

  const handleGenerate = () => {
    const fileExtension = fileExtensions[selectedLanguage];
    const blob = new Blob([currentCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleLanguageSelect = (language: string) => setSelectedLanguage(language as Language);
  const handleFontSizeChange = (fontSize: string) => setFontSize(fontSize);

  return (
    <div className="flex flex-col relative bg-[#0f0f0f] h-[calc(100vh-58px)] rounded-lg shadow-xl overflow-hidden mr-2 ml-2 mb-2 z-40">
      <PreferenceNav
        socketRef={socketRef}
        editorRoomId={editorRoomId}
        onLanguageSelect={handleLanguageSelect}
        onFontSizeChange={handleFontSizeChange}
      />
      <div className="w-full h-screen overflow-auto bg-[#282828] shadow-xl">
        <textarea name="code" id="code" className="w-full h-screen"></textarea>
      </div>
      <EditorFooter handleGenerate={handleGenerate} />
    </div>
  );
};

export default Playground;
