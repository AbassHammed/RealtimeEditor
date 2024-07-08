import React, { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { setCollaboratorName, setEditorRoomId } from '@/redux/editorSlice';
import { FaRegClipboard } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { useToast } from '../Shared/toast';

const CreateSession = () => {
  const [inputs, setInputs] = useState({ sessionName: '', sessionId: '' });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const dispatch = useDispatch();

  const generateSessionId = () => {
    const uuidPart = uuidv4().replace(/-/g, '').slice(0, 12);
    const timePart = Date.now().toString(36).slice(-4);
    return `${uuidPart}${timePart}`.toUpperCase();
  };

  const handleInputChange = useCallback((e: any) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleGenerateSessionId = () => {
    const newSessionId = generateSessionId();
    setInputs(prev => ({ ...prev, sessionId: newSessionId }));
  };

  const handleCreate = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (!inputs.sessionId || !inputs.sessionName) {
      setIsLoading(false);
      return toast({ variant: 'warn', description: 'Please fill all fields' });
    }

    if (inputs.sessionId.length < 16) {
      setIsLoading(false);
      return toast({ variant: 'warn', description: 'Session ID must be at least 16 characters' });
    }

    dispatch(setCollaboratorName(inputs.sessionName));
    dispatch(setEditorRoomId(inputs.sessionId));
    setIsLoading(false);
    router.push(`editor/${inputs.sessionId}`);
  };

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleCreate}>
      <h3 className="text-xl font-medium text-white">Create a session</h3>
      <div>
        <label htmlFor="sessionName" className="text-sm font-medium block mb-2 text-gray-300">
          Your name
        </label>
        <input
          onChange={handleInputChange}
          type="text"
          name="sessionName"
          id="sessionName"
          className="
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        "
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="sessionId" className="text-sm font-medium block mb-2 text-gray-300">
          Session ID
        </label>
        <div className="relative flex items-center">
          <input
            value={inputs.sessionId}
            onChange={handleInputChange}
            type="text"
            name="sessionId"
            id="sessionId"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10
						bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="Session ID"
          />
          <FaRegClipboard
            className="text-white cursor-pointer absolute right-3"
            onClick={handleGenerateSessionId}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center bg-brand-purple hover:bg-brand-purple-s
            ">
        {isLoading ? 'creating...' : 'Create'}
      </button>
    </form>
  );
};
export default CreateSession;
