import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import styles from './Map.module.scss';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import Button from '../lib/Button';
import { useTranslation } from 'react-i18next';

const Map = React.forwardRef(function Map(
  { position, zoomLevel, markers, ...delegated },
  ref,
) {
  const { t } = useTranslation('base');
  return (
    <MapContainer
      center={position}
      zoom={zoomLevel}
      scrollWheelZoom={false}
      className={styles.Map}
      ref={ref}
      {...delegated}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>{marker.popup}<Button to={`/establishment/${marker.id}`}>{t('seePage')}</Button></Popup>
        </Marker>
      ))}

    </MapContainer>
  );
});

Map.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoomLevel: PropTypes.number.isRequired,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.arrayOf(PropTypes.number).isRequired,
      popup: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Map;
