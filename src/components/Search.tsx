import React from 'react';
import { useInput } from '../hooks/useInput';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Аллергия', id: 0 },
  { name: 'Пищеварительная система', id: 1 },
  { name: 'Гематология', id: 2 }
]

const products = [
  { name: 'Уголь активированный', id: 0 },
  { name: 'Парацетамол', id: 1 },
  { name: 'Ношпа', id: 2 }
]

const Search: React.FC = () => {

  const [inputValue, changeHandler] = useInput()

  return (
    <div>
      <input
        type='text'
        value={inputValue}
        onChange={changeHandler}
      />

      <div style={{ position: 'absolute' }}>

        <div>Категории</div>
        <ul>
          {
            categories.map((elem) => (
              <li>
                <Link to={`/category/${elem.id}`} >
                  {elem.name}
                </Link>
              </li>
            ))
          }
        </ul>

        <div>Товары</div>
        <ul>
          {
            products.map((elem) => (
              <li>
                <Link to={`/product/${elem.id}`} >
                  {elem.name}
                </Link>
              </li>
            ))
          }
        </ul>

      </div>
    </div>
  );
};

export { Search };