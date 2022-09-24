/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import styled from "styled-components";

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const getRandomCount = (squares: number) => {
  const randomCount: number[] = [];
  for (let i = 0; i < squares; i++) {
    randomCount.push(getRandomInt(0, 25));
  }
  return randomCount;
};

const transformCount = (count: number) => {
  if (count == 0) {
    return 0;
  } else if (count <= 10 && count !== 0) {
    return 1;
  } else if (count > 10 && count <= 15) {
    return 2;
  } else if (count > 15 && count <= 20) {
    return 3;
  } else {
    return 4;
  }
};

const transformPixelsToNumber = (pixel: string) => {
  const exp = /-?\d+/g;
  // @ts-ignore
  return parseInt(exp.exec(pixel.toString())[0]);
};

const DAYS_IN_YEAR = 365;

const DEFAULT_SQUARE_GAP = "4px";

const DEFAULT_SQUARE_SIZE = "15px";

interface IProps {
  /**
   * @description the colour of the squares from lightest to darkest, for each data-level from 0 to 4. remember the prop name is `colour`, not `color`.
   * @default ['#ebedf0', '#c6e48b', '#40c463', '#30a14e', '#216e39']
   */
  colour?: string[];
  /**
   * @description the number of squares to display.
   * @default daysInYear (365)
   * @example 365
   */
  squareNumber?: number;
  /**
   * @description an array of contribution (commit) count for each square.
   * @example [5, 4, 3, 1, 5]
   */
  count: number[];
  /**
   * @description gap between squares.
   * @default 4px
   */
  squareGap?: string;
  /**
   * @description size of squares.
   * @default 15px
   */
  squareSize?: string;
  /**
   * @description size of font on graph (not including tooltip font size).
   * @default 12px
   */
  fontSize?: string;
  /**
   * @description the content to display in the tooltip.
   * @default '${count[i]} contributions on this day'
   */
  tooltipContent?: string;
}

export const Heatmap: React.FC<IProps> = (props: IProps) => {
  // variables
  const colour = props.colour || [
    "#ebedf0",
    "#c6e48b",
    "#40c463",
    "#30a14e",
    "#216e39",
  ];
  const squareNumber: number = props.squareNumber || DAYS_IN_YEAR;
  const count: number[] = props.count || getRandomCount(squareNumber);
  const level: number[] = count.map((i: number) => transformCount(i));
  const squareGap: string = props.squareGap || DEFAULT_SQUARE_GAP;
  const squareSize: string = props.squareSize || DEFAULT_SQUARE_SIZE;
  const fontSize: string = props.fontSize || "12px";
  const weekWidth: string =
    String(
      transformPixelsToNumber(squareGap) + transformPixelsToNumber(squareSize)
    ) + "px";
  // styles (inspired by https://bitsofco.de/github-contribution-graph-css-grid/)
  const Graph = styled.div`
    display: inline-grid;
    grid-template-areas:
      "empty months"
      "days squares";
    grid-template-columns: auto 1fr;
    grid-gap: 10px;
  `;
  const SquaresList = styled.ul`
    margin-top: 0;
    margin-block-start: 0;
    grid-area: squares;
    display: grid;
    grid-gap: ${squareGap};
    grid-template-rows: repeat(7, ${squareSize});
    overflow: auto;
    z-index: 1;
    grid-auto-flow: column;
    grid-auto-columns: ${squareSize};
  `;
  const SquareListItem = styled.li`
    border-radius: 3px;
    border: 1px rgba(27, 31, 35, 0.06) solid;
    background-color: ${colour[0]};
    &[data-level="1"] {
      background-color: ${colour[1]};
    }
    &[data-level="2"] {
      background-color: ${colour[2]};
    }
    &[data-level="3"] {
      background-color: ${colour[3]};
    }
    &[data-level="4"] {
      background-color: ${colour[4]};
    }
    /* tooltip */
    &[data-tooltip] {
      position: relative;
      cursor: pointer;
    }

    &[data-tooltip]:before,
    &[data-tooltip]:after {
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
    }

    &[data-tooltip]:before {
      position: absolute;
      z-index: 999;
      bottom: 150%;
      left: 100%;
      margin-bottom: 5px;
      margin-left: -90px;
      padding: 7px;
      width: 150px;
      border-radius: 3px;
      background-color: #000;
      background-color: hsla(0, 0%, 20%, 0.9);
      color: #fff;
      content: attr(data-tooltip);
      text-align: center;
      font-size: 10px;
      line-height: 1.2;
    }

    &[data-tooltip]:after {
      position: absolute;
      bottom: 150%;
      left: 50%;
      margin-left: -5px;
      width: 0;
      border-top: 5px solid hsla(0, 0%, 20%, 0.9);
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      content: " ";
      font-size: 0;
      line-height: 0;
      z-index: inherit;
    }

    /* show tooltip content on hover */
    &[data-tooltip]:hover:before,
    &[data-tooltip]:hover:after {
      visibility: visible;
      opacity: 1;
    }
  `;
  return (
    <>
      <Graph>
        <SquaresList>
          {[...Array(squareNumber)].map((key: React.Key, i) => (
            <SquareListItem
              className="squares"
              data-level={level[i]}
              key={key}
              data-tooltip={
                props.tooltipContent || `${count[i]} contributions on this day`
              }
            ></SquareListItem>
          ))}
        </SquaresList>
      </Graph>
    </>
  );
};
