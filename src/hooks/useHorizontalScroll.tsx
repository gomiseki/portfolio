import React, { useRef, useEffect } from 'react';

export default function useHorizontalScroll() {
  const elRef = useRef<any>();
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e:React.WheelEvent<any>) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: 'smooth',
        });
      };
      const onClick = (e:React.MouseEvent<any> & {target:{offsetParent:any, offsetLeft:any}}) => {
        e.preventDefault();
        const offset = e.target.offsetLeft < 100
          ? e.target.offsetParent.offsetLeft
          : e.target.offsetLeft;
        el.scrollTo({
          left: 150 * (Math.floor(offset / 150)) - 450,
          behavior: 'smooth',
        });
      };
      el.addEventListener('wheel', onWheel);
      el.addEventListener('click', onClick);
      return () => {
        el.removeEventListener('wheel', onWheel);
        el.removeEventListener('click', onClick);
      };
    }
  }, []);
  return elRef;
}
