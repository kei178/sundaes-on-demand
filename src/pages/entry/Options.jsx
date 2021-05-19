import axios from 'axios';
import { useEffect, useState } from 'react';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import { Row } from 'react-bootstrap';
import AlertBanner from '../common/AlertBanner';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((_err) => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => {
    const { name, imagePath } = item;
    return <ItemComponent key={name} name={name} imagePath={imagePath} />;
  });

  return <Row>{optionItems}</Row>;
};

export default Options;
