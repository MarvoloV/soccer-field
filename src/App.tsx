import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { pitch as pitchSoccer } from "./pitch";

const App = () => {
  const ref = useRef();

  useEffect(() => {
    const h = 250;
    const pitch = pitchSoccer()
      .height(h)
      .clip([
        [0, 0],
        [105, 68],
      ])
      .goals("line")
      .rotate(false)
    const svg = d3.select(ref.current).call(pitch);
  }, []);

  return <div ref={ref} />;
};

export default App;
