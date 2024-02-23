import React, { useEffect, useState } from 'react';
import styles from './resolutionMessage.module.css';
import logobacklogin from '../../assets/logobacklogin.svg';

const ResolutionMessage = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobileResolution = windowSize.width < 768;

  return (
    <div className={styles.main}>
      {/* <img src={logobacklogin} alt='computech logo' /> */}
      <div className={styles.message}>
        {isMobileResolution ? (
          <p>Mobile devices are not supported, please switch to a larger device for optimal functionality.</p>
        ) : null}
      </div>
    </div>
  );
};

export default ResolutionMessage;
