import { useEffect, useState } from "react";

function useDeviceType() {
  const [deviceType, setDeviceType] = useState<string>('')

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 600) {
        setDeviceType('mobile');
      } else if (screenWidth > 600 && screenWidth <= 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [])
  return deviceType;
}
export default useDeviceType;