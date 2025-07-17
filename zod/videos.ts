import { z } from 'zod'


export const IncomingVideoSchema = z.object({
  title: z.string().min(3),
  tags: z.array(z.string()).optional(),
  thumbnail_url: z.url().optional().default('https://picsum.photos/seed/video49/300/200'),
  duration: z.number().int().nonnegative().optional().default(42),
  views: z.number().int().nonnegative().optional().default(501),
})
export const videoSchema = IncomingVideoSchema.extend({
  id: z.string(),
  created_at: z.string(),
})

export const SearchParamsSchema = z.object({
    search: z.string().optional(),
    tag: z.string().optional(),
    sort: z.enum(['asc', 'desc']).optional().default('asc')
})

export type Video = z.infer<typeof videoSchema>
export type IncomingVideo = z.infer<typeof IncomingVideoSchema>
export type SearchParams = z.infer<typeof SearchParamsSchema>