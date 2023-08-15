import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { pitch as pitchSoccer } from "./pitch";

const App = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log("🚀 ~ file: App.tsx:8 ~ App ~ isLoading:", isLoading);
  const fetchData = async () => {
    await d3.json("data/bel_bra.json").then((data: any) => {
      setIsLoading(false);
      console.log("🚀 ~ file: App.tsx:38 ~ awaitd3.json ~ data:", data);
      const h = 400;
      const pitch = pitchSoccer()
        .height(h - 20)
        .clip([
          [0, 0],
          [105, 68],
        ])
        .rotate(false);

      d3.select(ref.current).call(pitch);
    });
  };
  useEffect(() => {
    fetchData();
    return () => {
      setIsLoading(true);
    };
  }, []);

  return !isLoading && <div ref={ref} id="field" />;
};

export default App;
