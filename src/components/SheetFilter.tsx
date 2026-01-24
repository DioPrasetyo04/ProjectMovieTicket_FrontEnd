import { cn } from "@/lib/utils";
import type { LoaderData } from "@/pages/customer";
import React from "react";
import { useLoaderData } from "react-router-dom";

interface SheetFilterProps {
  onCancel: () => void;
  show: boolean;
  setShow: () => void;
}

const SheetFilter = ({ onCancel, show, setShow }: SheetFilterProps) => {
  const { genres, theaters } = useLoaderData() as LoaderData;
  return (
    <div className="filter-sidebar-container relative w-full">
      <div
        id="Filter-Sidebar"
        className={cn(
          "fixed top-0 flex h-screen w-full max-w-[640px] bg-black/70 z-50 transition-all duration-1000",
          show === true ? "left-auto" : "left-full",
        )}
      >
        <button
          onClick={() => {
            const body = document.getElementsByTagName("body")[0];
            body.classList.toggle("overflow-hidden");
          }}
          className="w-full h-full"
          type="button"
        />
        <div className="flex flex-col w-full h-full max-w-[320px] shrink-0 bg-white overflow-y-scroll">
          <div className="relative flex items-center justify-between px-5 mt-[60px]">
            <button
              className="w-12 h-12 flex shrink-0 items-center justify-center bg-[#0101011A] backdrop-blur-md rounded-full"
              type="button"
              onClick={() => {
                onCancel();

                const body = document.getElementsByTagName("body")[0];
                body.classList.toggle("overflow-hidden");
              }}
            >
              <img
                src="/assets/images/icons/arrow-left.svg"
                className="w-[22px] h-[22px] flex shrink-0 invert"
                alt=""
              />
            </button>
            <p className="text-center mx-auto font-semibold text-sm text-premiere-black">
              Filter Movies
            </p>
            <div className="dummy-button w-12"></div>
          </div>

          <form
            action="browse-genre.html"
            className="flex flex-col gap-[30px] px-5 mt-[30px] mb-[110px]"
          >
            {/* GENRE */}
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-premiere-black">Genre</p>
              {genres.map((genre) => (
                <label key={genre._id} className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    value={genre.name}
                    name={genre.name}
                    className="w-6 h-6 rounded-full appearance-none border border-purple-600 bg-white
                    checked:bg-purple-700 checked:border-4 checked:border-purple-600
                    ring-1 ring-purple-500 transition-all duration-300"
                  />
                  <p className="font-semibold text-premiere-black">
                    {genre.name}
                  </p>
                </label>
              ))}
            </div>

            {/* CITY */}
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-premiere-black">City</p>
              {theaters.map((theater) => (
                <label
                  key={`${theater._id}`}
                  className="flex items-center gap-[10px]"
                >
                  <input
                    type="radio"
                    value={theater.city}
                    name={theater.city}
                    className="w-6 h-6 rounded-full appearance-none border border-purple-600 bg-white
                    checked:bg-purple-700 checked:border-4 checked:border-purple-600
                    ring-1 ring-purple-500 transition-all duration-300"
                  />
                  <p className="font-semibold text-premiere-black">
                    {theater.city}
                  </p>
                </label>
              ))}
            </div>

            {/* THEATER */}
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-premiere-black">Theater</p>

              {theaters.map((theater) => (
                <label
                  key={`${theater._id}`}
                  className="flex items-center gap-[10px]"
                >
                  <input
                    type="radio"
                    value={theater._id}
                    name={theater.name}
                    className="w-6 h-6 rounded-full appearance-none border border-purple-600 bg-white
                    checked:bg-purple-700 checked:border-4 checked:border-purple-600
                    ring-1 ring-purple-500 transition-all duration-300"
                  />
                  <p className="font-semibold text-premiere-black">
                    {theater.name}
                  </p>
                </label>
              ))}
            </div>

            {/* AVAILABILITY */}
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-premiere-black">Availability</p>

              <label className="flex items-center gap-[10px]">
                <input
                  type="radio"
                  value={"1"}
                  className="w-6 h-6 rounded-full appearance-none border border-purple-600 bg-white
                    checked:bg-purple-700 checked:border-4 checked:border-purple-600
                    ring-1 ring-purple-500 transition-all duration-300"
                />
                <p className="font-semibold text-premiere-black">
                  Available Now
                </p>
              </label>

              <label className="flex items-center gap-[10px]">
                <input
                  type="radio"
                  value={"0"}
                  className="w-6 h-6 rounded-full appearance-none border border-purple-600 bg-white
                    checked:bg-purple-700 checked:border-4 checked:border-purple-600
                    ring-1 ring-purple-500 transition-all duration-300"
                />
                <p className="font-semibold text-premiere-black">Coming Soon</p>
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-full p-[12px_18px] bg-[#5236FF] text-white font-bold text-center"
            >
              Show Movies
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SheetFilter;
