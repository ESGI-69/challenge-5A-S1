import { useContext, useEffect } from 'react';
import styles from './Search.module.scss';
import Map from '@/components/Map';
import EstablishmentCard from '@/components/Search/EstablishmentCard';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import { useLocation } from 'react-router-dom';

export default function Search() {
  const { establishments, get } = useContext(EstablishmentContext);
  const location = useLocation();

  const getQueryParams = () => {
    const query = new URLSearchParams(location.search);
    const searchData = {
      name: query.get('name'),
      location: query.get('location'),
      companyId: query.get('companyId'),
    };
    return searchData;
  };

  useEffect(() => {
    const queryParams = getQueryParams();
    if (queryParams.companyId) {
      get({ 'company.id': queryParams.companyId });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.Search}>
      <div className={styles.SearchLeft}>
        {establishments.map((establishment) => (
          <EstablishmentCard
            picturePath="https://picsum.photos/seed/1/534/300"
            name={establishment.company.name}
            adress={establishment.street}
            city={establishment.city}
            zipCode={establishment.zipCode}
            reviewsNumber={2}
            globalReview={3}
            key={establishment.id}
            id={establishment.id}
          />
        ))}
      </div>

      <div className={styles.SearchRight}>
        {establishments.length > 0 && (
          <Map
            className={styles.SearchMap}
            position={[ establishments[0].lat, establishments[0].long ]}
            markers={
              establishments.reduce((acc, { lat, long, city, street }) => {
                acc.push({
                  position: [ lat, long ],
                  popup: `${city} ${street}`,
                });
                return acc;
              }, [])
            }
            zoomLevel={13}
          />
        )}
      </div>
    </div>
  );
}
