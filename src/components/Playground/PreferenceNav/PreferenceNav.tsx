import React, { useState, useEffect } from 'react';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import DropDown from '@/components/Buttons/Dropdown';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';
import { Button } from '@nextui-org/react';
import Settings from '@/components/Modals/Settings';

type PreferenceNavProps = {
  socketRef: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  onLanguageSelect: (language: string) => void;
  editorRoomId: string;
  onFontSizeChange: (fontSize: string) => void;
};

const PreferenceNav = ({
  onLanguageSelect,
  editorRoomId,
  socketRef,
  onFontSizeChange,
}: PreferenceNavProps) => {
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
    <div className="flex items-center justify-between bg-[#303030] h-10 w-full overflow-x-hidden rounded-t-lg shadow-md z-40">
      <div className="flex items-center text-white">
        <DropDown
          socketRef={socketRef}
          editorRoomId={editorRoomId}
          onLanguageSelect={onLanguageSelect}
        />
      </div>
      <div className="flex items-center relative justify-end">
        <Settings onFontSizeChange={onFontSizeChange} />

        <Button
          isIconOnly
          onClick={handleFullScreenToggle}
          color="primary"
          variant="light"
          className="w-7 h-7 rounded-sm text-lg"
          aria-label="FullScreen">
          {!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
        </Button>
      </div>
    </div>
  );
};

export default PreferenceNav;
