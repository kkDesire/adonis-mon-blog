import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const registerUserValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .minLength(4)
      .alphaNumeric()
      .unique(async (db, value) => {
        const user = await db.from('users').where('username', value).first()
        return !user
      }),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(8),
    thumbnail: vine.file({ extnames: ['jpg', 'png'], size: '10mb' }).optional(),
  })
)
