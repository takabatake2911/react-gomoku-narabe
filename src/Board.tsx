import React from 'react';
import Masu from './Masu';
import styled from 'styled-components';

const DIV = styled.div`
    font-size: 0;
    margin: 10px auto;
    width: 700px;
    height: 700px;
`;

type Proptypes = {
    putStone: (masu: number, stone: number) => void;
    isNextBlack: boolean;
    toggleIsNextBlack: () => void;
    board: number[];
    isFinished: boolean;
};

const Board = ({
    putStone,
    isNextBlack,
    toggleIsNextBlack,
    board,
    isFinished,
}: Proptypes) => {
    const handleClick = (masu: number) => {
        if (board[masu] !== 0 || isFinished === true) return;
        return () => {
            const stone = isNextBlack ? 1 : 2;
            toggleIsNextBlack();
            putStone(masu, stone);
        };
    };

    return (
        <DIV>
            {board.map((value: number, index: number) => {
                return (
                    <div
                        key={index}
                        onClick={handleClick(index)}
                        style={{ display: 'inline' }}
                    >
                        <Masu stone_color={value} />
                        {index % 13 === 12 ? <br /> : null}
                    </div>
                );
            })}
        </DIV>
    );
};

export default Board;
