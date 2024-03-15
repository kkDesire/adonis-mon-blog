import User from '#models/user'
import { registerUserValidator } from '#validators/auth'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import { toPng } from 'jdenticon'
import app from '@adonisjs/core/services/app'
import { writeFile } from 'fs/promises'

export default class AuthController {
  register({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async handleRegister({ request, session, response }: HttpContext) {
    const { email, username, password, thumbnail } =
      await request.validateUsing(registerUserValidator)

    if (!thumbnail) {
      const png = toPng(username, 100)
      await writeFile(`public/users${username}.png`, png)
    } else {
      await thumbnail.move(app.makePath('public/users'), { name: `${cuid()}.${thumbnail.extname}` })
    }
    const filePath = `users/${thumbnail?.fileName}`

    await User.create({ email, username, password, thumbnail: filePath })
    session.flash('success', 'Inscription Ok!!')

    return response.redirect().toRoute('home')
  }
  login({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }
}
