import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { pitch as pitchSoccer } from "./pitch";
import { PlayerInformation } from "./interfaces/PlayerInformation";
import { opponentPositions, teamPositions } from "./data/examplePlayers";

const App = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchData = async () => {
    setIsLoading(false);
      const h = 600;
      const pitch = pitchSoccer(teamPositions,opponentPositions).height(h).colors("#FF0000","#001CFF");

      d3.select(ref.current).call(pitch);
  };
  useEffect(() => {
    fetchData();
    return () => {
      setIsLoading(true);
    };
  }, []);

  return <div ref={ref} id="field" />;
};

export default App;
