import React, { useCallback, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import {
  Container,
  Content,
  SearchButton,
  Header,
  Card,
  CardItem,
  Column,
  Row,
  Filter,
} from './styles';
import api from '../../../services/api';
import { formatPhoneNumber } from '../../../utils/format';
import { Loading } from '../../../components/Loading';

import { ToastError } from '../../../components/Message';
import { Form, Select, Checkbox } from '../../../components';

interface IFilters {
  phone: string;
  onlyGroup: boolean;
}

interface IContact {
  id: string;
  name: string;
}

interface IToken {
  phone: string;
}

export interface ISelect {
  value: string;
  label: string;
}

const ListContacts: React.FC = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [phones, setPhones] = useState<ISelect[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPhones = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/tokens');
      const formattedData = data.map((item: IToken) => ({
        value: item.phone.substring(2),
        label: formatPhoneNumber(item.phone),
      }));
      setPhones(formattedData);
    } catch (error) {
      ToastError('Não foi possivel carregar os remetentes');
    }
    setLoading(false);
  }, []);

  const loadContacts = useCallback(async ({ phone, onlyGroup }: IFilters) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/contacts/${phone}`, {
        params: { onlyGroup },
      });

      const formattedContacts = data.contacts.map((contact: IContact) => ({
        ...contact,
        id: contact.id.substr(2, contact.id.length),
      }));

      setContacts(formattedContacts);
    } catch (error) {
      ToastError('Não foi possivel carregar os dados');
      setContacts([]);
    }
    setLoading(false);
  }, []);

  const handleSearch = useCallback(
    data => {
      loadContacts({ phone: data.phone, onlyGroup: data.onlyGroup });
    },
    [loadContacts],
  );

  useEffect(() => {
    loadPhones();
  }, [loadPhones]);

  return (
    <Container>
      <Content>
        <Header>
          <Form onSubmit={handleSearch}>
            <Filter>
              <Row>
                <Column>
                  <Select
                    name="phone"
                    label="Celular"
                    options={phones}
                    isClearable
                  />
                </Column>

                <Column width="160px">
                  <Checkbox name="onlyGroup" label="Somente grupo" />
                </Column>

                <SearchButton disabled={loading}>
                  {loading ? <Loading size="20" /> : <FiSearch size="20" />}
                  Pesquisar
                </SearchButton>
              </Row>
            </Filter>
          </Form>
        </Header>

        {!loading && contacts.length === 0 && (
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

        {contacts.map(contact => (
          <Card key={contact.id}>
            <Column>
              <Row>
                <Column>
                  <Row>
                    <CardItem>Nome:</CardItem>
                    {contact.name}
                  </Row>
                </Column>
                <Column>
                  <Row>
                    <CardItem>Número:</CardItem>
                    {contact.id}
                  </Row>
                </Column>
              </Row>
            </Column>
          </Card>
        ))}
      </Content>
    </Container>
  );
};

export default ListContacts;
