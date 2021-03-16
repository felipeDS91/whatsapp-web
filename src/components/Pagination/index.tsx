import React from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

import { Button, PaginationContainer } from './styles';

interface IParams {
  info: {
    page: number;
    pages: number;
    total: number;
  };
  handlePage: (page: number) => void;
}

const Pagination: React.FC<IParams> = ({ info, handlePage }) => {
  const { page, pages, total } = info;

  return (
    <PaginationContainer>
      <Button
        disabled={!(page > 1 && total)}
        onClick={() => handlePage(page - 1)}
      >
        <MdKeyboardArrowLeft size="20" />
        Anterior
      </Button>

      <span>{pages > 0 && `Página ${page} de ${pages}`}</span>

      <Button
        disabled={!(page < pages && total)}
        onClick={() => handlePage(page + 1)}
      >
        Próxima
        <MdKeyboardArrowRight size="20" />
      </Button>
    </PaginationContainer>
  );
};

export default Pagination;
