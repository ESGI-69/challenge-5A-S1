import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from './Sidemenu.module.scss';
import { Expand } from '@/components/lib/Icons';
import {
  BuildingStorefrontIcon,
  ChartPieIcon,
  CursorArrowRippleIcon,
  DocumentCheckIcon,
  FunnelIcon,
  UsersIcon,
} from '@heroicons/react/20/solid';
import { Logout } from '@/components/lib/Icons';
import ProfileButton from '@/components/ProfileButton';
import { useContext } from 'react';
import { ProfileContext } from '@/contexts/ProfileContext';
import { Dropdown, DropdownButton, DropdownList } from '@/components/lib/Dropdown';

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
  const { profile, logout } = useContext(ProfileContext);
  const { t } = useTranslation('backofficeSidebar');
  const [ isExpanded, setIsExpanded ] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <aside {...delegated}>
      <div className={`${styles.Sidemenu} ${isExpanded ? '' : styles.Shrinked}`}>
        <button className={styles.Expand} onClick={() => setIsExpanded(!isExpanded)}>
          <Expand />
        </button>
        { profile && (
          <nav className={styles.Nav}>
            { profile.roles.includes('ROLE_ADMIN') && (
              <ul className={styles.NavMenu}>
                <SidemenuLink to="/backoffice/" svgJsx={<ChartPieIcon />}>
                  {t('menu.stats')}
                </SidemenuLink>
                <SidemenuLink to="/backoffice/companies-validation" svgJsx={<DocumentCheckIcon />}>
                  {t('menu.companiesValidation')}
                </SidemenuLink>
                <SidemenuLink to="/backoffice/feedbacks-type" svgJsx={<FunnelIcon />}>
                  {t('menu.feedbacksType')}
                </SidemenuLink>
              </ul>
            )}
            { profile.roles.includes('ROLE_PRESTA') && (
              <ul className={styles.NavMenu}>
                <SidemenuLink to="/backoffice/" svgJsx={<ChartPieIcon />}>
                  {t('menu.stats')}
                </SidemenuLink>
                <SidemenuLink to="/backoffice/employees" svgJsx={<UsersIcon />}>
                  {t('menu.employees')}
                </SidemenuLink>
                <SidemenuLink to="/backoffice/establishments" svgJsx={<BuildingStorefrontIcon />}>
                  {t('menu.establishments')}
                </SidemenuLink>
              </ul>
            )}
          </nav>
        )}
        <div className={styles.Usermenu}>
          <div className={styles.UsermenuList}>
            {/* <BellIcon /> */}
            {/* <NavLink to="/settings" className={styles.UsermenuItem}>
              <Cog6ToothIcon />
            </NavLink> */}
            <Dropdown direction='tl'>
              <DropdownButton>
                <ProfileButton />
              </DropdownButton>
              <DropdownList>
                <NavLink to='/' className={styles.UsermenuDropdownItem}>
                  <CursorArrowRippleIcon />
                  <span>
                    {t('menu.backToUserLand')}
                  </span>
                </NavLink>
                <DropdownButton className={`${styles.UsermenuDropdownItem} ${styles.UsermenuDropdownItem_Danger}`} onClick={handleLogout}>
                  <Logout />
                  <span>
                    {t('menu.logout')}
                  </span>
                </DropdownButton>
              </DropdownList>
            </Dropdown>
          </div>
        </div>
      </div>
    </aside>
  );
}
