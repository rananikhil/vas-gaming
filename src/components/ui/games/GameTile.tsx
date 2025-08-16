import {useNavigate} from "react-router";

export default function GameTile({ img, onSmash }) {

    const navigate = useNavigate();

    function playGame(path: string) {
        navigate(path);
        navigate(0);
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