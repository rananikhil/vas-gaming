export default function GamePlay({ gameSrc }) {
  return (
    <div className={`aspect-[21/9] overflow-hidden rounded-lg`}>
      <iframe
        src="/games/100metresrace/gamefiles/index.html"
        title="Let's Go!"
        frameBorder="0"
        allow="accelerometer; autoplay; fullscreen;  gamepads; microphone;"
        allowFullScreen
        className="w-full h-full"
      >
          Your browser does not support iframes
      </iframe>
    </div>
  );
}
