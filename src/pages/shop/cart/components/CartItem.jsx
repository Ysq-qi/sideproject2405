import React from 'react';
import {
  TableRow, 
  TableCell, 
  Input, 
  Button, 
  ProductImage 
} from '../style';

const CartItem = React.memo(({ item, onQuantityChange, onRemove }) => (
  <TableRow>
    <TableCell>
      <ProductImage src={item.imageUrl} alt={item.name} />
    </TableCell>
    <TableCell>{item.id}</TableCell>
    <TableCell>{item.name}</TableCell>
    <TableCell>
      {item.color} - {item.size}
    </TableCell>
    <TableCell>
      <Input
        type="number"
        value={item.quantity}
        min="1"
        max="20"
        autoComplete="off"
        onChange={(e) =>
          onQuantityChange(item.id, item.color, item.size, Number(e.target.value))
        }
      />
    </TableCell>
    <TableCell>{item.price}</TableCell>
    <TableCell>{item.price * item.quantity}</TableCell>
    <TableCell>
      <Button onClick={() => onRemove(item.id, item.color, item.size)}>刪除</Button>
    </TableCell>
  </TableRow>
));

export default CartItem;