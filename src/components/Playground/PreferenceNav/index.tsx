import React, { useState, useEffect } from 'react';
import DropDown from './Dropdown';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';
import { Maximize2, Minimize2 } from 'lucide-react';

type PreferenceNavProps = {
  socketRef: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  onLanguageSelect: (language: string) => void;
  editorRoomId: string;
};

const PreferenceNav = ({ onLanguageSelect, editorRoomId, socketRef }: PreferenceNavProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreenToggle = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const exitHandler = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('webkitfullscreenchange', exitHandler);
    document.addEventListener('mozfullscreenchange', exitHandler);
    document.addEventListener('MSFullscreenChange', exitHandler);

    return () => {
      document.removeEventListener('fullscreenchange', exitHandler);
      document.removeEventListener('webkitfullscreenchange', exitHandler);
      document.removeEventListener('mozfullscreenchange', exitHandler);
      document.removeEventListener('MSFullscreenChange', exitHandler);
    };
  }, []);

  return (
    <div className="flex items-center justify-between bg-[#333] h-10 w-full rounded-t-md shadow-md z-40">
      <div className="flex items-center text-white">
        <DropDown
          socketRef={socketRef}
          editorRoomId={editorRoomId}
          onLanguageSelect={onLanguageSelect}
        />
      </div>
      <div className="flex items-center relative justify-end mr-2">
        <button
          aria-label="FullSreen"
          className="rounded px-3 py-1.5 font-medium items-center whitespace-nowrap focus:outline-none inline-flex group ml-auto !p-1"
          onClick={handleFullScreenToggle}>
          {!isFullScreen ? (
            <Maximize2 className="h-4 w-4 text-[#737373] group-hover:text-dark-gray-7" />
          ) : (
            <Minimize2 className="h-4 w-4 text-[#737373] group-hover:text-dark-gray-7" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PreferenceNav;
