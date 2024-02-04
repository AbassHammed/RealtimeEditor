import { Button } from '@nextui-org/react';
import React from 'react';
import { IoCloudDownloadSharp } from 'react-icons/io5';

type EditorFooterProps = {
  handleGenerate: () => void;
};

const EditorFooter: React.FC<EditorFooterProps> = ({ handleGenerate }) => (
  <div className="flex bg-dark-layer-1 absolute bottom-0 z-10 w-full">
    <div className="mx-2 my-[5px] flex justify-between w-full">
      <div className="mr-2 flex flex-1 flex-nowrap items-center">
        <Button
          onClick={handleGenerate}
          startContent={<IoCloudDownloadSharp />}
          size="sm"
          color="success">
            Export file
        </Button>
      </div>
    </div>
  </div>
);
export default EditorFooter;
