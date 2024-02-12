import React from "react";
import styled from "styled-components";

import { Color, FontSize, Space } from "../../../../../styles/variables";

const Wrapper = styled.div`
  align-items: center;
  color: ${Color.mono[400]};
  display: flex;
  font-size: ${FontSize.LARGE};
  font-weight: bold;
  gap: ${Space * 2}px;
  justify-content: center;
  padding: ${Space * 2}px;
`;

/**
 * @typedef Props
 */

/** @type {React.VFC<Props>} */
export const RaceResultSection = () => {
  return (
    <Wrapper>
      <svg height={14} viewBox="0 0 448 512" width={14} xmlns="http://www.w3.org/2000/svg"><path d="M362.1 192c-13.7-21.6-38.8-34-65-30.3V74c0-40.8-32.8-74-73.1-74-40.3 0-73.1 33.2-73.1 74L160 168l-18.7-78.9C126.6 50.8 83.9 32.1 46.2 47.2 8.7 62.2-9.6 105 5 142.9l55.8 144.9c-30.6 25-44 57.8-24.7 92.2l54.9 98C102.6 499 124.7 512 148.6 512h205.7c30.7 0 57.6-21.4 64.6-51.8l27.4-119a67.8 67.8 0 0 0 1.7-15.2L448 256c0-45-43.3-77.3-85.9-64zM400 326c0 1.5-.2 3-.5 4.4l-27.4 119c-2 8.6-9.3 14.6-17.8 14.6H148.6c-6.5 0-12.5-3.6-15.8-9.4l-54.9-98c-4.6-8.1-2.6-18.7 4.5-24.5l26.6-21.8a16 16 0 0 0 4.8-18.1l-64.1-166.5C37.2 93 84.4 74.8 96.5 106.4l59.8 155.4A16 16 0 0 0 171.2 272h11.6c8.8 0 16-7.2 16-16V74c0-34.4 50.3-34.4 50.3 0v182c0 8.8 7.2 16 16 16h6.9c8.8 0 16-7.2 16-16v-28c0-25.1 36.6-25.2 36.6 0v28c0 8.8 7.2 16 16 16h6.9c8.8 0 16-7.2 16-16 0-25.1 36.6-25.2 36.6 0v70z" /></svg>
      <div>結果はまだありません</div>
    </Wrapper>
  );
};
