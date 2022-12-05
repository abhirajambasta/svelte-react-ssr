import React, { useCallback, useEffect } from 'react';

export default () => {
  useEffect(() => {
    console.log("didn't see this coming, right!");
  }, []);

  const clicker = useCallback(() => {
    window.alert("to check my hydration");
  }, []);

  return <>
  <div>hello from react</div>
  <button onClick={clicker}>check if I am hydrated</button>
  </>
}