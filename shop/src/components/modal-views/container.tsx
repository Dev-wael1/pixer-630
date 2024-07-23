import {
  MODAL_VIEWS,
  useModalAction,
  useModalState,
} from '@/components/modal-views/context';
import Modal from '@/components/modal-views/modal';
import dynamic from 'next/dynamic';

const LoginUserForm = dynamic(() => import('@/components/auth/login-form'));
const ProductPopupDetails = dynamic(
  () => import('@/components/product/product-popup'),
);
const RegisterUserForm = dynamic(
  () => import('@/components/auth/register-form'),
);
const ForgotUserPassword = dynamic(
  () => import('@/components/auth/forgot-password'),
);
const ReviewImageModal = dynamic(
  () => import('@/components/review/review-image-modal'),
);
const ReviewRating = dynamic(() => import('@/components/review/review-form'));
const AbuseReportForm = dynamic(
  () => import('@/components/review/abuse-report-form'),
);
const QuestionForm = dynamic(
  () => import('@/components/questions/question-form'),
);

const PaymentModal = dynamic(
  () => import('@/components/payment/payment-modal'),
  { ssr: false },
);
const AddNewPaymentModal = dynamic(
  () => import('@/components/payment/add-new-payment-modal'),
  { ssr: false },
);

const AddNewCardModal = dynamic(
  () => import('@/components/card/add-new-card-modal'),
  { ssr: false },
);

const GateWayPaymentModal = dynamic(
  () => import('@/components/payment/gateway-modal/gateway-modal'),
  { ssr: false },
);

const DeleteCardModal = dynamic(() => import('@/components/card/delete-view'));

const NewsLetterModal = dynamic(
  () => import('@/components/maintenance/news-letter'),
  { ssr: false },
);

const PromoPopup = dynamic(() => import('@/components/promo-popup'), {
  ssr: false,
});

function renderModalContent(view: MODAL_VIEWS) {
  switch (view) {
    case 'REGISTER':
      return <RegisterUserForm />;
    case 'LOGIN_VIEW':
      return <LoginUserForm />;
    case 'FORGOT_PASSWORD_VIEW':
      return <ForgotUserPassword />;
    case 'PRODUCT_DETAILS':
      return <ProductPopupDetails />;
    case 'REVIEW_IMAGE_POPOVER':
      return <ReviewImageModal />;
    case 'REVIEW_RATING':
      return <ReviewRating />;
    case 'ABUSE_REPORT':
      return <AbuseReportForm />;
    case 'QUESTION_FORM':
      return <QuestionForm />;
    case 'PAYMENT_MODAL':
      return <PaymentModal />;
    case 'USE_NEW_PAYMENT':
      return <AddNewPaymentModal />;
    case 'ADD_NEW_CARD':
      return <AddNewCardModal />;
    case 'DELETE_CARD_MODAL':
      return <DeleteCardModal />;
    case 'GATEWAY_MODAL':
      return <GateWayPaymentModal />;
    case 'NEWSLETTER_MODAL':
      return <NewsLetterModal />;
    default:
      return null;
  }
}

export default function ModalsContainer() {
  const { view, isOpen } = useModalState();
  const { closeModal } = useModalAction();

  if (view === 'PROMO_POPUP_MODAL') {
    return <PromoPopup />;
  }

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view && renderModalContent(view)}
    </Modal>
  );
}
