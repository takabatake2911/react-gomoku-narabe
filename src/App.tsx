import React, { useState, useEffect } from 'react';
import Board from './Board';
import styled from 'styled-components';

const RETRY_BUTTON = styled.button`
    font-size: 1rem;
    margin: 0px 50%;
    width: 10rem;
    display: inline-block;
    background-color: #666;
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    padding: 20px;
    cursor: pointer;
    transform: translatex(-50%);
    &:hover {
        border: 1px solid #666;
        background-color: #fff;
        color: #666;
    }
`;

const MESSAGE = styled.h1`
    font-size: 2rem;
    margin: 30px;
    text-align: center;
`;

interface initStateInterface {
    board: number[];
    isNextBlack: boolean;
    isFinished: boolean;
    winner: number;
}

const initState: initStateInterface = {
    board: [...Array(169).fill(0)],
    isNextBlack: true,
    isFinished: false,
    winner: 0,
};

const App = () => {
    const [board, setBoard] = useState(initState.board);
    const [isNextBlack, setIsNextBlack] = useState(initState.isNextBlack);
    const [isFinished, setIsFinished] = useState(initState.isFinished);
    const [winner, setWinner] = useState(initState.winner);

    const judgeGame = (stone: number) => {
        const arr = [];

        // iを開始位置としてゲーム終了かどうかをチェック
        // 右向きに横方向をチェック（→）
        for (let i = 0; i < 165; i++) {
            arr.push([i, i + 1, i + 2, i + 3, i + 4]);
        }

        // 下向きに縦方向をチェック（↓）
        for (let i = 0; i < 117; i++) {
            arr.push([i, i + 13, i + 26, i + 39, i + 52]);
        }

        // 斜め方向を右下に向かってチェック（↘）
        for (let i = 0; i < 113; i++) {
            // 左上が右から4つ以内の位置から始まると、石が５つ並ぶことはない
            if (i % 13 >= 9 && i % 13 <= 12) continue;
            arr.push([i, i + 14, i + 28, i + 42, i + 56]);
        }

        // 斜め方向を左下に向かってチェック（↘）
        for (let i = 4; i < 117; i++) {
            // 右上が左から4つ以内の位置から始まると、石が５つ並ぶことはない
            if (i % 13 >= 0 && i % 13 <= 3) continue;
            arr.push([i, i + 12, i + 24, i + 36, i + 48]);
        }

        arr.forEach((value: number[]) => {
            if (
                board[value[1]] === board[value[2]] &&
                board[value[0]] === board[value[1]] &&
                board[value[2]] === board[value[3]] &&
                board[value[3]] === board[value[4]] &&
                board[value[4]] === stone
            ) {
                setWinner(stone);
                setIsFinished(true);
            }
        });
    };

    useEffect(() => {
        judgeGame(1);
        judgeGame(2);
    });
    const toggleIsNextBlack: () => void = () => {
        setIsNextBlack(!isNextBlack);
    };

    // 石を置くメソッド（１：白石、２：黒石）
    const putStone: (masu: number, stone: number) => void = (
        masu: number,
        stone: number
    ) => {
        const _board = board.slice();
        _board[masu] = stone;
        setBoard(_board);
    };

    const retryGame = () => {
        setIsFinished(false);
        setBoard(initState.board);
    };

    return (
        <div>
            <Board
                putStone={putStone}
                isNextBlack={isNextBlack}
                toggleIsNextBlack={toggleIsNextBlack}
                board={board}
                isFinished={isFinished}
            />
            {isFinished ? (
                <>
                    <MESSAGE>{winner === 1 ? '白' : '黒'}の勝ち</MESSAGE>
                    <RETRY_BUTTON onClick={retryGame}>
                        もう一度あそぶ
                    </RETRY_BUTTON>
                </>
            ) : null}
        </div>
    );
};

export default App;
