import React, { useCallback, useEffect, useState } from 'react';
import { MdAutorenew } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import {
  Container,
  Content,
  User,
  RefreshButton,
  Header,
  Card,
  CardItem,
  Column,
  Row,
  DeleteButton,
} from './styles';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { Loading } from '../../components/Loading';
import { formatDateTime, formatPhoneNumber } from '../../utils/format';
import {
  ConfirmationMessage,
  MessageError,
  ShowMessage,
  ToastError,
  ToastSuccess,
} from '../../components/Message';
import { isValidPhoneNumber } from '../../utils/validate';

interface IToken {
  id: string;
  phone: string;
  formatted_phone: string;
  created_at: Date;
}

const Home: React.FC = () => {
  const { user } = useAuth();
  const [tokens, setTokens] = useState<IToken[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/tokens');

      const formattedData = data.map((item: IToken) => ({
        ...item,
        phone: item.phone.substring(2),
        formatted_phone: formatPhoneNumber(item.phone),
        created_at: formatDateTime(item.created_at),
      }));

      setTokens(formattedData);
    } catch (error) {
      ToastError('Não foi possivel carregar os tokens cadastrados');
    }
    setLoading(false);
  }, []);

  const loadQrCode = useCallback(async () => {
    setLoading(true);
    try {
      ShowMessage({
        text: 'Digite o número que deseja cadastrar',
        input: 'tel',
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Gerar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: async number => {
          const validNumber = isValidPhoneNumber(number);
          if (!validNumber) {
            ShowMessage({
              title: 'Número inválido',
            });
            return;
          }

          const cleanedPhoneNumber = number.replace(/\D/g, '');

          const { data } = await api.post(
            '/tokens',
            { from: cleanedPhoneNumber },
            { responseType: 'arraybuffer' },
          );

          const base64Data = btoa(
            new Uint8Array(data).reduce((dataArray, byte) => {
              return dataArray + String.fromCharCode(byte);
            }, ''),
          );

          const image = `data:image/png;base64,${base64Data}`;

          ShowMessage({
            title: 'QR CODE',
            text: 'Abra seu whatsapp para escanear',
            imageUrl: image,
            imageAlt: 'Qr Code',
          });
        },
      });
    } catch (error) {
      ToastError('Não foi possivel gerar o qrcode');
    }

    setLoading(false);
  }, []);

  const handleDelete = useCallback(
    async (id: string, description: string) => {
      const confirm = await ConfirmationMessage({
        title: `Deseja excluir ${description}?`,
        text: 'Essa operação não poderá ser revertida!',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar',
      });

      if (confirm.value) {
        try {
          await api.delete(`/tokens/${id}`);
          await loadData();
          ToastSuccess('Registro excluído com sucesso!');
        } catch (error) {
          MessageError('Não foi possivel excluir o registro!');
        }
      }
    },
    [loadData],
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Container>
      <Content>
        <Header>
          <span>Bem-vindo, </span>
          <User>{user.name}</User>
          <RefreshButton disabled={loading} onClick={() => loadQrCode()}>
            {loading ? <Loading size="20" /> : <MdAutorenew size="20" />}
            Gerar QrCode
          </RefreshButton>
        </Header>

        {tokens.map(token => (
          <Card key={token.id}>
            <Column>
              <Row>
                <CardItem>Número:</CardItem>
                {token.formatted_phone}
              </Row>
            </Column>
            <Column>
              <Row>
                <CardItem>Data Cadastro:</CardItem>
                {token.created_at}
              </Row>
            </Column>

            <DeleteButton
              title="Excluir remetente"
              onClick={
                () => handleDelete(token.phone, token.formatted_phone)
                // eslint-disable-next-line react/jsx-curly-newline
              }
            >
              <AiOutlineDelete />
            </DeleteButton>
          </Card>
        ))}
      </Content>
    </Container>
  );
};

export default Home;
