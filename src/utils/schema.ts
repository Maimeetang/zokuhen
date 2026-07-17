import * as z from "zod";

const mainPictureSchema = z.object({
  medium: z.url(),
  large: z.url(),
});

const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const studioSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const videoSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.url(),
  created_at: z.number(),
  updated_at: z.number(),
});

export const animeDetailSchema = z.object({
  id: z.number(),
  title: z.string(),
  main_picture: mainPictureSchema.optional(),
  synopsis: z.string().optional(),
  genres: z.array(genreSchema).optional(),
  media_type: z.string().optional(),
  num_episodes: z.number().optional(),
  status: z.string().optional(),
  start_date: z.string().optional(), // "2023-09-29"
  end_date: z.string().optional(),
  studios: z.array(studioSchema).optional(),
  source: z.string().optional(),
  videos: z.array(videoSchema).optional(),
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

export const anilistMediaResponseSchema = z.object({
  data: z.object({
    Media: z
      .object({
        id: z.number(),
      })
      .nullable(),
  }),
});

export type AnilistMediaResponse = z.infer<typeof anilistMediaResponseSchema>;

export const relatedAnimeItemSchema = z.object({
  node: animeDetailSchema.pick({
    id: true,
    title: true,
    main_picture: true,
  }),
  relation_type: z.enum([
    "adaptation",
    "prequel",
    "sequel",
    "parent_story",
    "side_story",
    "character",
    "summary",
    "alternative_version",
    "spin_off",
    "other",
    "alternative_setting",
    "full_story",
  ]),
  relation_type_formatted: z.string(),
});

export const animeFullSchema = animeDetailSchema.extend({
  related_anime: z.array(relatedAnimeItemSchema).optional(),
});

export const animeWithRelationsResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  main_picture: mainPictureSchema.optional(),
  related_anime: z.array(relatedAnimeItemSchema),
});

export type RelatedAnimeItem = z.infer<typeof relatedAnimeItemSchema>;
export type AnimeFull = z.infer<typeof animeFullSchema>;
export type AnimeWithRelationsResponse = z.infer<
  typeof animeWithRelationsResponseSchema
>;
