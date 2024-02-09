import PropTypes from 'prop-types';
import Button from '../lib/Button';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import styles from './FeedbackTypeSelector.module.scss';
import Input from '../lib/Input';

export default function FeedbackTypeSelector(
  {
    feedbackTypes,
    establishmentId,
  },
) {
  const { t } = useTranslation('feedbackType');
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const [ postName, setPostName ] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const onPostSubmit = async (e) => {
    e.preventDefault();
    console.log(postName);
    console.log(establishmentId);
  };

  return (
    <div
      className={styles.FeedbackTypeSelector}
    >
      {feedbackTypes.map((feedbackType) => (
        <p key={feedbackType.id}>
          {feedbackType.name} - {feedbackType.id}
        </p>
      ))}

      <Button
        variant="primary"
        onClick={openModal}
      >
        {t('feedbackType.buttonAdd')}
      </Button>
      <Modal
        className={styles.FeedbackTypeSelectorModal}
        isOpen={modalIsOpen}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            width: '500px',
            height: 'fit-content',
            margin: 'auto',
          },
        }}
      >
        <h2>
          {t('feedbackType.titleAdd')}
        </h2>
        <form
          onSubmit={onPostSubmit}
          className={styles.FeedbackTypeSelectorModalForm}
        >
          <label htmlFor="name">
            {t('feedbackType.labelName')} :
          </label>
          <Input
            type="text"
            placeholder={t('feedbackType.placeHolderName')}
            value={postName}
            onChange={(newValue) => setPostName(newValue)}
          />
          <div className={styles.FeedbackTypeSelectorModalBtns}>
            <Button
              variant="primary"
              type="submit"
            >
              {t('feedbackType.buttonAddConfirm')}
            </Button>
            <Button
              variant="danger"
              onClick={() => setModalIsOpen(false)}
            >
              {t('feedbackType.buttonClose')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

FeedbackTypeSelector.propTypes = {
  feedbackTypes: PropTypes.array,
  establishmentId: PropTypes.string,
};
