import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

export default function BackofficeLayout() {
  return (
    <>
      <aside>
        <button>expand</button>
        <nav>
          <ul>
            <li><a href="/test1">Statistiques</a></li>
            <li><a href="/test2">Employés</a></li>
            <li><a href="/test2">Etablissements</a></li>
          </ul>
          <div>
            <button>Notif</button>
            <a href="/settings">Notif</a>
            <button>avatar</button>
          </div>
        </nav>
      </aside>
      <header>
        <h1>Backoffice</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

BackofficeLayout.propTypes = {
  children: PropTypes.node,
};
