import GameTile from "./GameTile";

interface GameRef {
    img: string,
    path: string
}

class LayoutProps {
    games: GameRef[] = []
    fullScreen: boolean = false
}

export default function GamesGrid({ games, fullScreen }: LayoutProps) {

    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          { games.map((game) =>
              <GameTile img={game.img} onSmash={game.path} playFullscreen={fullScreen} />)
          }
      </div>
    );
}
