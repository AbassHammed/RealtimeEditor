import React, { useEffect, useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import { Socket } from 'socket.io-client';
import ACTIONS from '@/utils/action';
import { SiJavascript, SiCplusplus, SiPython, SiC } from 'react-icons/si';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { DefaultEventsMap } from '@socket.io/component-emitter';

type LanguageOptions = {
  key: string;
  icon: IconType;
};

const Languages: LanguageOptions[] = [
  { key: 'C++', icon: SiCplusplus },
  { key: 'JavaScript', icon: SiJavascript },
  { key: 'C', icon: SiC },
  { key: 'Python', icon: SiPython },
];

interface DropDownProps {
  onLanguageSelect: (value: string) => void;
  editorRoomId: string;
  socketRef: Socket<DefaultEventsMap, DefaultEventsMap> | null;
}

const DropDown: React.FC<DropDownProps> = ({ onLanguageSelect, editorRoomId, socketRef }) => {
  const [selectedKey, setSelectedKey] = useState('C++');

  const SelectedIcon = useMemo(() => {
    const language = Languages.find(lang => lang.key === selectedKey);
    return language ? language.icon : null;
  }, [selectedKey]);

  useEffect(() => {
    // Listen for language change events from the server
    if (socketRef) {
      socketRef.on(ACTIONS.LANGUAGE_CHANGE, ({ language }) => {
        setSelectedKey(language);
        onLanguageSelect(language);
      });
    }

    // Cleanup on component unmount
    return () => {
      socketRef?.off(ACTIONS.LANGUAGE_CHANGE);
    };
  }, [onLanguageSelect, socketRef]);

  // When a new language is selected, update the selectedKey state
  // and call onLanguageSelect with the new key.
  const handleSelectionChange = (language: string) => {
    setSelectedKey(language);
    onLanguageSelect(language);

    socketRef?.emit(ACTIONS.LANGUAGE_CHANGE, {
      editorRoomId,
      language,
    });
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          size="sm"
          variant="bordered"
          color="success"
          className="capitalize"
          startContent={SelectedIcon && <SelectedIcon />}>
          {selectedKey}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={new Set([selectedKey])}
        onSelectionChange={keys => handleSelectionChange(Array.from(keys)[0] as string)}>
        {Languages.map(Language => (
          <DropdownItem startContent={<Language.icon />} key={Language.key}>
            {Language.key}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDown;
