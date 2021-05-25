import axios from 'axios';
import { useEffect, useState } from 'react';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import { Row } from 'react-bootstrap';
import AlertBanner from '../common/AlertBanner';
import { pricePerItem } from '../../constants';
import { useOrderDetails } from '../../context/OrderDetails';
import { formatCurrency } from '../../utilities';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

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
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => {
    const { name, imagePath } = item;
    return (
      <ItemComponent
        key={name}
        name={name}
        imagePath={imagePath}
        updateItemCount={(itemName, newItemCount) =>
          updateItemCount(itemName, newItemCount, optionType)
        }
      />
    );
  });

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>;
    </>
  );
};

export default Options;
