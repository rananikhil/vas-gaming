import GameTile from "./GameTile";

export default function GamesGrid({ games }) {

    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          { games.map((game) =>
              <GameTile img={game.img} onSmash={game.path} />)
          }
      </div>
    );
}
