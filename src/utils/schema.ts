import * as z from "zod";

const mainPictureSchema = z.object({
  medium: z.url(),
  large: z.url(),
});

const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const animeDetailSchema = z.object({
  id: z.number(),
  title: z.string(),
  main_picture: mainPictureSchema.optional(),
  synopsis: z.string().optional(),
  genres: z.array(genreSchema),
});

const rankingSchema = z.object({
  rank: z.number(),
});

export const animeListItemSchema = z.object({
  node: animeDetailSchema,
  ranking: rankingSchema.optional(),
});

export const pagingSchema = z.object({
  next: z.url().optional(),
  previous: z.url().optional(),
});

export const animeListResponseSchema = z.object({
  data: z.array(animeListItemSchema),
  paging: pagingSchema,
});

export type AnimeDetail = z.infer<typeof animeDetailSchema>;
export type AnimeListItem = z.infer<typeof animeListItemSchema>;
export type AnimeListResponse = z.infer<typeof animeListResponseSchema>;

export type Paging = z.infer<typeof pagingSchema>;
