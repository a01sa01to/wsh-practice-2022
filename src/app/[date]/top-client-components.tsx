"use client";

import { useCallback, useRef, useState } from "react";

import { Stack } from "../../client/components/layouts/Stack/Stack";
import { useAuthorizedFetch } from "../../client/hooks/useAuthorizedFetch";
import { authorizedJsonFetcher } from "../../client/utils/HttpUtils";

import { ChargeDialog } from "./ChargeDialog";
import style from "./style.module.css";
import type { ZenginCode } from "./zengin";

export const Charger = () => {
  const [zenginData, setZenginData] = useState<ZenginCode | null>(null);

  const { data: userData, revalidate } = useAuthorizedFetch(
    "/api/users/me",
    authorizedJsonFetcher,
  );
  const chargeDialogRef = useRef(null);

  const handleClickChargeButton = useCallback(async () => {
    if (zenginData == null) {
      const res = (await fetch("/api/zengin").then((res) =>
        res.json(),
      )) as ZenginCode;
      setZenginData(res);
    }

    if (chargeDialogRef.current === null) {
      return;
    }
    chargeDialogRef.current.showModal();
  }, [zenginData]);

  const handleCompleteCharge = useCallback(() => {
    revalidate();
  }, [revalidate]);

  return (
    <>
      {userData && (
        <Stack horizontal alignItems="center" justifyContent="space-between">
          <div>
            <p>ポイント残高: {userData.balance}pt</p>
            <p>払戻金: {userData.payoff}Yeen</p>
          </div>

          <button className={style.chargeBtn} onClick={handleClickChargeButton}>
            チャージ
          </button>
        </Stack>
      )}

      <ChargeDialog
        ref={chargeDialogRef}
        onComplete={handleCompleteCharge}
        zenginData={zenginData}
      />
    </>
  );
};
