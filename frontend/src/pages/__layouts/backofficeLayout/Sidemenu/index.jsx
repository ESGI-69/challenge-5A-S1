import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from './Sidemenu.module.scss';
import { Expand } from '@/components/lib/Icons';
import { BellIcon, BuildingStorefrontIcon, ChartPieIcon, Cog6ToothIcon, DocumentCheckIcon, UsersIcon } from '@heroicons/react/20/solid';
import ProfileButton from '@/components/ProfileButton';

function SidemenuLink({ children, to, svgJsx }) {
  return (
    <li className={styles.NavMenuItem}>
      <NavLink to={to} className={({ isActive }) => (isActive ? `${styles.NavMenuItemLink} ${styles.NavMenuItemLink_Active}` : styles.NavMenuItemLink)}>
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
            <SidemenuLink to="/backoffice/" svgJsx={<ChartPieIcon />}>
              {t('menu.stats')}
            </SidemenuLink>
            <SidemenuLink to="/backoffice/companies-validation" svgJsx={<DocumentCheckIcon />}>
              {t('menu.companiesValidation')}
            </SidemenuLink>
            <SidemenuLink to="/backoffice/employees" svgJsx={<UsersIcon />}>
              {t('menu.employees')}
            </SidemenuLink>
            <SidemenuLink to="/backoffice/establishments" svgJsx={<BuildingStorefrontIcon />}>
              {t('menu.establishments')}
            </SidemenuLink>
          </ul>
        </nav>
        <div className={styles.Usermenu}>
          <div className={styles.UsermenuList}>
            <BellIcon />
            <NavLink to="/settings" className={styles.UsermenuItem}>
              <Cog6ToothIcon />
            </NavLink>
            <ProfileButton />
          </div>
        </div>
      </div>
    </aside>
  );
}
