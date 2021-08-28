import React from 'react';
import styled from 'styled-components';

const DIV = styled.div`
    display: inline-block;
    width: 7.69%;
    height: 7.69%;
    background-color: #e9c9a4;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        display: inline-block;
        width: 100%;
        height: 5%;
        background-color: black;
        transform: translateY(-50%);
    }

    &::after {
        content: '';
        position: absolute;
        left: 50%;
        display: inline-block;
        width: 5%;
        height: 100%;
        background-color: black;
        transform: translateX(-50%);
    }

    &:hover {
        background-color: #aaa;
    }
`;

const WHITE_STONE = styled.div`
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 80%;
    border-radius: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;
    background-color: white;
`;
const BLACK_STONE = styled.div`
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 80%;
    border-radius: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;
    background-color: black;
`;
type Proptypes = {
    stone_color: number;
};

const Masu = ({ stone_color }: Proptypes) => {
    return (
        <DIV>
            {stone_color === 0 ? null : stone_color === 1 ? (
                <WHITE_STONE />
            ) : (
                <BLACK_STONE />
            )}
        </DIV>
    );
};

export default Masu;
