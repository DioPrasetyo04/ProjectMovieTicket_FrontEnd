import React, { useCallback, useState } from "react";

import "../../../customer.css";
import type { LoaderData } from ".";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { cn, rupiahFormat } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { checkSeats } from "@/services/global/global.service";
import {
  setMovieDetail,
  setStep,
  setTicketDetail,
} from "@/redux/features/ticket/ticketSlice";

const SelectedSeat = () => {
  const dispatch = useAppDispatch();

  const { detail } = useLoaderData() as LoaderData;

  // ✅ ambil theater yang dipilih (hasil step sebelumnya)
  const detailTicket = useAppSelector((state) => state.ticket.detail);

  const selectedTheater = detailTicket?.theater;
  const layout = selectedTheater?.layout;

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const { isLoading, data } = useQuery({
    queryKey: ["selected-seats", detail._id, detailTicket?.time],
    queryFn: () => checkSeats(detail._id, detailTicket?.time ?? ""),
  });

  const navigate = useNavigate();

  const isBooked = useCallback(
    (seat: string) => {
      if (isLoading) return false;

      const seatBooked = data?.data.find((val: any) => val.seat === seat);

      return !!seatBooked;
    },
    [data?.data, isLoading],
  );

  const handleSelectSeat = (seat: string) => {
    if (isBooked(seat)) {
      return;
    }

    if (selectedSeats.find((value) => value === seat)) {
      const updatedSeats = selectedSeats.filter((value) => value !== seat);
      setSelectedSeats(updatedSeats);

      return;
    }

    setSelectedSeats((prev) => [...prev, seat]);
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat first");
      return;
    }

    dispatch(
      setTicketDetail({
        seat: selectedSeats,
      }),
    );

    dispatch(setMovieDetail(detail));

    navigate("/transaction-ticket");
  };

  return (
    <div
      id="Content-Container"
      className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(179.86deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white"
    >
      <div id="Header" className="relative flex flex-col h-[257px] gap-5">
        <div id="screen-container" className="absolute bottom-0 w-full z-0">
          <img
            src="/assets/images/backgrounds/screen-light.svg"
            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-[70%] left-1/2"
            alt="image"
          />
          <div id="Screen" className="relative flex h-[197px] overflow-hidden">
            <img
              src="/assets/images/thumbnails/th3.png"
              className="w-full h-full object-cover"
              alt="image"
            />
          </div>
          <p className="font-semibold text-sm w-fit transform -translate-x-1/2 -translate-y-1/2 absolute bottom-8 left-1/2">
            SCREEN
          </p>
        </div>
        <div
          id="Top-Nav"
          className="relative flex items-center justify-between px-5 mt-[60px]"
        >
          <button
            type="button"
            onClick={() =>
              dispatch(
                setStep({
                  step: "TIME",
                }),
              )
            }
            className="w-12 h-12 flex shrink-0 items-center justify-center bg-[#FFFFFF1A] backdrop-blur-md rounded-full"
          >
            <img
              src="/assets/images/icons/arrow-left.svg"
              className="w-[22px] h-[22px] flex shrink-0"
              alt=""
            />
          </button>
          <p className="text-center mx-auto font-semibold text-sm">
            Choose Your Seats
          </p>
          <div className="dummy-button w-12"></div>
        </div>
      </div>
      <form action="tickets-payment.html" className="relative px-5 mt-5">
        {!isLoading && (
          <div
            id="Seats-Options"
            className="grid grid-cols-5 w-full max-w-[280px] mx-auto gap-x-[20px] gap-y-[30px]"
          >
            {layout?.seats.map((seat) => (
              <div key={seat._id}>
                <button
                  type="button"
                  onClick={() => handleSelectSeat(seat.seat_number)}
                  className={cn(
                    "group relative flex w-10 h-[38px] shrink-0 transition-all duration-300",
                    isBooked(seat.seat_number)
                      ? "grayscale opacity-50 cursor-not-allowed"
                      : "cursor-pointer",
                  )}
                >
                  <input
                    type="checkbox"
                    name="seat"
                    className="seat-checkbox absolute top-1/2 left-1/2 opacity-0"
                    disabled={isBooked(seat.seat_number)}
                  />
                  <img
                    src="/assets/images/icons/seat.svg"
                    className={cn(
                      "absolute w-full h-full object-contain opacity-100 group-has-checked:opacity-0 transition-all duration-300",
                      selectedSeats.includes(seat.seat_number)
                        ? "opacity-0"
                        : "",
                    )}
                    alt="seat"
                  />
                  <img
                    src="/assets/images/icons/seat-choosed.svg"
                    className={cn(
                      "absolute w-full h-full object-contain opacity-0 group-has-checked:opacity-100 transition-all duration-300",
                      selectedSeats.includes(seat.seat_number)
                        ? "opacity-100"
                        : "",
                    )}
                    alt="seat"
                  />
                  <p
                    className={cn(
                      "relative flex items-center justify-center h-full w-full pb-[6px] font-semibold text-xs leading-[18px] text-premiere-black group-has-[:checked]:text-white",
                      selectedSeats.includes(seat.seat_number)
                        ? "text-white"
                        : "",
                    )}
                  >
                    {seat.seat_number}
                  </p>
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center justify-center mt-[30px] gap-5">
          <div className="flex items-center gap-[6px]">
            <span className="w-4 h-4 flex shrink-0 rounded-[6px] bg-white"></span>
            <span className="font-semibold text-xs leading-[18px]">
              Available
            </span>
          </div>
          <div className="flex items-center gap-[6px]">
            <span className="w-4 h-4 flex shrink-0 rounded-[6px] bg-white brightness-50"></span>
            <span className="font-semibold text-xs leading-[18px]">Booked</span>
          </div>
          <div className="flex items-center gap-[6px]">
            <span className="w-4 h-4 flex shrink-0 rounded-[6px] bg-purple-600"></span>
            <span className="font-semibold text-xs leading-[18px]">
              Selected
            </span>
          </div>
        </div>
        <div
          id="Bottom-Nav"
          className="relative w-full h-[123px] flex shrink-0"
        >
          <div className="fixed bottom-5 left-5 right-5 w-full max-w-[330px] mx-auto flex items-center justify-between rounded-full p-[10px_14px] pl-6 gap-[14px] bg-[#FFFFFF33] z-20 backdrop-blur-md">
            <div>
              <p id="price" className="font-semibold text-xl leading-[30px]">
                {rupiahFormat(detail.price * selectedSeats.length)}
              </p>
              <span id="person" className="font-normal text-sm mt-[2px]">
                {selectedSeats.length} orang
              </span>
            </div>
            <button
              type="button"
              onClick={handleContinue}
              className="rounded-full p-[12px_18px] bg-white font-bold text-premiere-black"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SelectedSeat;
