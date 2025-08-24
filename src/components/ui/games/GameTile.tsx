import {useNavigate} from "react-router";

class LayoutProps {
    img: string = ""
    onSmash: string = ""
    playFullscreen: boolean = false
}

export default function GameTile({ img, onSmash, playFullscreen }: LayoutProps) {

    const navigate = useNavigate();

    function playGame(path: string) {
        if (playFullscreen) {
            navigate(path);
            navigate(0);
        } else {
            navigate("/play", {state: {path: path}})
        }
    }

    return (
        <div>
            <img
                src={img}
                alt="grid"
                className="border border-gray-200 rounded-xl dark:border-gray-800"
                onClick={() => playGame(onSmash)}
            />
        </div>
    );
}