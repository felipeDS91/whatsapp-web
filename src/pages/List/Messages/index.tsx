import React, { useCallback, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineMessage, AiOutlineDelete } from 'react-icons/ai';
import {
  Container,
  Content,
  SearchButton,
  DeleteButton,
  Header,
  Card,
  CardItem,
  Column,
  Row,
  Filter,
} from './styles';
import api from '../../../services/api';
import { Loading } from '../../../components/Loading';
import { formatDateTime } from '../../../utils/format';
import {
  ConfirmationMessage,
  MessageError,
  ToastError,
  ToastSuccess,
} from '../../../components/Message';
import { Button, Form, Modal, Pagination, Select } from '../../../components';
import FormMessage from '../../Form/Message';

interface IQueryParams {
  query?: { status: string };
  pageNumber?: number;
}

interface IFilters {
  status: string;
}

interface IMessage {
  id: string;
  status: string;
  to: string;
  from: string;
  message: string;
  schedule_date?: Date;
  created_at: Date;
  updated_at: Date;
}

const STATUS = [
  { value: 'WAITING', label: 'Aguardando envio' },
  { value: 'FROM_NOT_FOUND', label: 'Remetente não localizado' },
  { value: 'FROM_DISCONNECTED', label: 'Remetente desconectado' },
  { value: 'TO_NOT_FOUND', label: 'Destinatário não localizado' },
  { value: 'ERROR', label: 'Erro desconhecido' },
  { value: 'SUCCESS', label: 'Enviada com sucesso' },
];

const ListMessages: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [filters, setFilters] = useState<IFilters>();
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  const loadMessages = useCallback(
    async ({ query, pageNumber = 1 }: IQueryParams) => {
      setLoading(true);
      try {
        const { data } = await api.get('/messages', {
          params: {
            q: query?.status,
            page: pageNumber,
          },
        });

        const { docs, ...info } = data;

        const formattedData = docs.map((item: IMessage) => ({
          ...item,
          schedule_date: item.schedule_date
            ? formatDateTime(item.schedule_date)
            : 'Não',
          created_at: formatDateTime(item.created_at),
          updated_at: formatDateTime(item.updated_at),
          status: STATUS.find(st => st.value === item.status)?.label,
        }));

        setMessages(formattedData);
        setPagination(info);
      } catch (error) {
        ToastError('Não foi possivel carrgear os dados');
        setMessages([]);
        setPagination({
          page: 1,
          pages: 1,
          total: 0,
        });
      }
      setLoading(false);
    },
    [],
  );

  const handleSearch = useCallback(
    data => {
      setFilters({ ...filters, status: data.status });
      loadMessages({ query: data });
    },
    [filters, loadMessages],
  );

  const handlePagination = useCallback(
    pageNumber => {
      loadMessages({ query: filters, pageNumber });
    },
    [filters, loadMessages],
  );

  const onSendMessage = useCallback(() => {
    setOpened(false);
    loadMessages({});
  }, [loadMessages]);

  const handleDelete = useCallback(
    async (id: string, description: string) => {
      const confirm = await ConfirmationMessage({
        title: `Deseja cancelar o envio da mensagem para ${description}?`,
        text: 'Essa operação não poderá ser revertida!',
        confirmButtonText: 'Sim, cancelar!',
        cancelButtonText: 'Cancelar',
      });

      if (confirm.value) {
        try {
          await api.delete(`/messages/${id}`);
          loadMessages({});
          ToastSuccess('Mensagem cancelada com sucesso!');
        } catch (error) {
          MessageError('Não foi possivel cancelar a mensagem!');
        }
      }
    },
    [loadMessages],
  );

  useEffect(() => {
    loadMessages({});
  }, [loadMessages]);

  return (
    <Container>
      <Content>
        <Modal isOpen={opened} onRequestClose={() => setOpened(false)}>
          <FormMessage onSendMessage={onSendMessage} />
        </Modal>
        <Header>
          <Form onSubmit={handleSearch}>
            <Button onClick={() => setOpened(!opened)}>
              <AiOutlineMessage />
              Nova mensagem
            </Button>
            <Filter>
              <Select
                name="status"
                label="Status"
                options={STATUS}
                isClearable
              />
              <SearchButton disabled={loading}>
                {loading ? <Loading size="20" /> : <FiSearch size="20" />}
                Pesquisar
              </SearchButton>
            </Filter>
          </Form>
        </Header>

        {!loading && messages.length === 0 && (
          <Card>
            <Column
              style={{
                alignItems: 'center',
                height: '300px',
                justifyContent: 'center',
              }}
            >
              NENHUM RESULTADO ENCONTRADO
            </Column>
          </Card>
        )}

        {messages.map(message => (
          <Card key={message.id}>
            <Column>
              <Row>
                <Column>
                  <Row>
                    <CardItem>ID:</CardItem>
                    {message.id}
                  </Row>
                </Column>
                <Column>
                  <Row>
                    <CardItem>Data Envio:</CardItem>
                    {message.created_at}
                  </Row>
                </Column>
                <Column>
                  <Row>
                    <CardItem>Data Status:</CardItem>
                    {message.updated_at}
                  </Row>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Row>
                    <CardItem>De:</CardItem>
                    {message.from}
                  </Row>
                </Column>
                <Column>
                  <Row>
                    <CardItem>Para:</CardItem>
                    {message.to}
                  </Row>
                </Column>
                <Column>
                  <Row>
                    <CardItem>Status:</CardItem>
                    {message.status}
                  </Row>
                </Column>
              </Row>
              <Row>
                <CardItem>Mensagem:</CardItem>
              </Row>
              <Row>{message.message}</Row>
              <DeleteButton
                disabled={message.status !== 'Aguardando envio'}
                title="Cancelar envio"
                onClick={() => handleDelete(message.id, message.to)}
              >
                <AiOutlineDelete />
              </DeleteButton>
            </Column>
          </Card>
        ))}

        <Pagination info={pagination} handlePage={handlePagination} />
      </Content>
    </Container>
  );
};

export default ListMessages;
