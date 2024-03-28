/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
const SocialController = () => import('#controllers/social_controller')
const ResetPasswordController = () => import('#controllers/reset_password_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.on('/').render('pages/home').as('home')
router.get('/register', [AuthController, 'register']).as('auth.register').use(middleware.guest())
router.post('/register', [AuthController, 'handleRegister']).use(middleware.guest())
router.get('/login', [AuthController, 'login']).as('auth.login').use(middleware.guest())
router.post('/login', [AuthController, 'handleLogin']).use(middleware.guest())

router
  .get('/forgot-password', [ResetPasswordController, 'forgotPassword'])
  .as('auth.forgot-password')
  .use(middleware.guest())

router
  .post('/forgot-password', [ResetPasswordController, 'handleForgotPassword'])
  .use(middleware.guest())

router
  .get('/reset-password', [ResetPasswordController, 'resetforgotPassword'])
  .as('auth.reset-password')
  .use(middleware.guest())
router
  .post('/reset-password', [ResetPasswordController, 'handleResetforgotPassword'])
  .as('auth.handleReset-password')
  .use(middleware.guest())

router
  .get('/github/redirect', [SocialController, 'githubRedirect'])
  .as('github.redirect')
  .use(middleware.guest())
router
  .get('/github/callback', [SocialController, 'githubCallback'])
  .as('github.callback')
  .use(middleware.guest())

router
  .get('/google/redirect', [SocialController, 'googleRedirect'])
  .use(middleware.guest())
  .as('google.redirect')

router
  .get('/google/callback', [SocialController, 'googleCallback'])
  .use(middleware.guest())
  .as('google.callback')
router.delete('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
