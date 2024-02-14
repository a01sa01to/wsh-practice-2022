import dayjs from "dayjs";
import React, { Suspense, useCallback, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { Container } from "../../components/layouts/Container";
import { Spacer } from "../../components/layouts/Spacer";
import { Stack } from "../../components/layouts/Stack";
import { Heading } from "../../components/typographies/Heading";
import { useAuthorizedFetch } from "../../hooks/useAuthorizedFetch";
import { useFetch } from "../../hooks/useFetch";
import { isSameDay } from "../../utils/DateUtils";
import { authorizedJsonFetcher, jsonFetcher } from "../../utils/HttpUtils";
import { assets } from "../../utils/UrlUtils";

import { ChargeDialog } from "./internal/ChargeDialog";
import { RecentRaceList } from "./internal/RecentRaceList";
import style from "./style.module.css";

/** @type {React.VFC} */
export const Top = () => {
  const { date = dayjs().format("YYYY-MM-DD") } = useParams();

  const chargeDialogRef = useRef(null);
  const [zenginCode, setZenginCode] = useState(null);

  const { data: userData, revalidate } = useAuthorizedFetch(
    "/api/users/me",
    authorizedJsonFetcher,
  );

  const { data: raceData } = useFetch("/api/races", jsonFetcher);

  const handleClickChargeButton = useCallback(async () => {
    setZenginCode(await fetch("/api/zengin").then((res) => res.json()));

    if (chargeDialogRef.current === null) {
      return;
    }

    chargeDialogRef.current.showModal();
  }, []);

  const handleCompleteCharge = useCallback(() => {
    revalidate();
  }, [revalidate]);

  const todayRaces =
    raceData != null
      ? [...raceData.races]
          .sort(
            (/** @type {Model.Race} */ a, /** @type {Model.Race} */ b) =>
              dayjs(a.startAt) - dayjs(b.startAt),
          )
          .filter((/** @type {Model.Race} */ race) =>
            isSameDay(race.startAt, date),
          )
      : [];
  const heroImageUrl = assets("/images/hero.webp");

  return (
    <Container>
      <img alt="" className={style.hero} src={heroImageUrl} width={2000} />

      <Spacer mt2 />
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

      <Spacer mt2 />
      <section>
        <Heading as="h1">本日のレース</Heading>
        {todayRaces.length > 0 && (
          <div>
            <RecentRaceList>
              {todayRaces.map((race, idx) => (
                <RecentRaceList.Item
                  key={race.id}
                  race={race}
                  style={{ animationDelay: `${idx * 100}ms` }}
                />
              ))}
            </RecentRaceList>
          </div>
        )}
      </section>

      <Suspense fallback={null}>
        <ChargeDialog
          ref={chargeDialogRef}
          onComplete={handleCompleteCharge}
          zenginCode={zenginCode}
        />
      </Suspense>
    </Container>
  );
};
