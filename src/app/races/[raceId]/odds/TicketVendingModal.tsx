import React, { forwardRef, useCallback, useEffect, useState } from "react";

import { EntryCombination } from "../../../../client/components/displays/EntryCombination/EntryCombination";
import { Dialog } from "../../../../client/components/layouts/Dialog/Dialog";
import { Spacer } from "../../../../client/components/layouts/Spacer/Spacer";
import { Stack } from "../../../../client/components/layouts/Stack/Stack";
import { Heading } from "../../../../client/components/typographies/Heading/Heading";
import { useAuth } from "../../../../client/context/AuthContext";
import { useAuthorizedFetch } from "../../../../client/hooks/useAuthorizedFetch";
import { useMutation } from "../../../../client/hooks/useMutation";
import { authorizedJsonFetcher } from "../../../../client/utils/HttpUtils";

import style from "./vending.module.css";

const CANCEL = "cancel";
const BUY = "buy";

interface Props {
  raceId: string;
  odds: number[];
}

export const TicketVendingModal = forwardRef<HTMLDialogElement, Props>(
  ({ odds, raceId }, ref) => {
    const { loggedIn } = useAuth();
    const [buyTicket, buyTicketResult] = useMutation(
      `/api/races/${raceId}/betting-tickets`,
      {
        auth: true,
        method: "POST",
      },
    );
    const { data: userData, revalidate } = useAuthorizedFetch(
      "/api/users/me",
      authorizedJsonFetcher,
    );
    const [error, setError] = useState(null);

    const handleCloseDialog = useCallback(
      async (e) => {
        setError("");

        if (e.currentTarget.returnValue === CANCEL) {
          return;
        }

        await buyTicket({
          key: odds,
          type: "trifecta",
        });
      },
      [odds, buyTicket],
    );

    useEffect(() => {
      if (buyTicketResult === null || buyTicketResult.loading === true) {
        return;
      }

      const err = buyTicketResult.error;

      if (err === null) {
        revalidate();
        return;
      }

      ref.current?.showModal();

      if (err.status === 412) {
        setError("残高が不足しています");
        return;
      }

      setError(err.statusText);
      console.error(err);
    }, [buyTicketResult, revalidate, ref]);

    const shouldShowForm = loggedIn && userData !== null && odds !== null;

    return (
      <Dialog ref={ref} onClose={handleCloseDialog}>
        <Heading as="h1">拳券の購入</Heading>

        <Spacer mt2 />

        <form method="dialog">
          <Stack gap={8}>
            {!shouldShowForm ? (
              <>
                <p className={style.error}>購入するにはログインしてください</p>
                <menu>
                  <button value={CANCEL}>閉じる</button>
                </menu>
              </>
            ) : (
              <>
                <div>
                  <Stack horizontal>
                    購入する買い目: <EntryCombination numbers={odds} />
                  </Stack>
                </div>
                <div>使用ポイント: 100pt</div>
                <div>所持しているポイント: {userData.balance}pt</div>
                <div>購入後に残るポイント: {userData.balance - 100}pt</div>
                {error && <p className={style.error}>{error}</p>}
                <menu>
                  <button value={CANCEL}>キャンセル</button>
                  <button value={BUY}>購入する</button>
                </menu>
              </>
            )}
          </Stack>
        </form>
      </Dialog>
    );
  },
);

TicketVendingModal.displayName = "TicketVendingModal";
