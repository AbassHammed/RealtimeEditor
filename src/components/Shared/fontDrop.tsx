import React from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/Shared/popover';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { BsCheckLg } from 'react-icons/bs';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const fonts = [
  { id: '1', name: '13px' },
  { id: '2', name: '14px' },
  { id: '4', name: '15px' },
  { id: '3', name: '16px' },
  { id: '5', name: '17px' },
  { id: '6', name: '18px' },
] as const;

const FontDrop = () => {
  const [value, setValue] = useLocalStorage('lcc-fontsize', '13px');

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex whitespace-nowrap !flex-row justify-center items-center m-1 rounded-md p-1 cursor-pointer hover:bg-gray-8  text-[#a8a8a8] text-sm font-normal">
          {value}
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-28 flex flex-row p-1 m-1 bg-[#323232] ring-1 ring-[#969696] ring-opacity-50"
        align="start">
        <div className="flex flex-col">
          {fonts.map(font => (
            <div
              onClick={() => setValue(font.name)}
              key={font.id}
              className="relative flex w-24 p-1 m-1 rounded-[4px] text-[#f5f5f5] hover:bg-[#4d4d4d] focus:outline-none cursor-pointer">
              <span
                className={`flex items-center mr-2 ${
                  value === font.name ? 'visible' : 'invisible'
                }`}>
                <BsCheckLg />
              </span>
              <div className="text-left text-[14px]">{font.name}</div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FontDrop;
