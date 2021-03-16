import React, { useCallback, useState } from 'react';
import { FiUser, FiLock, FiLogIn } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.png';
import { Form, Input, Button } from '../../components';
import { Container, Content } from './styles';
import { useAuth } from '../../hooks/auth';
import { ToastError } from '../../components/Message';

interface ISignInFormData {
  username: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();

  const history = useHistory();
  delete history.location.state;

  const schema = Yup.object().shape({
    username: Yup.string().required('Usuário é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
  });

  const handleSubmit = useCallback(
    async ({ username, password }: ISignInFormData) => {
      setIsLoading(true);

      try {
        await signIn({ username, password });

        history.push('/home');
      } catch ({ response }) {
        ToastError(
          'Falha na autenticação. Verifique seus dados e tente novamente',
        );
      }
      setIsLoading(false);
    },
    [history, signIn],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} width="100px" alt="Logotipo" />

        <Form onSubmit={handleSubmit} schema={schema}>
          <Input
            name="username"
            icon={FiUser}
            placeholder="Digite seu usuário"
          />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Digite sua senha"
          />
          <Button type="submit" loading={isLoading}>
            <FiLogIn size="20" />
            ENTRAR
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
