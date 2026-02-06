import z from "zod";

export const filterSchema = z.object({
  genre: z.string().nullable(),
  city: z.string().nullable(),
  availability: z.string().nullable(),
  theaters: z.string().nullable(),
});

export const transactionSchema = z
  .object({
    subtotal: z.number(),
    total: z.number(),
    bookingFee: z.number(),
    tax: z.number(),
    movieId: z.string().min(1, "Movie ID is required"),
    theaterId: z.string().min(1, "Theater ID is required"),
    seats: z.array(z.string()).min(1, "At least one seat is required"),
    // FE kirim STRING ISO
    date: z.string().datetime(),
  })
  .strict();
