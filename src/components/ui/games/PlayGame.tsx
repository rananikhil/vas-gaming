import {useLocation} from "react-router";

export default function PlayGame() {

    const location = useLocation();
    let gameLoc = location.state ? location.state.path : '/games/AngryCatShot/Gamefiles/index.html';

    return (
        <div className={`aspect-[8/4] overflow-hidden rounded-lg`}>
          <iframe
            src={gameLoc}
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
