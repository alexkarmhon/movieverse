import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <img src={'/cinema-ico.png'} alt="some logo" className={styles.logo} />
      <ul>
        <li>
          <Link to={'/'} className={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link to={'/about'} className={styles.link}>
            About
          </Link>
        </li>
        <li>
          <Link to={'/movies'} className={styles.link}>
            Movies
          </Link>
        </li>
      </ul>
    </header>
  );
};
