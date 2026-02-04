import type { MovieDetail } from "@/services/global/global.type";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import DetailMovie from "./DetailMovie";
import { useAppSelector } from "@/redux/hooks";
import SelectedTheater from "./SelectedTheater";
import SelectedTime from "./SelectedTime";
import SelectedSeat from "./SelectedSeat";

export type LoaderData = {
  detail: MovieDetail;
};

const CustomerDetailMovie = () => {
  // useAppSelector digunakan untuk mengambil data dari redux store
  const { step } = useAppSelector((state) => state.ticket);
  return (
    <>
      {/* reusable component tab view */}
      {step === "DETAIL" && <DetailMovie />}
      {step === "THEATER" && <SelectedTheater />}
      {step === "TIME" && <SelectedTime />}
      {step === "SEAT" && <SelectedSeat />}
    </>
  );
};

export default CustomerDetailMovie;
