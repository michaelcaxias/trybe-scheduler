import React from 'react';

export default function Menu() {
  const generateSquares = () => {
    const squares = [];
    const min = 1;
    const max = 9;
    for (let index = min; index <= max; index += min) {
      squares.push(<div key={ index } className="square" />);
    }
    return squares;
  };

  return <div className="menu">{generateSquares()}</div>;
}
