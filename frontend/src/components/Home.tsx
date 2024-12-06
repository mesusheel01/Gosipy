import { useRecoilState } from "recoil";
import { roomIdAtom, errorAtom, userNameAtom } from "../store/state";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [roomId, setRoomId] = useRecoilState(roomIdAtom);
  const [error, setError] = useRecoilState(errorAtom);
  const [userName, setUserName] = useRecoilState(userNameAtom);
  const navigate = useNavigate();

  const getRoomId = async () => {
    try {
      const response = await axios.post("https://gosipy-express-server.onrender.com/create-room");
      if (response.data) {
        setRoomId(response.data.roomId);
        setError(null);
      }
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred.");
          }
    }
  };

  const joinRoom = async () => {
    if (!userName.trim()) {
      setError("Name is required to join a room!");
      return;
    }
    if (!roomId.trim()) {
      setError("Room ID is required to join!");
      return;
    }
    try {
      navigate("/room");
    } catch (error) {
      setError("Failed to join the room. Try again!");
    }
  };

  return (
    <div className="h-screen font-mono flex flex-col items-center justify-center gap-10 bg-gray-950">
       <p className="text-md md:text-xl lg:text-2xl mb-20 text-pink-400 m-2
  overflow-hidden whitespace-nowrap border-r-4 border-pink-400
  animate-typewriter sm:animate-typewriterSm md:animate-typewriterMd lg:animate-typewriterLg">
  A platform where you can gossip with your friends!
</p>


      <div className="w-full max-w-md flex flex-col items-center p-8 rounded-3xl bg-gray-900 shadow-lg">
        <div className="w-full flex flex-col gap-4 items-center mb-6">
          <input
            className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <div className="flex gap-2">
            <input
              className="p-2 text-black rounded-lg focus:outline-none"
              type="text"
              placeholder="Enter Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button
              onClick={joinRoom}
              className="bg-my-500 text-my-200 px-10 py-2 rounded-lg hover:bg-my-700 transition-all duration-200"
            >
              Join
            </button>
          </div>
        </div>
        <div className="w-full">
          <button
            onClick={getRoomId}
            className="w-full bg-pink-300 text-my-700 font-mono p-2 transition-all duration-300 rounded-lg hover:bg-pink-500"
          >
            Create Room
          </button>
        </div>
        <div className="w-full mt-6 flex items-center justify-center p-16 rounded-lg bg-gray-800 text-white">
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="text-center">
              {roomId ? `Room ID: ${roomId}` : "No Room ID yet"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
