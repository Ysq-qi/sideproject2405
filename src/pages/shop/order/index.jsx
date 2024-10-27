import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, 
  Table, 
  TableHeader, 
  TableRow, 
  TableCell, 
  Title, 
  ProductTable, 
  ExpandableRow,
  NoOrderData
} from './style';
import { fetchOrders } from './orderSlice';

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated); 
  const { orders, loading, error } = useSelector((state) => state.order);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleToggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <Container>
        <Title>載入中...</Title>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>錯誤：{error}</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Title>訂單列表</Title>
      {orders.length === 0 ? (
        <NoOrderData>您尚未有任何訂單。</NoOrderData>
      ) : (
        <Table>
          <thead>
            <TableRow>
              <TableHeader>訂單編號</TableHeader>
              <TableHeader>訂單日期</TableHeader>
              <TableHeader>狀態</TableHeader>
              <TableHeader>寄送方式</TableHeader>
              <TableHeader>付款狀態</TableHeader>
              <TableHeader>備註</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {orders.map(order => (
              <React.Fragment key={order.orderId}>
                <TableRow onClick={() => handleToggleExpand(order.orderId)}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
                      : '無法顯示時間'}
                  </TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.shippingMethod}</TableCell>
                  <TableCell>{order.paymentStatus}</TableCell>
                  <TableCell>{order.note}</TableCell>
                </TableRow>
                {expandedOrderId === order.orderId && (
                  <ExpandableRow>
                    <TableCell colSpan="6">
                      <ProductTable>
                        <thead>
                          <TableRow>
                            <TableHeader>商品名稱</TableHeader>
                            <TableHeader>規格</TableHeader>
                            <TableHeader>數量</TableHeader>
                            <TableHeader>單價</TableHeader>
                            <TableHeader>小計</TableHeader>
                          </TableRow>
                        </thead>
                        <tbody>
                          {order.items.map(item => (
                            <TableRow key={`${item.id}-${item.color}-${item.size}`}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{`${item.color} / ${item.size}`}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.price} 元</TableCell>
                              <TableCell>{item.price * item.quantity} 元</TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell colSpan="4" style={{ textAlign: 'right', fontWeight: 'bold' }}>總金額：</TableCell>
                            <TableCell>{order.totalAmount} 元</TableCell>
                          </TableRow>
                        </tbody>
                      </ProductTable>
                    </TableCell>
                  </ExpandableRow>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Order;