/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { pitch as pitchSoccer } from "../utils/pitch";
import { opponentPositions, teamPositions } from "../data/examplePlayers";
import { useScreenSize } from "../hooks/useScreenSize";

export const FieldSoccer = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [heightField, setheightField] = useState(300);
  const {width} = useScreenSize();
  const fetchData = async () => {
    const pitch = pitchSoccer(teamPositions, opponentPositions)
      .height(heightField)
      // @ts-ignore
      .colors("#FF0000", "#001CFF");
    if (ref.current) {
      const svg = d3.select(ref.current).call(pitch);
      svg.selectAll("*").remove();
    }

    d3.select(ref.current).call(pitch);
  };
  useEffect(() => {
    fetchData();
  }, [heightField]);
  useEffect(() => {
      let h:number;
      if(width<500){
        h=400;
      }
      if(width<1200 && width>500){
        h =  width - 400 ;
      }else{
        h=750;
      }
      setheightField(h);
    
  }, [ width]);

  return <div ref={ref} id="field" />;
};

