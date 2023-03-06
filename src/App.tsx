import React, { useEffect, useState } from 'react';
import useTableItems from './store';
import InfiniteScroll from 'react-infinite-scroll-component';

function InfoTable({ type }: any) {
  const [filter, setFilter] = useState('');
  const [total, setTotal] = useState(0);

  const userInfo = useTableItems(state => state.userInfo);
  const items = useTableItems(state => state.items);
  const loading = useTableItems(state => state.loading);

  const getUserInfo = useTableItems(state => state.getUserInfo);
  const loadItems = useTableItems(state => state.loadItems);
  const appendItems = useTableItems(state => state.appendItems);
  const toggleItem = useTableItems(state => state.toggleItem);

  useEffect(() => {
    if (type === 'user') {
      getUserInfo();
    }
    loadItems(filter);
  }, [filter, type]);

  useEffect(() => {
    items.forEach(item => {
      item.description = `User: ${userInfo.name}`;
    });
  }, [items]);

  if (loading) {
    return (
      <>
        Loading...
      </>
    );
  }

  const handleScroll = () => {
    const page = (items.length / 100) + 1;
    appendItems(filter, 100, page);
  };

  const handleItemChecked = (id: number, checked: boolean) => {
    toggleItem(id, checked);
  };

  const handleSendItems = () => {
    let total = 0;
    for (let item of items) {
      if (item.checked) {
        total += item.price;
        setTotal(total);
      }
    }
  };


  return (
    <>
      <div>
        <div>Name: {userInfo.name}</div>
        <div>Age {userInfo.age}</div>
      </div>

      <div style={{ marginTop: 50 }}>
        <label>Filter</label>
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      <InfiniteScroll style={{ overflow: 'auto' }}
                      height={300}
                      next={handleScroll}
                      hasMore={items.length !== 500}
                      loader={null}
                      dataLength={items.length}
                      scrollThreshold={0.8}>
        <table style={{ marginTop: 50 }}>
          <tr>
            <th />
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
          <tbody>
          {items.map((item: any) => (
            <tr>
              <td>
                <input type="checkbox" checked={item.checked}
                       onChange={() => handleItemChecked(item.id, item.checked)} />
              </td>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </InfiniteScroll>
      <button onClick={handleSendItems}>
        Send
      </button>
      <div>
        Total: {total}
      </div>
    </>
  );
}

export default InfoTable;
