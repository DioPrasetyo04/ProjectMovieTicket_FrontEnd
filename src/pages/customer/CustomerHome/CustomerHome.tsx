import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.css";
import { getSession } from "@/lib/utils";
import BottomBar from "@/components/BottomBar";
import type {
  GenreCustomer,
  MovieCustomer,
} from "@/services/global/global.type";
import { Link, useLoaderData } from "react-router-dom";

type LoaderData = {
  movies: MovieCustomer[];
  genres: Pick<GenreCustomer, "_id" | "name">[];
};

const CustomerHome = () => {
  const session = getSession();

  const { genres, movies } = useLoaderData() as LoaderData;
  return (
    <div
      id="Content-Container"
      className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(90deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white"
    >
      <div
        id="Header"
        className="flex items-center justify-between px-5 mt-[60px]"
      >
        <div className="flex items-center gap-[14px] mr-3">
          <div className="w-[60px] h-[60px] flex shrink-0 rounded-full overflow-hidden">
            <img
              src={session?.photoUrl}
              className="w-full h-full object-cover"
              alt="avatar"
            />
          </div>
          <div>
            <p className="text-sm">{session?.email}</p>
            <p className="font-semibold">{session?.name}</p>
          </div>
        </div>
        <button type="button">
          <img
            src="/assets/images/icons/notification-bell.svg"
            className="w-12 h-12 flex shrink-0"
            alt="icon"
          />
        </button>
      </div>
      <div className="swiper-recommendations w-full overflow-hidden p-5 m-2">
        <Swiper
          spaceBetween={15}
          slidesPerView={"auto"}
          slidesOffsetBefore={20}
          slidesOffsetAfter={20}
          className="swiper-wrapper space-x-5"
        >
          {movies.map((movie) => (
            <SwiperSlide className="swiper-slide !w-fit">
              <Link
                key={`${movie._id}`}
                to={`/movie/${movie.slug}`}
                className="card"
              >
                <div className="relative flex w-[300px] h-[200px] shrink-0 rounded-3xl bg-[#D9D9D9] overflow-hidden">
                  <img
                    src={movie.thumbnailUrl}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute flex w-12 h-12 shrink-0 rounded-full bg-[#FFFFFF66] backdrop-blur-sm overflow-hidden m-auto transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-10">
                    <img
                      src="/assets/images/icons/video-circle.svg"
                      className="w-8 h-8 m-auto"
                      alt="icon"
                    />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <form
        action="#"
        className="flex items-center gap-[10px] rounded-full py-[2px] pl-5 h-fit bg-[#FFFFFF1A] backdrop-blur-sm placeholder:text-white focus-within::ring-1 focus-within::ring-white transition-all duration-300 overflow-hidden mx-5 mt-5"
      >
        <input
          type="text"
          className="appearance-none outline-none bg-transparent h-full w-full font-semibold placeholder:font-normal placeholder:text-white"
          placeholder="Search movie by name"
        />
        <button type="submit" className="w-12 h-12 flex shrink-0">
          <img src="/assets/images/icons/search-white-bg.svg" alt="icon" />
        </button>
      </form>
      <section id="Genre" className="flex flex-col gap-[10px] m-5">
        <h2 className="font-semibold px-5">Browse Genre</h2>
        <div className="swiper-genre w-full overflow-hidden">
          <Swiper
            spaceBetween={15}
            slidesPerView={"auto"}
            slidesOffsetBefore={20}
            slidesOffsetAfter={20}
            className="swiper-wrapper"
          >
            {genres.map((genre: any) => (
              <SwiperSlide className="swiper-slide !w-fit py-[1px]">
                <Link
                  key={`${genre._id}`}
                  to={`/browse/${genre._id}`}
                  className="card"
                >
                  <div className="flex rounded-full p-[12px_14px] bg-[#FFFFFF1A] font-semibold text-sm hover:ring-1 hover:ring-white transition-all duration-300 hover:bg-white hover:text-black transform">
                    {genre.name}
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section id="New-Movies" className="flex flex-col gap-4 mt-5 px-5">
        <h2 className="font-semibold">All New Movies</h2>
        {movies.map((movie) => (
          <Link
            key={`${movie._id}`}
            to={`/movie/${movie.slug}`}
            className="card"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-[14px]">
                <div className="w-[100px] h-[110px] flex shrink-0 rounded-2xl bg-[#D9D9D9] overflow-hidden">
                  <img
                    src={movie.thumbnailUrl}
                    className="w-full h-full object-cover"
                    alt="thumbnail"
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <h3 className="font-semibold line-clamp-2">{movie.title}</h3>
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/images/icons/video-vertical-grey.svg"
                      className="w-[18px] h-[18px] flex shrink-0"
                      alt="icon"
                    />
                    <p className="text-sm text-premiere-grey">
                      {movie.genre.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/images/icons/location.svg"
                      className="w-[18px] h-[18px] flex shrink-0"
                      alt="icon"
                    />
                    <p className="text-sm text-premiere-grey">
                      {movie.theaters.map((theater) => theater.city)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-[2px] rounded-full p-[8px_10px] bg-[#FFFFFF1A]">
                <p className="font-semibold text-xs leading-[18px]">4/5</p>
                <img
                  src="/assets/images/icons/Star 1.svg"
                  className="w-4 h-4 flex shrink-0"
                  alt="star"
                />
              </div>
            </div>
          </Link>
        ))}
      </section>
      <section id="Coming-Soon" className="flex flex-col gap-4 m-5">
        <h2 className="font-semibold px-5">Coming Soon</h2>
        <div className="swiper-coming w-full overflow-hidden">
          <Swiper
            className="swiper-wrapper"
            spaceBetween={10}
            slidesPerView={"auto"}
            slidesOffsetBefore={20}
            slidesOffsetAfter={20}
          >
            {movies.map((movie) => (
              <SwiperSlide className="swiper-slide !w-fit">
                <Link to={`/movie/${movie.slug}`} className="card">
                  <div className="relative flex w-[240px] h-[300px] shrink-0 rounded-3xl bg-[#D9D9D9] overflow-hidden">
                    <img
                      src={movie.thumbnailUrl}
                      className="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                    <div className="absolute w-full bottom-0 p-[14px] z-10">
                      <div className="flex items-center w-full rounded-[20px] p-[14px] gap-3 bg-[#FFFFFF33] backdrop-blur-md verflow-hidden">
                        <img
                          src="/assets/images/icons/video-vertical-white.svg"
                          className="w-8 h-8 flex shrink-0"
                          alt="icon"
                        />
                        <div className="flex flex-col gap-[2px]">
                          <p className="text-sm">{movie.genre.name}</p>
                          <h3 className="font-semibold">{movie.title}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <BottomBar activeLink="discover"></BottomBar>
    </div>
  );
};

export default CustomerHome;
