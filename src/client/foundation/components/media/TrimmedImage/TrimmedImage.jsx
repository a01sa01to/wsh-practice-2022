import React from "react";

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  return <img src={src} style={{ aspectRatio: `${width} / ${height}`, objectFit: "cover" }} width={width} />
};
