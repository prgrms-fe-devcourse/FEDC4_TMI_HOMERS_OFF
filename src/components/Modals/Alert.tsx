import Portal from './Portal';

type Props = {
  title?: string;
  message?: string;
  confirmLabel?: string;
  onClose?: () => void;
};

const BG_OVERLAY_CLASS = 'fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-40';
const MODAL_BASE_CLASS =
  'animate-modalZoomIn origin-left fixed flex justify-center top-[50%] left-[50%] pt-[16px] min-w-[300px] max-w-[70%] rounded-xl overflow-hidden bg-white dark:bg-tricorn-black -translate-x-1/2 -translate-y-1/2 z-50';
const MODAL_CONTENT_CLASS = 'w-[90%] flex flex-col justify-center';

const BUTTON_COLOR_CLASS = 'bg-cooled-blue text-white dark:bg-opacity-80';
const BUTTON_CONTAINER_CLASS = 'flex gap-[0.5rem] border-t mt-[2rem] items-center justify-center';
const BUTTON_BOX_CLASS = 'flex-1 h-[3.875rem] text-center rounded-md cursor-pointer';
const BUTTON_TRANSITION_CLASS = 'transform transition duration-100 active:scale-90';
const BUTTON_CONTENT_CLASS = 'font-Cafe24Surround flex justify-center items-center';

const COLOR_CLASSES = {
  CONTAINER: 'bg-white dark:bg-tricorn-black',
  TITLE: 'text-tricorn-black dark:text-white',
  MESSAGE: 'text-footer-icon dark:text-lazy-gray',
  CANCEL: 'text-wall-street dark:text-lazy-gray',
  BORDER: 'text-tertiory-gray dark:border-footer-icon',
};

const FONT_CLASSES = {
  TITLE: 'font-Cafe24Surround text-[1.125rem] text-center',
  MESSAGE: 'font-Cafe24SurroundAir text-base text-center',
};

const Alert = ({ title, message, onClose, confirmLabel = '확인' }: Props) => {
  return (
    <Portal>
      <div onClick={onClose} className={BG_OVERLAY_CLASS} />
      <div className={`${MODAL_BASE_CLASS} ${COLOR_CLASSES.CONTAINER} pt-[2rem]`}>
        <div className={MODAL_CONTENT_CLASS}>
          <div>
            <p className={`${FONT_CLASSES.TITLE} ${COLOR_CLASSES.TITLE}`}>{title}</p>
            <p className={`mt-[1rem] ${FONT_CLASSES.MESSAGE} ${COLOR_CLASSES.MESSAGE}`}>
              {message}
            </p>
          </div>
          <div className={`${BUTTON_CONTAINER_CLASS} ${COLOR_CLASSES.BORDER}`}>
            <div
              onClick={() => {
                onClose && onClose();
              }}
              className={`${BUTTON_BOX_CLASS} ${BUTTON_TRANSITION_CLASS}`}
            >
              <div className={`flex h-full justify-center items-center`}>
                <div
                  className={`w-[40%] mx-[1rem] h-[2.25rem] rounded-full text-white ${BUTTON_CONTENT_CLASS} ${BUTTON_COLOR_CLASS}`}
                >
                  {confirmLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Alert;
