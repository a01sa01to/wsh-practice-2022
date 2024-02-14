"use client";

import { useEffect, useState } from "react";

import { formatCloseAt } from "../../client/utils/DateUtils";

export default function CloseAtRealtime({ closeAt }: { closeAt: string }) {
  const [closeAtText, setCloseAtText] = useState(formatCloseAt(closeAt));

  // 締切はリアルタイムで表示したい
  useEffect(() => {
    const timer = setInterval(() => {
      setCloseAtText(formatCloseAt(closeAt));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [closeAt]);

  return <p>{closeAtText}</p>;
}
