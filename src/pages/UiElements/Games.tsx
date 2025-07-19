import {useNavigate} from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ThreeColumnSnakeGame from "../../components/ui/games/ThreeColumnSnakeGame";
import TwoColumnSnakeGame from "../../components/ui/games/TwoColumnSnakeGame";

export default function Games() {

    const navigate = useNavigate();

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
