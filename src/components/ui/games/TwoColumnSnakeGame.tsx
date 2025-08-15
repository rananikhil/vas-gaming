import {useNavigate} from "react-router";

export default function TwoColumnSnakeGame({ onClick }) {

    const navigate = useNavigate();

    function playOtherGame() {
        navigate('/games/100metresrace/gamefiles/index.html');
        navigate(0);
    }

    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <img
            src="/images/games/snake-game-demo.gif"
            alt=" grid"
            className="border border-gray-200 rounded-xl dark:border-gray-800"
            onClick={onClick}
          />
        </div>

        <div>
          <img
            src="/games/100metresrace/Images/100metresrace_512x512.png"
            alt=" grid"
            className="border border-gray-200 rounded-xl dark:border-gray-800"
            onClick={playOtherGame}
          />
        </div>
      </div>
    );
}
