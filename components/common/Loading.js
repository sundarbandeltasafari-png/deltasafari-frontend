"use client"
import { useLottie } from "lottie-react";
import loading from "../../public/assets/lottiejson/loading-spinner.json";

function Loading() {
  const options = {
    animationData: loading,
    loop: true
  };

  const { View } = useLottie(options);
  return (
    <div>
      {View}
    </div>
  )
}

export default Loading