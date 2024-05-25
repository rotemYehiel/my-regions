export const SIZES = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
};

export const DEVICES = {
  mobile: `(max-width: ${SIZES.mobile})`,
  // min 480 max 1024
  tablet: `(min-width: ${SIZES.mobile}) and (max-width: ${SIZES.desktop})`,
  desktop: `(min-width: ${SIZES.desktop})`,
};
