import { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  const container = useMemo(() => {
    const element = document.createElement('div');
    element.classList.add('portal-root');

    return element;
  }, []);

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
};

export default Portal;
