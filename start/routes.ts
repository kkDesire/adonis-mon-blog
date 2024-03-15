/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home').as('home')
router.get('/register', [AuthController, 'register']).as('auth.register')
router.post('/register', [AuthController, 'handleRegister'])
router.get('/login', [AuthController, 'login']).as('auth.login')
