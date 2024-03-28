import { useState } from "react";

export const useConfirm = () => {
  const [isConfirm, setIsConfirm] = useState(false);

  const onConfirm = () => setIsConfirm(true);
  const offConfirm = () => setIsConfirm(false);

  return { isConfirm, onConfirm, offConfirm };
};
