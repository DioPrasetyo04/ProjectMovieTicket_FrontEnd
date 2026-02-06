import BottomBar from "@/components/BottomBar";
import React from "react";

const OrderDetails = () => {
  return (
    <div
      id="Content-Container"
      className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(90deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white"
    >
      <div className="flex items-center justify-between px-5 mt-[60px]">
        <h1 className="font-bold text-[26px] leading-[39px]">My Tickets</h1>
      </div>
      <section id="New-Movies" className="flex flex-col gap-4 mt-5 px-5">
        <a href="ticket-details-success.html" className="card">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-[14px]">
              <div className="w-[100px] h-[110px] flex shrink-0 rounded-2xl bg-[#D9D9D9] overflow-hidden">
                <img
                  src="/assets/images/thumbnails/th3.png"
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
                <img
                  src="/assets/images/thumbnails/th3.png"
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
                <img
                  src="/assets/images/thumbnails/th3.png"
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col gap-[6px]">
                <h3 className="font-semibold line-clamp-2">
                  Despicable Mines 3
                </h3>
                <div className="flex items-center gap-[6px]">
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/images/icons/video-vertical-grey.svg"
                      className="w-[18px] h-[18px] flex shrink-0"
                      alt="icon"
                    />
                    <img
                      src="/assets/images/icons/video-vertical-grey.svg"
                      className="w-[18px] h-[18px] flex shrink-0"
                      alt="icon"
                    />
                    <img
                      src="/assets/images/icons/video-vertical-grey.svg"
                      className="w-[18px] h-[18px] flex shrink-0"
                      alt="icon"
                    />
                    <p className="text-sm text-premiere-grey">Animation</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/images/icons/location.svg"
                      className="w-[18px] h-[18px] flex shrink-0"
                      alt="icon"
                    />
                    <img
                      src="/assets/images/icons/location.svg"
                      className="w-[18px] h-[18px] flex shrink-0"
                      alt="icon"
                    />
                    <img
                      src="/assets/images/icons/location.svg"
                      className="w-[18px] h-[18px] flex shrink-0"
                      alt="icon"
                    />
                    <p className="text-sm text-premiere-grey">Jakarta</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/images/icons/calendar-2-grey.svg"
                    className="w-[18px] h-[18px] flex shrink-0"
                    alt="icon"
                  />
                  <img
                    src="/assets/images/icons/calendar-2-grey.svg"
                    className="w-[18px] h-[18px] flex shrink-0"
                    alt="icon"
                  />
                  <img
                    src="/assets/images/icons/calendar-2-grey.svg"
                    className="w-[18px] h-[18px] flex shrink-0"
                    alt="icon"
                  />
                  <p className="text-sm text-premiere-grey">
                    11:00, 8 Sep, 2024
                  </p>
                </div>
                <p className="w-fit rounded-full p-[4px_6px] bg-premiere-light-green text-premiere-green font-semibold text-[10px] leading-[15px]">
                  SUCCESS
                </p>
              </div>
            </div>
          </div>
        </a>
      </section>
      <BottomBar activeLink="tickets" />
    </div>
  );
};

export default OrderDetails;
