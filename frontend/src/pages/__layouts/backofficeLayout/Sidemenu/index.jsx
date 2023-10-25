import { NavLink } from 'react-router-dom';
import styles from './Sidemenu.module.scss';

export default function Sidemenu({ ...delegated }) {
  return (
    <aside {...delegated}>
      <div className={styles.sidemenu}>
        <button className={styles.expand}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H24C24.5304 2 25.0391 2.21071 25.4142 2.58579C25.7893 2.96086 26 3.46957 26 4V24C26 24.5304 25.7893 25.0391 25.4142 25.4142C25.0391 25.7893 24.5304 26 24 26H4C3.46957 26 2.96086 25.7893 2.58579 25.4142C2.21071 25.0391 2 24.5304 2 24V4Z" stroke="#272727" strokeWidth="3" strokeLinejoin="round" />
            <path d="M19.3334 2V26M8.66675 11.3333L11.3334 14L8.66675 16.6667M15.3334 2H23.3334M15.3334 26H23.3334" stroke="#272727" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <nav className={styles.nav}>
          <ul className={styles.navMenu}>
            <li className={styles.navMenuItem}>
              <NavLink to="/backoffice" className={({ isActive }) => (isActive ? styles.navMenuItemLinkActive : styles.navMenuItemLink)}>
                <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 30H1.5C1.10218 30 0.720644 29.842 0.43934 29.5607C0.158035 29.2794 0 28.8978 0 28.5V19.5C0 19.1022 0.158035 18.7206 0.43934 18.4393C0.720644 18.158 1.10218 18 1.5 18H3.5C3.89782 18 4.27936 18.158 4.56066 18.4393C4.84196 18.7206 5 19.1022 5 19.5V28.5C5 28.8978 4.84196 29.2794 4.56066 29.5607C4.27936 29.842 3.89782 30 3.5 30ZM17.5 30H15.5C15.1022 30 14.7206 29.842 14.4393 29.5607C14.158 29.2794 14 28.8978 14 28.5V13.5C14 13.1022 14.158 12.7206 14.4393 12.4393C14.7206 12.158 15.1022 12 15.5 12H17.5C17.8978 12 18.2794 12.158 18.5607 12.4393C18.842 12.7206 19 13.1022 19 13.5V28.5C19 28.8978 18.842 29.2794 18.5607 29.5607C18.2794 29.842 17.8978 30 17.5 30ZM24.5 30H22.5C22.1022 30 21.7206 29.842 21.4393 29.5607C21.158 29.2794 21 28.8978 21 28.5V6.5C21 6.10218 21.158 5.72064 21.4393 5.43934C21.7206 5.15804 22.1022 5 22.5 5H24.5C24.8978 5 25.2794 5.15804 25.5607 5.43934C25.842 5.72064 26 6.10218 26 6.5V28.5C26 28.8978 25.842 29.2794 25.5607 29.5607C25.2794 29.842 24.8978 30 24.5 30ZM10.5 30H8.5C8.10218 30 7.72064 29.842 7.43934 29.5607C7.15804 29.2794 7 28.8978 7 28.5V1.5C7 1.10218 7.15804 0.720644 7.43934 0.43934C7.72064 0.158035 8.10218 0 8.5 0H10.5C10.8978 0 11.2794 0.158035 11.5607 0.43934C11.842 0.720644 12 1.10218 12 1.5V28.5C12 28.8978 11.842 29.2794 11.5607 29.5607C11.2794 29.842 10.8978 30 10.5 30Z" fill="#272727" />
                </svg>
                <span>Statistiques</span>
              </NavLink>
            </li>
            <li className={styles.navMenuItem}>
              <NavLink to="/employees" className={({ isActive }) => (isActive ? styles.navMenuItemLinkActive : styles.navMenuItemLink)}>
                <svg width="30" height="30" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_24_215)">
                    <path d="M2.4 5.57143C3.2825 5.57143 4 4.73862 4 3.71429C4 2.68996 3.2825 1.85714 2.4 1.85714C1.5175 1.85714 0.8 2.68996 0.8 3.71429C0.8 4.73862 1.5175 5.57143 2.4 5.57143ZM13.6 5.57143C14.4825 5.57143 15.2 4.73862 15.2 3.71429C15.2 2.68996 14.4825 1.85714 13.6 1.85714C12.7175 1.85714 12 2.68996 12 3.71429C12 4.73862 12.7175 5.57143 13.6 5.57143ZM14.4 6.5H12.8C12.36 6.5 11.9625 6.70603 11.6725 7.03973C12.68 7.68103 13.395 8.83884 13.55 10.2143H15.2C15.6425 10.2143 16 9.79933 16 9.28571V8.35714C16 7.33281 15.2825 6.5 14.4 6.5ZM8 6.5C9.5475 6.5 10.8 5.04621 10.8 3.25C10.8 1.45379 9.5475 0 8 0C6.4525 0 5.2 1.45379 5.2 3.25C5.2 5.04621 6.4525 6.5 8 6.5ZM9.92 7.42857H9.7125C9.1925 7.71875 8.615 7.89286 8 7.89286C7.385 7.89286 6.81 7.71875 6.2875 7.42857H6.08C4.49 7.42857 3.2 8.92589 3.2 10.7714V11.6071C3.2 12.3761 3.7375 13 4.4 13H11.6C12.2625 13 12.8 12.3761 12.8 11.6071V10.7714C12.8 8.92589 11.51 7.42857 9.92 7.42857ZM4.3275 7.03973C4.0375 6.70603 3.64 6.5 3.2 6.5H1.6C0.7175 6.5 0 7.33281 0 8.35714V9.28571C0 9.79933 0.3575 10.2143 0.8 10.2143H2.4475C2.605 8.83884 3.32 7.68103 4.3275 7.03973Z" fill="#272727" />
                  </g>
                  <defs>
                    <clipPath id="clip0_24_215">
                      <rect width="16" height="13" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span>Employés</span>
              </NavLink>
            </li>
            <li className={styles.navMenuItem}>
              <NavLink to="/establishments" className={({ isActive }) => (isActive ? styles.navMenuItemLinkActive : styles.navMenuItemLink)}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="path-1-outside-1_120_31" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30" fill="black">
                    <rect fill="white" width="30" height="30" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.48164 1C7.36902 1 6.60643 1 5.92579 1.17321C5.22137 1.35447 4.56548 1.67261 4.00071 2.10699C3.43595 2.54136 2.97495 3.08224 2.64764 3.69451C2.33233 4.28316 2.1837 4.98512 1.96562 6.00874L1.10441 10.0433C0.95189 10.7506 0.966626 11.4806 1.14758 12.182C1.32854 12.8834 1.67131 13.539 2.15175 14.1027V17.6776C2.15175 20.0713 2.15175 21.9674 2.36428 23.4508C2.58375 24.9771 3.04491 26.213 4.08392 27.1885C5.12293 28.1626 6.44113 28.595 8.07048 28.8007C9.65261 29 11.6751 29 14.2267 29H15.7728C18.3258 29 20.3483 29 21.9304 28.8007C23.5584 28.595 24.8766 28.1626 25.917 27.1885C26.956 26.213 27.4171 24.9771 27.6366 23.4508C27.8491 21.9661 27.8491 20.0713 27.8491 17.6776V14.104C28.3295 13.54 28.6722 12.8841 28.8529 12.1825C29.0336 11.4809 29.048 10.7507 28.8951 10.0433L28.0339 6.00874C27.8172 4.98512 27.6672 4.28316 27.3532 3.69451C27.0258 3.0821 26.5646 2.54113 25.9996 2.10676C25.4345 1.67238 24.7784 1.35431 24.0737 1.17321C23.3945 1 22.6319 1 21.5179 1H8.48164ZM23.707 15.9767C24.414 15.9779 25.114 15.846 25.7656 15.5886V17.6047C25.7656 20.0882 25.7628 21.8528 25.5711 23.1916C25.3836 24.5005 25.0308 25.2558 24.4432 25.8067C23.8556 26.3576 23.05 26.6884 21.6512 26.8642C20.9421 26.9467 20.2291 26.9962 19.5148 27.0127V23.4234C19.5148 22.8504 19.5148 22.3555 19.476 21.9518C19.4343 21.522 19.3426 21.0975 19.0954 20.6977C18.8213 20.2521 18.4271 19.882 17.9522 19.6246C17.5257 19.394 17.0729 19.3081 16.6145 19.269C16.1839 19.2326 15.6561 19.2326 15.0449 19.2326H14.9546C14.3434 19.2326 13.817 19.2326 13.385 19.269C12.9266 19.3081 12.4752 19.394 12.0487 19.6246C11.5733 19.8818 11.1785 20.2519 10.9041 20.6977C10.6583 21.0975 10.5666 21.522 10.5249 21.9505C10.486 22.3568 10.486 22.8504 10.486 23.4221V27.0127C9.77082 26.9963 9.0569 26.9468 8.3469 26.8642C6.95091 26.6884 6.14526 26.3576 5.5577 25.8067C4.96874 25.2558 4.61731 24.5005 4.42979 23.1903C4.23671 21.8528 4.23532 20.0882 4.23532 17.6047V15.5886C5.34532 16.0283 6.5822 16.0994 7.74116 15.7901C8.90012 15.4808 9.91165 14.8097 10.6083 13.8878C11.1129 14.536 11.7738 15.0631 12.5371 15.4262C13.3005 15.7892 14.1445 15.9779 15.0004 15.9767C15.8564 15.9779 16.7004 15.7892 17.4637 15.4262C18.2271 15.0631 18.888 14.536 19.3926 13.8878C19.8815 14.5338 20.5283 15.0606 21.279 15.424C22.0296 15.7874 22.8622 15.977 23.707 15.9767ZM12.5696 27.0439C13.1086 27.0465 13.6864 27.0465 14.3059 27.0465H15.695C16.3145 27.0465 16.8909 27.0465 17.4313 27.0439V23.4651C17.4313 22.8387 17.4299 22.4337 17.4007 22.1276C17.3729 21.8346 17.3243 21.7278 17.291 21.6744C17.1996 21.5263 17.0684 21.4032 16.9104 21.3176C16.8534 21.2863 16.7395 21.242 16.427 21.2147C15.9521 21.1873 15.4762 21.1777 15.0004 21.186C14.3323 21.186 13.9003 21.186 13.5739 21.2147C13.26 21.2407 13.1475 21.2863 13.0905 21.3176C12.932 21.403 12.8002 21.5261 12.7085 21.6744C12.6766 21.7265 12.6279 21.8346 12.6002 22.1276C12.571 22.4337 12.5696 22.8387 12.5696 23.4651V27.0439ZM10.3749 2.95349H8.63583C7.31068 2.95349 6.8509 2.9626 6.47864 3.05767C6.05605 3.16634 5.66257 3.35711 5.32372 3.61759C4.98486 3.87808 4.70822 4.20246 4.51174 4.56967C4.33811 4.89395 4.23949 5.3133 3.97974 6.53228L3.14909 10.4262C3.06056 10.8269 3.06013 11.2403 3.14784 11.6411C3.23554 12.0419 3.40952 12.4217 3.65915 12.7573C3.90878 13.0929 4.2288 13.3773 4.59965 13.593C4.9705 13.8086 5.38438 13.9511 5.81598 14.0117C6.24757 14.0723 6.68782 14.0497 7.10978 13.9453C7.53174 13.8409 7.92655 13.6569 8.27007 13.4045C8.61359 13.1522 8.89859 12.8368 9.10765 12.4776C9.3167 12.1185 9.44542 11.7231 9.48592 11.3157L9.58177 10.4223L9.58732 10.3676L10.3777 2.95349H10.3749ZM11.6542 10.6047L12.471 2.95349H17.5299L18.3411 10.5617C18.3866 10.997 18.3347 11.4364 18.189 11.8519C18.0432 12.2675 17.8066 12.6499 17.4944 12.9749C17.1822 13.3 16.8012 13.5604 16.3756 13.7397C15.95 13.9189 15.4893 14.013 15.0228 14.016C14.5562 14.019 14.0942 13.9308 13.666 13.7571C13.2379 13.5833 12.8531 13.3278 12.5361 13.0068C12.2192 12.6858 11.9771 12.3064 11.8252 11.8928C11.6734 11.4793 11.6151 11.0405 11.6542 10.6047ZM23.5222 3.05767C23.15 2.9626 22.6902 2.95349 21.3651 2.95349H19.6232L20.5163 11.3144C20.5582 11.7206 20.6877 12.1146 20.8972 12.4724C21.1066 12.8302 21.3915 13.1442 21.7346 13.3954C22.0776 13.6466 22.4716 13.8297 22.8926 13.9336C23.3135 14.0374 23.7526 14.0599 24.1831 13.9995C24.6136 13.9392 25.0265 13.7973 25.3967 13.5825C25.7668 13.3678 26.0864 13.0846 26.3361 12.7503C26.5858 12.416 26.7602 12.0376 26.8489 11.638C26.9376 11.2384 26.9385 10.8262 26.8518 10.4262L26.0225 6.53228C25.7614 5.3133 25.6628 4.89395 25.4905 4.56967C25.2939 4.20232 25.017 3.87786 24.6779 3.61736C24.3388 3.35687 23.9451 3.16618 23.5222 3.05767Z" />
                  </mask>
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.48164 1C7.36902 1 6.60643 1 5.92579 1.17321C5.22137 1.35447 4.56548 1.67261 4.00071 2.10699C3.43595 2.54136 2.97495 3.08224 2.64764 3.69451C2.33233 4.28316 2.1837 4.98512 1.96562 6.00874L1.10441 10.0433C0.95189 10.7506 0.966626 11.4806 1.14758 12.182C1.32854 12.8834 1.67131 13.539 2.15175 14.1027V17.6776C2.15175 20.0713 2.15175 21.9674 2.36428 23.4508C2.58375 24.9771 3.04491 26.213 4.08392 27.1885C5.12293 28.1626 6.44113 28.595 8.07048 28.8007C9.65261 29 11.6751 29 14.2267 29H15.7728C18.3258 29 20.3483 29 21.9304 28.8007C23.5584 28.595 24.8766 28.1626 25.917 27.1885C26.956 26.213 27.4171 24.9771 27.6366 23.4508C27.8491 21.9661 27.8491 20.0713 27.8491 17.6776V14.104C28.3295 13.54 28.6722 12.8841 28.8529 12.1825C29.0336 11.4809 29.048 10.7507 28.8951 10.0433L28.0339 6.00874C27.8172 4.98512 27.6672 4.28316 27.3532 3.69451C27.0258 3.0821 26.5646 2.54113 25.9996 2.10676C25.4345 1.67238 24.7784 1.35431 24.0737 1.17321C23.3945 1 22.6319 1 21.5179 1H8.48164ZM23.707 15.9767C24.414 15.9779 25.114 15.846 25.7656 15.5886V17.6047C25.7656 20.0882 25.7628 21.8528 25.5711 23.1916C25.3836 24.5005 25.0308 25.2558 24.4432 25.8067C23.8556 26.3576 23.05 26.6884 21.6512 26.8642C20.9421 26.9467 20.2291 26.9962 19.5148 27.0127V23.4234C19.5148 22.8504 19.5148 22.3555 19.476 21.9518C19.4343 21.522 19.3426 21.0975 19.0954 20.6977C18.8213 20.2521 18.4271 19.882 17.9522 19.6246C17.5257 19.394 17.0729 19.3081 16.6145 19.269C16.1839 19.2326 15.6561 19.2326 15.0449 19.2326H14.9546C14.3434 19.2326 13.817 19.2326 13.385 19.269C12.9266 19.3081 12.4752 19.394 12.0487 19.6246C11.5733 19.8818 11.1785 20.2519 10.9041 20.6977C10.6583 21.0975 10.5666 21.522 10.5249 21.9505C10.486 22.3568 10.486 22.8504 10.486 23.4221V27.0127C9.77082 26.9963 9.0569 26.9468 8.3469 26.8642C6.95091 26.6884 6.14526 26.3576 5.5577 25.8067C4.96874 25.2558 4.61731 24.5005 4.42979 23.1903C4.23671 21.8528 4.23532 20.0882 4.23532 17.6047V15.5886C5.34532 16.0283 6.5822 16.0994 7.74116 15.7901C8.90012 15.4808 9.91165 14.8097 10.6083 13.8878C11.1129 14.536 11.7738 15.0631 12.5371 15.4262C13.3005 15.7892 14.1445 15.9779 15.0004 15.9767C15.8564 15.9779 16.7004 15.7892 17.4637 15.4262C18.2271 15.0631 18.888 14.536 19.3926 13.8878C19.8815 14.5338 20.5283 15.0606 21.279 15.424C22.0296 15.7874 22.8622 15.977 23.707 15.9767ZM12.5696 27.0439C13.1086 27.0465 13.6864 27.0465 14.3059 27.0465H15.695C16.3145 27.0465 16.8909 27.0465 17.4313 27.0439V23.4651C17.4313 22.8387 17.4299 22.4337 17.4007 22.1276C17.3729 21.8346 17.3243 21.7278 17.291 21.6744C17.1996 21.5263 17.0684 21.4032 16.9104 21.3176C16.8534 21.2863 16.7395 21.242 16.427 21.2147C15.9521 21.1873 15.4762 21.1777 15.0004 21.186C14.3323 21.186 13.9003 21.186 13.5739 21.2147C13.26 21.2407 13.1475 21.2863 13.0905 21.3176C12.932 21.403 12.8002 21.5261 12.7085 21.6744C12.6766 21.7265 12.6279 21.8346 12.6002 22.1276C12.571 22.4337 12.5696 22.8387 12.5696 23.4651V27.0439ZM10.3749 2.95349H8.63583C7.31068 2.95349 6.8509 2.9626 6.47864 3.05767C6.05605 3.16634 5.66257 3.35711 5.32372 3.61759C4.98486 3.87808 4.70822 4.20246 4.51174 4.56967C4.33811 4.89395 4.23949 5.3133 3.97974 6.53228L3.14909 10.4262C3.06056 10.8269 3.06013 11.2403 3.14784 11.6411C3.23554 12.0419 3.40952 12.4217 3.65915 12.7573C3.90878 13.0929 4.2288 13.3773 4.59965 13.593C4.9705 13.8086 5.38438 13.9511 5.81598 14.0117C6.24757 14.0723 6.68782 14.0497 7.10978 13.9453C7.53174 13.8409 7.92655 13.6569 8.27007 13.4045C8.61359 13.1522 8.89859 12.8368 9.10765 12.4776C9.3167 12.1185 9.44542 11.7231 9.48592 11.3157L9.58177 10.4223L9.58732 10.3676L10.3777 2.95349H10.3749ZM11.6542 10.6047L12.471 2.95349H17.5299L18.3411 10.5617C18.3866 10.997 18.3347 11.4364 18.189 11.8519C18.0432 12.2675 17.8066 12.6499 17.4944 12.9749C17.1822 13.3 16.8012 13.5604 16.3756 13.7397C15.95 13.9189 15.4893 14.013 15.0228 14.016C14.5562 14.019 14.0942 13.9308 13.666 13.7571C13.2379 13.5833 12.8531 13.3278 12.5361 13.0068C12.2192 12.6858 11.9771 12.3064 11.8252 11.8928C11.6734 11.4793 11.6151 11.0405 11.6542 10.6047ZM23.5222 3.05767C23.15 2.9626 22.6902 2.95349 21.3651 2.95349H19.6232L20.5163 11.3144C20.5582 11.7206 20.6877 12.1146 20.8972 12.4724C21.1066 12.8302 21.3915 13.1442 21.7346 13.3954C22.0776 13.6466 22.4716 13.8297 22.8926 13.9336C23.3135 14.0374 23.7526 14.0599 24.1831 13.9995C24.6136 13.9392 25.0265 13.7973 25.3967 13.5825C25.7668 13.3678 26.0864 13.0846 26.3361 12.7503C26.5858 12.416 26.7602 12.0376 26.8489 11.638C26.9376 11.2384 26.9385 10.8262 26.8518 10.4262L26.0225 6.53228C25.7614 5.3133 25.6628 4.89395 25.4905 4.56967C25.2939 4.20232 25.017 3.87786 24.6779 3.61736C24.3388 3.35687 23.9451 3.16618 23.5222 3.05767Z" fill="#272727" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.48164 1C7.36902 1 6.60643 1 5.92579 1.17321C5.22137 1.35447 4.56548 1.67261 4.00071 2.10699C3.43595 2.54136 2.97495 3.08224 2.64764 3.69451C2.33233 4.28316 2.1837 4.98512 1.96562 6.00874L1.10441 10.0433C0.95189 10.7506 0.966626 11.4806 1.14758 12.182C1.32854 12.8834 1.67131 13.539 2.15175 14.1027V17.6776C2.15175 20.0713 2.15175 21.9674 2.36428 23.4508C2.58375 24.9771 3.04491 26.213 4.08392 27.1885C5.12293 28.1626 6.44113 28.595 8.07048 28.8007C9.65261 29 11.6751 29 14.2267 29H15.7728C18.3258 29 20.3483 29 21.9304 28.8007C23.5584 28.595 24.8766 28.1626 25.917 27.1885C26.956 26.213 27.4171 24.9771 27.6366 23.4508C27.8491 21.9661 27.8491 20.0713 27.8491 17.6776V14.104C28.3295 13.54 28.6722 12.8841 28.8529 12.1825C29.0336 11.4809 29.048 10.7507 28.8951 10.0433L28.0339 6.00874C27.8172 4.98512 27.6672 4.28316 27.3532 3.69451C27.0258 3.0821 26.5646 2.54113 25.9996 2.10676C25.4345 1.67238 24.7784 1.35431 24.0737 1.17321C23.3945 1 22.6319 1 21.5179 1H8.48164ZM23.707 15.9767C24.414 15.9779 25.114 15.846 25.7656 15.5886V17.6047C25.7656 20.0882 25.7628 21.8528 25.5711 23.1916C25.3836 24.5005 25.0308 25.2558 24.4432 25.8067C23.8556 26.3576 23.05 26.6884 21.6512 26.8642C20.9421 26.9467 20.2291 26.9962 19.5148 27.0127V23.4234C19.5148 22.8504 19.5148 22.3555 19.476 21.9518C19.4343 21.522 19.3426 21.0975 19.0954 20.6977C18.8213 20.2521 18.4271 19.882 17.9522 19.6246C17.5257 19.394 17.0729 19.3081 16.6145 19.269C16.1839 19.2326 15.6561 19.2326 15.0449 19.2326H14.9546C14.3434 19.2326 13.817 19.2326 13.385 19.269C12.9266 19.3081 12.4752 19.394 12.0487 19.6246C11.5733 19.8818 11.1785 20.2519 10.9041 20.6977C10.6583 21.0975 10.5666 21.522 10.5249 21.9505C10.486 22.3568 10.486 22.8504 10.486 23.4221V27.0127C9.77082 26.9963 9.0569 26.9468 8.3469 26.8642C6.95091 26.6884 6.14526 26.3576 5.5577 25.8067C4.96874 25.2558 4.61731 24.5005 4.42979 23.1903C4.23671 21.8528 4.23532 20.0882 4.23532 17.6047V15.5886C5.34532 16.0283 6.5822 16.0994 7.74116 15.7901C8.90012 15.4808 9.91165 14.8097 10.6083 13.8878C11.1129 14.536 11.7738 15.0631 12.5371 15.4262C13.3005 15.7892 14.1445 15.9779 15.0004 15.9767C15.8564 15.9779 16.7004 15.7892 17.4637 15.4262C18.2271 15.0631 18.888 14.536 19.3926 13.8878C19.8815 14.5338 20.5283 15.0606 21.279 15.424C22.0296 15.7874 22.8622 15.977 23.707 15.9767ZM12.5696 27.0439C13.1086 27.0465 13.6864 27.0465 14.3059 27.0465H15.695C16.3145 27.0465 16.8909 27.0465 17.4313 27.0439V23.4651C17.4313 22.8387 17.4299 22.4337 17.4007 22.1276C17.3729 21.8346 17.3243 21.7278 17.291 21.6744C17.1996 21.5263 17.0684 21.4032 16.9104 21.3176C16.8534 21.2863 16.7395 21.242 16.427 21.2147C15.9521 21.1873 15.4762 21.1777 15.0004 21.186C14.3323 21.186 13.9003 21.186 13.5739 21.2147C13.26 21.2407 13.1475 21.2863 13.0905 21.3176C12.932 21.403 12.8002 21.5261 12.7085 21.6744C12.6766 21.7265 12.6279 21.8346 12.6002 22.1276C12.571 22.4337 12.5696 22.8387 12.5696 23.4651V27.0439ZM10.3749 2.95349H8.63583C7.31068 2.95349 6.8509 2.9626 6.47864 3.05767C6.05605 3.16634 5.66257 3.35711 5.32372 3.61759C4.98486 3.87808 4.70822 4.20246 4.51174 4.56967C4.33811 4.89395 4.23949 5.3133 3.97974 6.53228L3.14909 10.4262C3.06056 10.8269 3.06013 11.2403 3.14784 11.6411C3.23554 12.0419 3.40952 12.4217 3.65915 12.7573C3.90878 13.0929 4.2288 13.3773 4.59965 13.593C4.9705 13.8086 5.38438 13.9511 5.81598 14.0117C6.24757 14.0723 6.68782 14.0497 7.10978 13.9453C7.53174 13.8409 7.92655 13.6569 8.27007 13.4045C8.61359 13.1522 8.89859 12.8368 9.10765 12.4776C9.3167 12.1185 9.44542 11.7231 9.48592 11.3157L9.58177 10.4223L9.58732 10.3676L10.3777 2.95349H10.3749ZM11.6542 10.6047L12.471 2.95349H17.5299L18.3411 10.5617C18.3866 10.997 18.3347 11.4364 18.189 11.8519C18.0432 12.2675 17.8066 12.6499 17.4944 12.9749C17.1822 13.3 16.8012 13.5604 16.3756 13.7397C15.95 13.9189 15.4893 14.013 15.0228 14.016C14.5562 14.019 14.0942 13.9308 13.666 13.7571C13.2379 13.5833 12.8531 13.3278 12.5361 13.0068C12.2192 12.6858 11.9771 12.3064 11.8252 11.8928C11.6734 11.4793 11.6151 11.0405 11.6542 10.6047ZM23.5222 3.05767C23.15 2.9626 22.6902 2.95349 21.3651 2.95349H19.6232L20.5163 11.3144C20.5582 11.7206 20.6877 12.1146 20.8972 12.4724C21.1066 12.8302 21.3915 13.1442 21.7346 13.3954C22.0776 13.6466 22.4716 13.8297 22.8926 13.9336C23.3135 14.0374 23.7526 14.0599 24.1831 13.9995C24.6136 13.9392 25.0265 13.7973 25.3967 13.5825C25.7668 13.3678 26.0864 13.0846 26.3361 12.7503C26.5858 12.416 26.7602 12.0376 26.8489 11.638C26.9376 11.2384 26.9385 10.8262 26.8518 10.4262L26.0225 6.53228C25.7614 5.3133 25.6628 4.89395 25.4905 4.56967C25.2939 4.20232 25.017 3.87786 24.6779 3.61736C24.3388 3.35687 23.9451 3.16618 23.5222 3.05767Z" stroke="#272727" strokeWidth="1.4" mask="url(#path-1-outside-1_120_31)" />
                </svg>
                <span>Etablissements</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.usermenu}>
          <button className={styles.usermenuNotif}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.1847 11.0467C15.1199 10.9753 15.0563 10.9039 14.9938 10.8349C14.1352 9.88458 13.6157 9.31101 13.6157 6.62065C13.6157 5.2278 13.2515 4.08494 12.5338 3.2278C12.0045 2.59458 11.2891 2.11422 10.3462 1.75922C10.334 1.75305 10.3232 1.74495 10.3142 1.7353C9.97499 0.69601 9.04687 -6.10352e-05 8.0001 -6.10352e-05C6.95332 -6.10352e-05 6.02559 0.69601 5.68642 1.73422C5.67737 1.74352 5.66669 1.75137 5.65481 1.75744C3.45432 2.58637 2.38491 4.17672 2.38491 6.61958C2.38491 9.31101 1.86621 9.88458 1.00678 10.8339C0.94433 10.9028 0.880712 10.9728 0.815922 11.0457C0.648564 11.2303 0.542528 11.455 0.510365 11.6931C0.478202 11.9313 0.521257 12.1728 0.634435 12.3892C0.875247 12.8535 1.38849 13.1417 1.97432 13.1417H14.0302C14.6133 13.1417 15.123 12.8539 15.3646 12.3917C15.4783 12.1753 15.5217 11.9335 15.4898 11.6951C15.4579 11.4567 15.352 11.2317 15.1847 11.0467ZM8.0001 15.9999C8.56409 15.9995 9.11744 15.8594 9.60147 15.5945C10.0855 15.3296 10.4821 14.9498 10.7493 14.4953C10.7619 14.4735 10.7681 14.4491 10.7674 14.4245C10.7666 14.3999 10.7589 14.3758 10.745 14.3547C10.7311 14.3336 10.7115 14.3162 10.688 14.3041C10.6646 14.292 10.6381 14.2856 10.6112 14.2857H5.3898C5.36284 14.2856 5.33631 14.2919 5.31281 14.304C5.2893 14.316 5.26961 14.3335 5.25566 14.3546C5.24171 14.3757 5.23397 14.3997 5.2332 14.4244C5.23242 14.4491 5.23864 14.4735 5.25124 14.4953C5.51841 14.9497 5.915 15.3295 6.39895 15.5944C6.8829 15.8593 7.43617 15.9995 8.0001 15.9999Z" fill="#272727" />
            </svg>
            <span>Notifications</span>
          </button>
          <NavLink to="/settings" className={styles.usermenuSettings}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_27_39)">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.49811 0.121539C9.18654 -6.10709e-05 8.79076 -6.10352e-05 8.00005 -6.10352e-05C7.20933 -6.10352e-05 6.81355 -6.10709e-05 6.50198 0.121539C6.08722 0.283308 5.75706 0.594951 5.58411 0.987939C5.50496 1.16634 5.47464 1.37514 5.46201 1.67834C5.4564 1.89802 5.39189 2.11271 5.2746 2.30211C5.15731 2.49152 4.99111 2.64937 4.79171 2.76074C4.58856 2.86802 4.36018 2.92486 4.12775 2.92597C3.89532 2.92709 3.66636 2.87246 3.46207 2.76714C3.17744 2.62474 2.97113 2.54634 2.76735 2.52074C2.32151 2.46513 1.87059 2.57898 1.51265 2.83754C1.24486 3.03114 1.04697 3.35434 0.652037 3.99994C0.256259 4.64554 0.0592114 4.96794 0.0145811 5.28394C-0.0443647 5.70474 0.0768952 6.13034 0.351414 6.46714C0.476042 6.62074 0.652037 6.74954 0.92403 6.91114C1.3257 7.14874 1.58338 7.55354 1.58338 7.99994C1.58338 8.44634 1.3257 8.85114 0.924872 9.08794C0.652037 9.25034 0.476042 9.37914 0.350572 9.53274C0.215066 9.69909 0.115605 9.88931 0.0579351 10.0924C0.000265164 10.2955 -0.0144701 10.5074 0.0145811 10.7159C0.0592114 11.0311 0.256259 11.3543 0.652037 11.9999C1.04782 12.6455 1.24486 12.9679 1.51265 13.1623C1.86969 13.4207 2.32104 13.5343 2.76735 13.4791C2.97113 13.4535 3.17744 13.3751 3.46207 13.2327C3.66646 13.1273 3.89558 13.0726 4.12818 13.0737C4.36077 13.0748 4.5893 13.1317 4.79256 13.2391C5.20181 13.4631 5.44433 13.8751 5.46201 14.3215C5.47464 14.6255 5.50496 14.8335 5.58411 15.0119C5.7559 15.4039 6.08599 15.7159 6.50198 15.8783C6.81355 15.9999 7.20933 15.9999 8.00005 15.9999C8.79076 15.9999 9.18654 15.9999 9.49811 15.8783C9.91288 15.7166 10.243 15.4049 10.416 15.0119C10.4951 14.8335 10.5255 14.6255 10.5381 14.3215C10.5549 13.8751 10.7983 13.4623 11.2084 13.2391C11.4115 13.1319 11.6399 13.075 11.8723 13.0739C12.1048 13.0728 12.3337 13.1274 12.538 13.2327C12.8227 13.3751 13.029 13.4535 13.2327 13.4791C13.679 13.5351 14.1304 13.4207 14.4874 13.1623C14.7552 12.9687 14.9531 12.6455 15.3481 11.9999C15.7438 11.3543 15.9409 11.0319 15.9855 10.7159C16.0144 10.5074 15.9996 10.2954 15.9418 10.0923C15.8839 9.88922 15.7843 9.69903 15.6487 9.53274C15.5241 9.37914 15.3481 9.25034 15.0761 9.08874C14.6744 8.85114 14.4167 8.44634 14.4167 7.99994C14.4167 7.55354 14.6744 7.14874 15.0752 6.91194C15.3481 6.74954 15.524 6.62074 15.6495 6.46714C15.785 6.30079 15.8845 6.11057 15.9422 5.90748C15.9998 5.7044 16.0146 5.49247 15.9855 5.28394C15.9409 4.96874 15.7438 4.64554 15.3481 3.99994C14.9523 3.35434 14.7552 3.03194 14.4874 2.83754C14.1295 2.57898 13.6786 2.46513 13.2327 2.52074C13.029 2.54634 12.8227 2.62474 12.538 2.76714C12.3336 2.8726 12.1045 2.92731 11.8719 2.92619C11.6393 2.92507 11.4108 2.86816 11.2075 2.76074C11.0083 2.64927 10.8423 2.49137 10.7251 2.30198C10.608 2.11259 10.5436 1.89795 10.5381 1.67834C10.5255 1.37434 10.4951 1.16634 10.416 0.987939C10.3304 0.793328 10.2053 0.616645 10.0478 0.467985C9.89029 0.319325 9.70351 0.201601 9.49811 0.121539ZM8.00005 10.3999C9.40632 10.3999 10.5457 9.32554 10.5457 7.99994C10.5457 6.67434 9.40548 5.59994 8.00005 5.59994C6.59377 5.59994 5.45443 6.67434 5.45443 7.99994C5.45443 9.32554 6.59461 10.3999 8.00005 10.3999Z" fill="#272727" />
              </g>
              <defs>
                <clipPath id="clip0_27_39">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span>Paramètres</span>
          </NavLink>
          <button className={styles.usermenuProfile}>
            <img src="https://avatars.githubusercontent.com/u/12610160?v=4" alt="avatar" />
            <span>Profil</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
