import { memo, useContext, useEffect } from 'react';
import styles from './Search.module.scss';
import Map from '@/components/Map';
import EstablishmentCard from '@/components/Search/EstablishmentCard';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import { useLocation } from 'react-router-dom';

export default function Search() {
  const { establishments, get } = useContext(EstablishmentContext);
  const location = useLocation();
  const MemorizedMap = memo(Map);

  const getQueryParams = () => {
    const query = new URLSearchParams(location.search);
    const searchData = {
      name: query.get('name'),
      location: query.get('location'),
      companyId: query.get('companyId'),
      establishmentTypeId: query.get('establishmentTypeId'),
    };
    return searchData;
  };

  useEffect(() => {
    const queryParams = getQueryParams();
    if (queryParams.companyId) {
      get({ 'company.id': queryParams.companyId });
    } else if (queryParams.establishmentTypeId) {
      get({ 'type.id': queryParams.establishmentTypeId });
    } else if (queryParams.location) {
      get({ city: queryParams.location });
    }
  }, []);

  return (
    <div className={styles.Search}>
      <div className={styles.SearchLeft}>
        {establishments.map((establishment) => (
          <EstablishmentCard
            picturePath={(establishment.establishmentPictures[0])?`${import.meta.env.VITE_API_DOMAIN}${establishment.establishmentPictures[0]?.pathPicture}`:null}
            name={establishment.company.name}
            adress={establishment.street}
            city={establishment.city}
            zipCode={establishment.zipCode}
            reviewsNumber={establishment.feedback.length}
            globalReview={establishment.averageNotation}
            key={establishment.id}
            id={establishment.id}
          />
        ))}
      </div>

      <div className={styles.SearchRight}>
        {establishments.length > 0 && (
          <MemorizedMap
            className={styles.SearchMap}
            position={[ +establishments[0].lat, +establishments[0].long ]}
            markers={
              establishments.reduce((acc, { lat, long, city, street }) => {
                acc.push({
                  position: [ +lat, +long ],
                  popup: `${city} ${street}`,
                });
                return acc;
              }, [])
            }
            zoomLevel={7}
          />
        )}
      </div>
    </div>
  );
}
