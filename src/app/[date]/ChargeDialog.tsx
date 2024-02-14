import React, { forwardRef, useCallback, useState } from "react";

import { Dialog } from "../../client/components/layouts/Dialog/Dialog";
import { Spacer } from "../../client/components/layouts/Spacer/Spacer";
import { Stack } from "../../client/components/layouts/Stack/Stack";
import { Heading } from "../../client/components/typographies/Heading/Heading";
import { useMutation } from "../../client/hooks/useMutation";

import type { ZenginCode } from "./zengin";
import { BankName, BranchList, BranchName, ZenginList } from "./zengin";

const CANCEL = "cancel";
const CHARGE = "charge";

interface Props {
  onComplete: () => void;
  zenginData: ZenginCode;
}

/** @type {React.ForwardRefExoticComponent<{Props>} */
export const ChargeDialog = forwardRef<HTMLDialogElement, Props>(
  ({ onComplete, zenginData }, ref) => {
    const [bankCode, setBankCode] = useState("");
    const [branchCode, setBranchCode] = useState("");
    const [accountNo, setAccountNo] = useState("");
    const [amount, setAmount] = useState(0);

    const clearForm = useCallback(() => {
      setBankCode("");
      setBranchCode("");
      setAccountNo("");
      setAmount(0);
    }, []);

    const [charge] = useMutation("/api/users/me/charge", {
      auth: true,
      method: "POST",
    });

    const handleCodeChange = useCallback((e) => {
      setBankCode(e.currentTarget.value);
      setBranchCode("");
    }, []);

    const handleBranchChange = useCallback((e) => {
      setBranchCode(e.currentTarget.value);
    }, []);

    const handleAccountNoChange = useCallback((e) => {
      setAccountNo(e.currentTarget.value);
    }, []);

    const handleAmountChange = useCallback((e) => {
      setAmount(parseInt(e.currentTarget.value, 10));
    }, []);

    const handleCloseDialog = useCallback(
      async (e) => {
        if (e.currentTarget.returnValue === CANCEL) {
          clearForm();
          return;
        }

        await charge({ accountNo, amount, bankCode, branchCode });
        clearForm();
        onComplete();
      },
      [charge, bankCode, branchCode, accountNo, amount, onComplete, clearForm],
    );

    return (
      <Dialog ref={ref} onClose={handleCloseDialog}>
        <section>
          <Heading as="h1">チャージ</Heading>

          <Spacer mt2 />
          <form method="dialog">
            <Stack gap={8}>
              <label>
                銀行コード
                <input
                  list="ChargeDialog-bank-list"
                  onChange={handleCodeChange}
                  value={bankCode}
                />
              </label>

              <ZenginList zenginCode={zenginData} />
              <BankName zenginCode={zenginData} bankCode={bankCode} />

              <label>
                支店コード
                <input
                  list="ChargeDialog-branch-list"
                  onChange={handleBranchChange}
                  value={branchCode}
                />
              </label>

              <BranchList zenginCode={zenginData} bankCode={bankCode} />
              <BranchName
                zenginCode={zenginData}
                bankCode={bankCode}
                branchCode={branchCode}
              />

              <label>
                口座番号
                <input
                  onChange={handleAccountNoChange}
                  type="text"
                  value={accountNo}
                />
              </label>

              <label>
                金額
                <input
                  min={0}
                  onChange={handleAmountChange}
                  type="number"
                  value={amount}
                />
                Yeen
              </label>

              <div>※実在する通貨がチャージされることはありません</div>

              <menu>
                <button value={CANCEL}>キャンセル</button>
                <button value={CHARGE}>チャージ</button>
              </menu>
            </Stack>
          </form>
        </section>
      </Dialog>
    );
  },
);

ChargeDialog.displayName = "ChargeDialog";
