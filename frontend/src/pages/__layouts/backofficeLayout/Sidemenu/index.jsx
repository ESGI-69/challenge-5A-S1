import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from './Sidemenu.module.scss';
import { Expand, Gear, Shop, Stats, Users } from '@/components/lib/Icons';
import ProfileButton from '@/components/ProfileButton';
import NotificationsButton from '@/components/NotificationsButton';

function SidemenuLink({ children, to, svgJsx }) {
  return (
    <li className={styles.NavMenuItem}>
      <NavLink to={to} className={({ isActive }) => (isActive ? styles.NavMenuItemLinkActive : styles.NavMenuItemLink)}>
        <span className={styles.NavMenuItemLinkSvg}>{svgJsx}</span>
        <span className={styles.NavMenuItemLinkText}>{children}</span>
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
  const { t } = useTranslation('backofficeSidebar');
  const [ isExpanded, setIsExpanded ] = useState(false);
  return (
    <aside {...delegated}>
      <div className={`${styles.Sidemenu} ${isExpanded ? '' : styles.Shrinked}`}>
        <button className={styles.Expand} onClick={() => setIsExpanded(!isExpanded)}>
          <Expand />
        </button>
        <nav className={styles.Nav}>
          <ul className={styles.NavMenu}>
            <SidemenuLink to="/backoffice/" svgJsx={<Stats />}>
              {t('menu.stats')}
            </SidemenuLink>
            <SidemenuLink to="/backoffice/employees" svgJsx={<Users />}>
              {t('menu.employees')}
            </SidemenuLink>
            <SidemenuLink to="/backoffice/establishments" svgJsx={<Shop />}>
              {t('menu.establishments')}
            </SidemenuLink>
          </ul>
        </nav>
        <div className={styles.Usermenu}>
          <div className={styles.UsermenuList}>
            <NotificationsButton />
            <NavLink to="/settings" className={styles.UsermenuItem}>
              <Gear />
            </NavLink>
            <ProfileButton />
          </div>
        </div>
      </div>
    </aside>
  );
}
