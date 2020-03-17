import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';


function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    function keyDownHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }

    function keyUpHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    }

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    }
  }, [targetKey]);

  return keyPressed;
}

export default function Modal({ UI }) {
  const history = useHistory();
  const escKey = useKeyPress('Escape');

  const modalClasses = classNames("fixed w-full h-full flex items-center justify-center z-50", {
    'hidden': escKey
  });

  useEffect(() => {
    if (escKey) {
      history.goBack();
    }
  }, [escKey, history]);

  return (
    <div className={modalClasses}>
      <div className="bg-gray-900 absolute opacity-50 w-full h-full"></div>
      <UI history={history} />
    </div>
  )
}
