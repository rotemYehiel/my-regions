import React from "react";
import {
  Region,
  RegionLabel,
  RegionWrapper,
  RegionsContainer,
  RegionsWrapper,
} from "./Regions.style";

const Regions = ({ regions }) => {
  return (
    <RegionsWrapper>
      <RegionsContainer>
        {regions &&
          regions.map((region, index) => {
            const [startX, startY, width, height] = region.points;

            if (index > 0) return;
            console.log(region.points);

            return (
              <RegionWrapper key={region.id}>
                <RegionLabel $startX={startX} $startY={startY}>
                  {region.label}
                </RegionLabel>
                <Region
                  className="region"
                  $startX={startX}
                  $startY={startY}
                  $width={width}
                  $height={height}
                />
              </RegionWrapper>
            );
          })}
      </RegionsContainer>
    </RegionsWrapper>
  );
};

export default Regions;
