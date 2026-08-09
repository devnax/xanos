import { useBreakpoint } from "@xanui/core";

const useMobile = () => {
   const bp = useBreakpoint();
   return bp.isDown('sm');
}

export default useMobile;