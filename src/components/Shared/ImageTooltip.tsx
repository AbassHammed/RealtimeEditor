import React, { useEffect, useState } from 'react';
import { TClients } from '@/types';
import { generateRandomHexColor, getInitials } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { ToolTip } from './tooltip';

export const ProfilePicture = ({
  name,
  notRounded = false,
}: {
  name: string;
  notRounded?: boolean;
}) => {
  const { collaboratorName } = useSelector((state: RootState) => state.editor);

  const [backgroundColor, setBackgroundColor] = useState(generateRandomHexColor());
  const firstLetter = notRounded ? getInitials(name) : name.charAt(0).toUpperCase();

  useEffect(() => {
    setBackgroundColor(generateRandomHexColor());
  }, []);

  return (
    <span
      style={{ backgroundColor: `${collaboratorName !== name ? backgroundColor : '#00ff00'}` }}
      className={`object-cover text-[18px] font-medium !m-0 !p-0 object-top ${notRounded ? 'rounded' : 'rounded-full border-white border-2'} h-10 w-10 text-white group-hover:scale-105 group-hover:z-30 flex justify-center items-center relative transition duration-500`}>
      {firstLetter}
    </span>
  );
};

export const ImageTooltip = ({ items }: { items: TClients[] }) => {
  const { collaboratorName } = useSelector((state: RootState) => state.editor);

  return (
    <>
      {items.map(item => (
        <div className="-mr-4 relative group" key={item.socketId}>
          <ToolTip
            message={`${item.collaboratorName} ${collaboratorName === item.collaboratorName ? '(you)' : ''}`}
            side="bottom">
            <ProfilePicture name={item.collaboratorName} />
          </ToolTip>
        </div>
      ))}
    </>
  );
};
