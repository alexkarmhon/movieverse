import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <img src={'/vite.svg'} alt="some logo" />
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/about'}>About</Link>
        </li>
        <li>
          <Link to={'/movies'}>Movies</Link>
        </li>
      </ul>
    </header>
  );
};
