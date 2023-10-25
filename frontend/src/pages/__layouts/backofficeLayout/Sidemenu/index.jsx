import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Sidemenu.module.scss';
import { Expand, Gear, Shop, Stats, Users } from '@/components/lib/Icons';
import ProfileButton from '@/components/ProfileButton';
import NotificationsButton from '../../../../components/NotificationsButton';

function SidemenuLink({ children, to, svgJsx }) {
  return (
    <li className={styles.navMenuItem}>
      <NavLink to={to} className={({ isActive }) => (isActive ? styles.navMenuItemLinkActive : styles.navMenuItemLink)}>
        <span className={styles.navMenuItemLinkSvg}>{svgJsx}</span>
        <span className={styles.navMenuItemLinkText}>{children}</span>
      </NavLink>
    </li>
  );
}
SidemenuLink.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  svgJsx: PropTypes.node,
};

export default function Sidemenu({ ...delegated }) {
  const [ isExpanded, setIsExpanded ] = useState(false);
  return (
    <aside {...delegated}>
      <div className={`${styles.sidemenu} ${isExpanded ? '' : styles.shrinked}`}>
        <button className={styles.expand} onClick={() => setIsExpanded(!isExpanded)}>
          <Expand />
        </button>
        <nav className={styles.nav}>
          <ul className={styles.navMenu}>
            <SidemenuLink to="/backoffice" svgJsx={<Stats />}>
              Statistiques
            </SidemenuLink>
            <SidemenuLink to="/backoffice/employees" svgJsx={<Users />}>
              Employés
            </SidemenuLink>
            <SidemenuLink to="/backoffice/employees" svgJsx={<Shop />}>
              Etablissements
            </SidemenuLink>
          </ul>
        </nav>
        <div className={styles.usermenu}>
          <div className={styles.usermenuList}>
            <NotificationsButton />
            <NavLink to="/settings" className={styles.usermenuItem}>
              <Gear />
            </NavLink>
            <ProfileButton />
          </div>
        </div>
      </div>
    </aside>
  );
}
