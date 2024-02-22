import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const guestNav =  [
  { to : '/', text: 'Login' },
  { to : '/register', text: 'Sign up' },
]

const userNav = [
  { to : '/', text: 'Home' },
  { to : '/new', text: 'New Todo' },
]

export default function Header() {
  const {user, logout} = useAuth()
  const finalNav = user?.id ? userNav : guestNav

  const navigate = useNavigate()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="navbar bg-white border-t-4 border-solid border-black border-b-2 border-solid border-b-gray-300">
      <div className="flex-1 bg-white">
        <Link to={user?.id ? "/" : "/"} className="btn btn-ghost text-3xl text-black">
          Street Win 
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal  font-bold text-sm bg-black text-white py-2 px-4 rounded-[10px]">
          { finalNav.map( el => (
            <li key={el.to} >
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
          { user?.id && (
            <li>
              <Link to='#' onClick={hdlLogout}>Logout</Link>
            </li>
          ) }
        </ul>
      </div>
    </div>
  );
}
