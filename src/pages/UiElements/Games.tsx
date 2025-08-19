import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ThreeColumnSnakeGame from "../../components/ui/games/ThreeColumnSnakeGame";
import GamesGrid from "../../components/ui/games/GamesGrid";

export default function Games() {

    interface GameRef {
      img: string,
      path: string
    }

    const games: GameRef[] = [
        { img: "/games/100metresrace/Images/100metresrace_512x512.png", path: "/games/100metresrace/gamefiles/index.html" },
        { img: "/games/1010-puzzle/Images/1010_Puzzle_512x512.png", path: "/games/1010-puzzle/gamefiles/index.html" },
        { img: "/games/2048puzzle/Images/2048puzzle_512x512.png", path: "/games/2048puzzle/gamefiles/index.html" },
        { img: "/games/AliensMemory/Images/Aliens_Memory_512x512.png", path: "/games/AliensMemory/Gamefiles/index.html" },
        { img: "/games/AngryCatShot/Images/AngryCatShot_512x512.png", path: "/games/AngryCatShot/Gamefiles/index.html" },
        { img: "/games/animalcrush/Images/animalcrush_512x512.png", path: "/games/animalcrush/gamefiles/index.html" },
        { img: "/games/AnimalFun/Images/AnimalFun_512x512.png", path: "/games/AnimalFun/Gamefiles/index.html" },
        { img: "/games/animalpuzzle/Images/animalpuzzle_512x512.png", path: "/games/animalpuzzle/gamefiles/index.html" },
        { img: "/games/asteroids/gamefiles/Images/asteroids_512x512.png", path: "/games/asteroids/gamefiles/index.html" },
        { img: "/games/billards/Images/billards_512x512.png", path: "/games/billards/gamefiles/index.html" },
        { img: "/games/Birdify/Images/Birdify_Icon_512x512.png", path: "/games/Birdify/gamefiles/index.html" },
        { img: "/games/block_super_match/Images/block_super_match_512x512.png", path: "/games/block_super_match/gamefiles/index.html" },
        { img: "/games/blocker/icon-256.png", path: "/games/blocker/index.html" },
        { img: "/games/BrickDodge/Images/BrickDodge_512x512.png", path: "/games/BrickDodge/Gamefiles/index.html" },
        { img: "/games/bubble-shooter/Images/bubble_shooter_512x512.png", path: "/games/bubble-shooter/gamefiles/index.html" },
        { img: "/games/bubbletown/Images/bubbletown_512x512.png", path: "/games/bubbletown/gamefiles/index.html" },
        { img: "/games/catandghosts/Images/catandghosts_512x512.png", path: "/games/catandghosts/gamefiles/index.html" },
        { img: "/games/CholiJet/Images/CholiJet_512x512.png", path: "/games/CholiJet/Gamefiles/index.html" },
        { img: "/games/ChristmasBubble/Images/Christmas_Bubble_Icon_512x512.png", path: "/games/ChristmasBubble/gamefiles/index.html" },
        { img: "/games/christmasfurious/Images/christmasfurious_512x512.png", path: "/games/christmasfurious/gamefiles/index.html" },
        { img: "/games/christmasmatch/Images/christmas_match_512x512.png", path: "/games/christmasmatch/gamefiles/index.html" },
        { img: "/games/circles-draw/icon-256.png", path: "/games/circles-draw/index.html" },
        { img: "/games/coloring-book-for-kids/assets/720X320.jpg", path: "/games/coloring-book-for-kids/index.html" },
        { img: "/games/connect4/Images/connect4_512x512.png", path: "/games/connect4/gamefiles/index.html" },
        { img: "/games/crazy-match3/Images/crazy_match3_512x512.png", path: "/games/crazy-match3/gamefiles/index.html" },
        { img: "/games/danger_running/icon-256.png", path: "/games/danger_running/index.html" },
        { img: "/games/SupercarsPuzzle/Images/SupercarsPuzzle_512x512.png", path: "/games/SupercarsPuzzle/Gamefiles/index.html" },
        { img: "/games/FindTheCat/Images/Find_The_Cat_512x512.png", path: "/games/FindTheCat/Gamefiles/index.html" },
        { img: "/games/FindSevenDifferencesKids/Images/Find_Seven_Differences_Kids_512x512.png", path: "/games/FindSevenDifferencesKids/Gamefiles/index.html" },
        { img: "/games/CirclePuzzle/Images/Circle_Puzzle_512x512.png", path: "/games/CirclePuzzle/Gamefiles/index.html" }
    ]

  return (
    <>
      <PageMeta
        title="Games Tab"
        description="Available Games from Portal"
      />
      <PageBreadcrumb pageTitle="Games" />
        <div className="space-y-5 sm:space-y-6">
            <ComponentCard title="Popular Games!">
                <GamesGrid games={games} fullScreen />
            </ComponentCard>
            <ComponentCard title="Evergreen Classic Game!">
                <ThreeColumnSnakeGame />
            </ComponentCard>
        </div>
    </>
  );
}
