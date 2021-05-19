import axios from 'axios';
import { useEffect, useState } from 'react';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import { Row } from 'react-bootstrap';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        // TODO: handle error message
        console.log(err);
      });
  }, [optionType]);

  // TODO: replace null with ToppingOptions
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => {
    const { name, imagePath } = item;
    return <ItemComponent key={name} name={name} imagePath={imagePath} />;
  });

  return <Row>{optionItems}</Row>;
};

export default Options;
