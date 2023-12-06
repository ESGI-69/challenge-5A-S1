import PropsType from 'prop-types';
import style from './Appointment.module.scss';
import Button from '@/components/lib/Button';
import Shop from '@/components/lib/Icons/Shop';
import DollarBill from '@/components/lib/Icons/DollarBill';
import Chrono from '@/components/lib/Icons/Chrono';
import { useTranslation } from 'react-i18next';

function Appointment({
  date,
  service,
  duration,
  price,
  variant='normal',
  companyName='',
  picturePath='',
  address='',
  zipCode='',
  city='',
}) {
  const { t } = useTranslation('appointments');

  const dayNumberToString = {
    0: t('weekDays.sunday', { ns: 'base' }),
    1: t('weekDays.monday', { ns: 'base' }),
    2: t('weekDays.tuesday', { ns: 'base' }),
    3: t('weekDays.wednesday', { ns: 'base' }),
    4: t('weekDays.thursday', { ns: 'base' }),
    5: t('weekDays.friday', { ns: 'base' }),
    6: t('weekDays.saturday', { ns: 'base' }),
  };

  const monthNumberToString = {
    0: t('months.january', { ns: 'base' }),
    1: t('months.february', { ns: 'base' }),
    2: t('months.march', { ns: 'base' }),
    3: t('months.april', { ns: 'base' }),
    4: t('months.may', { ns: 'base' }),
    5: t('months.june', { ns: 'base' }),
    6: t('months.july', { ns: 'base' }),
    7: t('months.august', { ns: 'base' }),
    8: t('months.september', { ns: 'base' }),
    9: t('months.october', { ns: 'base' }),
    10: t('months.november', { ns: 'base' }),
    11: t('months.december', { ns: 'base' }),
  };

  const tmpDate = new Date(date);
  const day = dayNumberToString[tmpDate.getDay()];
  const month = monthNumberToString[tmpDate.getMonth()];

  return (
    <div className={variant === 'normal' ? style.Appointment : style.AppointmentBig}>
      {variant === 'big' && <img src={picturePath} alt={companyName} className={style.AppointmentPicture} />}
      <div className={style.AppointmentDesc}>
        <div className={style.AppointmentDescDate}>{`${day} ${tmpDate.getDate()} ${month} ${String(tmpDate.getHours()).padStart(2, '0')}:${String(tmpDate.getMinutes()).padStart(2, '0')}`}</div>
        {variant === 'big' && <div className={style.AppointmentDescCompany}>{companyName}</div>}
        <div className={style.AppointmentDescDetail}>
          {variant === 'big' && <div className={style.AppointmentDescAddress}><Shop className={style.AppointmentDescDetailIcon}/>{`${address}, ${zipCode} ${city}`}</div>}
          <div className={style.AppointmentDescService}>{service}</div>
          <div className={style.AppointmentDescLastRow}>
            <span className={style.AppointmentDescLastRowInfo}><Chrono />{duration} min</span>
            <span>•</span>
            <span className={style.AppointmentDescLastRowInfo}><DollarBill/>&nbsp;{price} €</span>
          </div>
        </div>
        <div><Button variant={'black'}>{t('reschedule')}</Button></div>
      </div>
    </div>
  );
}

Appointment.propTypes = {
  date: PropsType.string.isRequired,
  service: PropsType.string.isRequired,
  duration: PropsType.number.isRequired,
  price: PropsType.number.isRequired,
  variant: PropsType.oneOf([ 'normal', 'big' ]),
  companyName: PropsType.string,
  picturePath: PropsType.string,
  address: PropsType.string,
  zipCode: PropsType.string,
  city: PropsType.string,
};

export default Appointment;
