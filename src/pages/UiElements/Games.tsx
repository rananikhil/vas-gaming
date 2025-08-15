import {useNavigate} from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ThreeColumnSnakeGame from "../../components/ui/games/ThreeColumnSnakeGame";
import TwoColumnSnakeGame from "../../components/ui/games/TwoColumnSnakeGame";

export default function Games() {

    const navigate = useNavigate();

    const games = [
        { img: "/games/100metresrace/Images/100metresrace_512x512.png", onClick: "/games/100metresrace/gamefiles/index.html" },
        { img: "/games/1010-puzzle/Images/1010_Puzzle_512x512.png", onClick: "/games/1010-puzzle/gamefiles/index.php" },
        { img: "/games/2048puzzle/Images/2048puzzle_512x512.png", onClick: "/games/2048puzzle/gamefiles/index.html" },
        { img: "/games/AliensMemory/Images/Aliens_Memory_512x512.png", onClick: "/games/AliensMemory/Gamefiles/index.html" },
        { img: "/games/AngryCatShot/Images/AngryCatShot_512x512.png", onClick: "/games/AngryCatShot/Gamefiles/index.html" },
        { img: "/games/animalcrush/Images/animalcrush_512x512.png", onClick: "/games/animalcrush/gamefiles/index.html" },
        { img: "/games/AnimalFun/Images/AnimalFun_512x512.png", onClick: "/games/AnimalFun/Gamefiles/index.html" },
        { img: "/games/animalpuzzle/Images/animalpuzzle_512x512.png", onClick: "/games/animalpuzzle/gamefiles/index.html" },
        { img: "/games/asteroids/gamefiles/Images/asteroids_512x512.png", onClick: "/games/asteroids/gamefiles/index.php" },
        { img: "/games/billards/Images/billards_512x512.png", onClick: "/games/billards/gamefiles/index.php" },
        { img: "/games/Birdify/Images/Birdify_Icon_512x512.png", onClick: "/games/Birdify/gamefiles/index.html" },
        { img: "/games/block_super_match/Images/block_super_match_512x512.png", onClick: "/games/block_super_match/gamefiles/index.php" },
        { img: "/games/blocker/icon-256.png", onClick: "/games/blocker/index.php" },
        { img: "/games/BrickDodge/Images/BrickDodge_512x512.png", onClick: "/games/BrickDodge/Gamefiles/index.html" },
        { img: "/games/bubble-shooter/Images/bubble_shooter_512x512.png", onClick: "/games/bubble-shooter/gamefiles/index.php" },
        { img: "/games/bubbletown/Images/bubbletown_512x512.png", onClick: "/games/bubbletown/gamefiles/index.html" },
        { img: "/games/catandghosts/Images/catandghosts_512x512.png", onClick: "/games/catandghosts/gamefiles/index.html" },
        { img: "/games/CholiJet/Images/CholiJet_512x512.png", onClick: "/games/CholiJet/Gamefiles/index.html" },
        { img: "/games/ChristmasBubble/Images/Christmas_Bubble_Icon_512x512.png", onClick: "/games/ChristmasBubble/gamefiles/index.html" },
        { img: "/games/christmasfurious/Images/christmasfurious_512x512.png", onClick: "/games/christmasfurious/gamefiles/index.html" },
        { img: "/games/christmasmatch/Images/christmas_match_512x512.png", onClick: "/games/christmasmatch/gamefiles/index.html" },
        { img: "/games/circles-draw/icon-256.png", onClick: "/games/circles-draw/index.php" },
        { img: "/games/coloring-book-for-kids/assets/720X320.jpg", onClick: "/games/coloring-book-for-kids/index.php" },
        { img: "/games/connect4/Images/connect4_512x512.png", onClick: "/games/connect4/gamefiles/index.php" },
        { img: "/games/crazy-match3/Images/crazy_match3_512x512.png", onClick: "/games/crazy-match3/gamefiles/index.php" },
        { img: "/games/danger_running/icon-256.png", onClick: "/games/danger_running/index.php" }
    ]

    function playGame() {
        navigate('/games/snakegame/index.html');
        navigate(0);
    }

  return (
    <>
      <PageMeta
        title="Games Tab"
        description="Available Games from Portal"
      />
      <PageBreadcrumb pageTitle="Games" />
        <div className="space-y-5 sm:space-y-6">
            <ComponentCard title="Games in 2 Grid">
                <TwoColumnSnakeGame onClick={playGame} />
            </ComponentCard>
            <ComponentCard title="Games in 3 Grid">
                <ThreeColumnSnakeGame onClick={playGame} />
            </ComponentCard>
        </div>
    </>
  );
}
