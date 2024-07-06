import React, { useEffect, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/Shared/popover';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { BsCheckLg } from 'react-icons/bs';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import ACTIONS from '@/utils/action';

interface LanguageOption {
  id: string;
  name: string;
}

const languages1: LanguageOption[] = [
  { id: '1', name: 'C++' },
  { id: '2', name: 'Python' },
  { id: '4', name: 'C' },
  { id: '3', name: 'JavaScript' },
  { id: '5', name: 'Java' },
  { id: '6', name: 'Ruby' },
] as const;

const languages2: LanguageOption[] = [
  { id: '7', name: 'Go' },
  { id: '8', name: 'Rust' },
  { id: '9', name: 'TypeScript' },
  { id: '10', name: 'PHP' },
  { id: '11', name: 'Swift' },
  { id: '12', name: 'Kotlin' },
] as const;

const languages3: LanguageOption[] = [
  { id: '13', name: 'C#' },
  { id: '14', name: 'Perl' },
  { id: '15', name: 'Haskell' },
  { id: '16', name: 'Lua' },
  { id: '17', name: 'R' },
] as const;

const languages = [...languages1, ...languages2, ...languages3];
interface DropDownProps {
  onLanguageSelect: (language: string) => void;
  editorRoomId: string;
  socketRef: Socket<DefaultEventsMap, DefaultEventsMap> | null;
}

const DropDown: React.FC<DropDownProps> = ({ onLanguageSelect, socketRef, editorRoomId }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0].name);

  const handleLanguageChange = (language: LanguageOption) => {
    setSelectedLanguage(language.name);
    onLanguageSelect(language.name);

    socketRef?.emit(ACTIONS.LANGUAGE_CHANGE, {
      editorRoomId,
      language: language.name,
    });
  };

  useEffect(() => {
    // Listen for language change events from the server
    if (socketRef) {
      socketRef.on(ACTIONS.LANGUAGE_CHANGE, ({ language }: { language: string }) => {
        setSelectedLanguage(language);
        onLanguageSelect(language);
      });
    }

    // Cleanup on component unmount
    return () => {
      socketRef?.off(ACTIONS.LANGUAGE_CHANGE);
    };
  }, [onLanguageSelect, socketRef]);

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex whitespace-nowrap !flex-row justify-center items-center m-1 rounded-md p-1 cursor-pointer hover:bg-gray-8  text-[#a8a8a8] text-sm font-normal">
          {selectedLanguage}
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] flex flex-row p-1 m-1 bg-[#323232]" align="start">
        <div className="flex flex-col">
          {languages1.map(language => (
            <div
              onClick={() => handleLanguageChange(language)}
              key={language.id}
              className="relative flex w-[120px] p-1 m-1 rounded-[4px] text-[#f5f5f5] hover:bg-[#4d4d4d] focus:outline-none cursor-pointer">
              <span
                className={`flex items-center mr-2 ${
                  selectedLanguage === language.name ? 'visible' : 'invisible'
                }`}>
                <BsCheckLg />
              </span>
              <div className="text-left text-[14px]">{language.name}</div>
            </div>
          ))}
        </div>
        <span className="h-56 w-[0.5px] bg-gray-500 py-6" />
        <div className="flex flex-col">
          {languages2.map(language => (
            <div
              onClick={() => handleLanguageChange(language)}
              key={language.id}
              className="relative flex w-[120px] p-1 m-1 rounded-[4px] text-[#f5f5f5] hover:bg-[#4d4d4d]  focus:outline-none cursor-pointer">
              <span
                className={`flex items-center mr-2 ${
                  selectedLanguage === language.name ? 'visible' : 'invisible'
                }`}>
                <BsCheckLg />
              </span>
              <div className="text-left text-[14px]">{language.name}</div>
            </div>
          ))}
        </div>
        <span className="h-56 w-[0.5px] bg-gray-500 py-6" />
        <div className="flex flex-col">
          {languages3.map(language => (
            <div
              onClick={() => handleLanguageChange(language)}
              key={language.id}
              className="relative flex w-[120px] p-1 m-1 rounded-[4px] text-[#f5f5f5] hover:bg-[#4d4d4d]  focus:outline-none cursor-pointer">
              <span
                className={`flex items-center mr-2 ${
                  selectedLanguage === language.name ? 'visible' : 'invisible'
                }`}>
                <BsCheckLg />
              </span>
              <div className="text-left text-[14px]">{language.name}</div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DropDown;
