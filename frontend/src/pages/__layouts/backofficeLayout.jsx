import PropTypes from 'prop-types';

export default function BackofficeLayout({ children }) {
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
        {children}
      </main>
    </>
  );
}

BackofficeLayout.propTypes = {
  children: PropTypes.node,
};
