import { authModalState } from '@/atoms/authModalAtom';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setCollaboratorName, setEditorRoomId } from '@/redux/editorSlice';

const JoinSession = () => {
  const [inputs, setInputs] = useState({ sessionId: '', userName: '' });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const setAuthModalState = useSetRecoilState(authModalState);

  const dispatch = useDispatch();

  const handleClick = (type: 'join' | 'create') => {
    setAuthModalState(prev => ({ ...prev, type }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    if (!inputs.sessionId || !inputs.userName) {
      setIsLoading(false);
      toast.warning('Please fill all fields');
      return false;
    }
    return true;
  };

  const handleJoin = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    if (validateInputs()) {
      dispatch(setCollaboratorName(inputs.userName));
      dispatch(setEditorRoomId(inputs.sessionId));
    }
    setIsLoading(false);
    router.push(`/editor/${inputs.sessionId}`);
  };

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleJoin}>
      <h3 className="text-xl font-medium text-white">Join a session</h3>
      <div>
        <label htmlFor="sessionId" className="text-sm font-medium block mb-2 text-gray-300">
          Your session ID
        </label>
        <input
          onChange={handleInputChange}
          type="sessionId"
          name="sessionId"
          id="sessionId"
          className="
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        "
          placeholder="25AZ7R9B"
        />
      </div>
      <div>
        <label htmlFor="userName" className="text-sm font-medium block mb-2 text-gray-300">
          Your name
        </label>
        <input
          onChange={handleInputChange}
          type="userName"
          name="userName"
          id="userName"
          className="
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        "
          placeholder="Coco jojo"
        />
      </div>

      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center bg-brand-purple hover:bg-brand-purple-s
            ">
        {isLoading ? 'Joining...' : 'Join'}
      </button>
      <div className="text-sm font-medium text-gray-300">
        Create session{' '}
        <a href="#" className="text-blue-700 hover:underline" onClick={() => handleClick('create')}>
          Here
        </a>
      </div>
    </form>
  );
};
export default JoinSession;
