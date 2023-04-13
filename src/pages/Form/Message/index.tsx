import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import * as Yup from 'yup';
import { Container, Content, SendButton } from './styles';
import api from '../../../services/api';
import { Loading } from '../../../components/Loading';
import { formatPhoneNumber } from '../../../utils/format';
import { ToastError, ToastSuccess } from '../../../components/Message';
import { DatePicker, Form, Input, Select, Textarea } from '../../../components';

interface IToken {
  phone: string;
}

export interface ISelect {
  value: string;
  label: string;
}

interface Props {
  onSendMessage: () => void;
}

const FormMessage: React.FC<Props> = ({ onSendMessage }) => {
  const [loading, setLoading] = useState(false);
  const [senders, setSenders] = useState<ISelect[]>([]);
  const VALID_NUMBER_SIZE = [11, 22, 16, 18];

  const schema = Yup.object().shape({
    from: Yup.string().required('Remetente requerido'),
    to: Yup.string()
      .test('to', 'Número inválido', value => {
        const phoneLenght = sanitizePhoneNumber(value || '').length;
        return VALID_NUMBER_SIZE.includes(phoneLenght);
      })
      .required('Destinatário requerido'),
    message: Yup.string().required('Mensagem requerida'),
    schedule_date: Yup.date().min(new Date(), 'Data de inicio inválida'),
  });

  const sanitizePhoneNumber = useCallback((number: string) => {
    return number.replaceAll('_', '');
  }, []);

  const loadSenders = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/tokens');
      const formattedData = data.map((item: IToken) => ({
        value: item.phone.substring(2),
        label: formatPhoneNumber(item.phone),
      }));
      setSenders(formattedData);
    } catch (error) {
      ToastError('Não foi possivel carregar os remetentes');
    }
    setLoading(false);
  }, []);

  const handleSubmit = useCallback(
    async data => {
      setLoading(true);

      try {
        const to = sanitizePhoneNumber(data.to);
        await api.post('/messages', { ...data, to });
        ToastSuccess('Mensagem encaminhada com sucesso!');
        onSendMessage();
      } catch ({ response }) {
        ToastError(
          'Não foi possivel encaminhar a mensagem.\nTente novamente ou mais tarde',
        );
      }

      setLoading(false);
    },
    [onSendMessage, sanitizePhoneNumber],
  );

  useEffect(() => {
    loadSenders();
  }, [loadSenders]);

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit} schema={schema}>
          <Select
            name="from"
            label="Remetente"
            placeholder="Selecione o remetente"
            options={senders}
          />

          <Input
            name="to"
            label="Destinatário"
            placeholder="Digite destinatário"
            mask="999999999999999999999"
          />

          <DatePicker
            name="schedule_date"
            label="Agendar envio"
            isClearable
            showTimeSelect
            readOnly
          />

          <Textarea name="message" label="Mensagem" />

          <SendButton disabled={loading}>
            {loading ? <Loading size="20" /> : <AiOutlineSend size="20" />}
            ENVIAR
          </SendButton>
        </Form>
      </Content>
    </Container>
  );
};

export default FormMessage;
