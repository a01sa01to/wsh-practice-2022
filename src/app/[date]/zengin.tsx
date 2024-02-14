"use client";

import style from "./ChargeDialog.module.css";

export type ZenginCode = Record<
  string,
  {
    code: string;
    name: string;
    kana: string;
    hira: string;
    roma: string;
    branches: Record<
      string,
      { code: string; name: string; kana: string; hira: string; roma: string }
    >;
  }
>;

export const ZenginList = ({ zenginCode }: { zenginCode: ZenginCode }) => {
  const bankList =
    zenginCode == null
      ? []
      : Object.entries(zenginCode).map(([code, { name }]) => ({
          code,
          name,
        }));
  return (
    <datalist id="ChargeDialog-bank-list">
      {bankList.map(({ code, name }) => (
        <option key={code} value={code}>{`${name} (${code})`}</option>
      ))}
    </datalist>
  );
};

export const BankName = ({
  zenginCode,
  bankCode,
}: {
  zenginCode: ZenginCode;
  bankCode: string;
}) => {
  const bank = zenginCode == null ? null : zenginCode[bankCode];
  return bank == null ? null : (
    <div className={style.fadein}>銀行名: {bank.name}銀行</div>
  );
};

export const BranchList = ({
  zenginCode,
  bankCode,
}: {
  zenginCode: ZenginCode;
  bankCode: string;
}) => {
  const bank = zenginCode == null ? null : zenginCode[bankCode];
  return (
    <datalist id="ChargeDialog-branch-list">
      {bank != null &&
        Object.values(bank.branches).map((branch) => (
          <option key={branch.code} value={branch.code}>
            {branch.name}
          </option>
        ))}
    </datalist>
  );
};

export const BranchName = ({
  zenginCode,
  bankCode,
  branchCode,
}: {
  zenginCode: ZenginCode;
  bankCode: string;
  branchCode: string;
}) => {
  const bank = zenginCode == null ? null : zenginCode[bankCode];
  const branch = bank?.branches[branchCode];
  return branch == null ? null : (
    <div className={style.fadein}>支店名: {branch.name}</div>
  );
};
