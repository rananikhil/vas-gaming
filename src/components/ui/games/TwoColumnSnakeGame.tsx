export default function TwoColumnSnakeGame({ onClick }) {

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
          src="/images/games/snake-game-demo.gif"
          alt=" grid"
          className="border border-gray-200 rounded-xl dark:border-gray-800"
          onClick={onClick}
        />
      </div>
    </div>
  );
}
