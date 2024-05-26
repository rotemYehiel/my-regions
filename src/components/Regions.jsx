import React from "react";
import {
  Region,
  RegionLabel,
  RegionWrapper,
  RegionsContainer,
  RegionsWrapper,
} from "./Regions.style";

const Regions = ({ regions, imageContainer }) => {
  const containerWidth = imageContainer?.current.offsetWidth;
  const containerHeight = imageContainer?.current.offsetHeight;

  return (
    <RegionsWrapper>
      <RegionsContainer>
        {regions &&
          regions.map((region, index) => {
            const [startX, startY, width, height] = region.points;

            return (
              <RegionWrapper key={region.id}>
                <RegionLabel $startX={startX} $startY={startY}>
                  {region.label}
                </RegionLabel>
                <Region
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
