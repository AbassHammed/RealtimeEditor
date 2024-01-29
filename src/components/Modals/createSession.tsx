import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { FaRegClipboard } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useDispatch } from "react-redux";
import { setCollaboratorName, setEditorRoomId } from "@/redux/editorSlice";

const CreateSession = () => {
  const [sessionId, setSessionId] = useState("");
  const [inputs, setInputs] = useState({ sessionName: "", sessionId: "" });
  const setAuthModalState = useSetRecoilState(authModalState);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = (type: "join" | "create") => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };

  const dispatch = useDispatch();

  const generateSessionId = () =>
    Math.random().toString(36).slice(-16).toUpperCase();

  const handleGenerateSessionId = () => {
    setSessionId(generateSessionId());
  };

  const handleInputChange = useCallback((e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleCreate = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    if (!inputs) {
      return toast.warning("Please fill all fields");
    }

    dispatch(setCollaboratorName(inputs.sessionName));
    dispatch(setEditorRoomId(sessionId));
    setIsLoading(false);
    router.push("/editor/${sessionId}");
  };

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleCreate}>
      <h3 className="text-xl font-medium text-white">Create a session</h3>
      <div>
        <label
          htmlFor="sessionName"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Give your session a name
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
          placeholder="TP Algorithmique"
        />
      </div>

      <div>
        <label
          htmlFor="sessionId"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Session ID
        </label>
        <div className="relative flex items-center">
          <input
            value={sessionId}
            type="text"
            name="sessionId"
            id="sessionId"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10
						bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="Session ID"
          />
          <FaRegClipboard
            className="absolute right-3 text-white cursor-pointer"
            onClick={handleGenerateSessionId}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center bg-brand-purple hover:bg-brand-purple-s
            "
      >
        {isLoading ? "creating..." : "Create"}
      </button>
      <div className="text-sm font-medium text-gray-300">
        Want to join a session{" "}
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={() => handleClick("join")}
        >
          Join a Seesion
        </a>
      </div>
    </form>
  );
};
export default CreateSession;
