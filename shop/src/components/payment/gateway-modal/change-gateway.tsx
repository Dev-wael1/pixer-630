import { useModalAction } from '@/components/modal-views/context';
import Button from '@/components/ui/button';
import { Order } from '@/types';
import { useTranslation } from 'react-i18next';

interface Props {
  order: Order;
  buttonSize?: 'big' | 'medium' | 'small';
}

const ChangeGateway: React.FC<Props> = ({ order }) => {
  const { t } = useTranslation();
  const { openModal, closeModal } = useModalAction();

  const handleChangePaymentGateway = async () => {
    openModal('GATEWAY_MODAL', {
      order,
    });
  };

  return (
    <Button className="w-full" onClick={handleChangePaymentGateway}>
      Change gateway
    </Button>
  );
};

export default ChangeGateway;
