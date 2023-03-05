import React, { useEffect } from 'react';
import useTableItems from './store';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const items = useTableItems(state => state.items);
  const loading = useTableItems(state => state.loading);
  const filter = useTableItems(state => state.filter);

  const loadItems = useTableItems(state => state.loadItems);
  const appendItems = useTableItems(state => state.appendItems);
  const toggleItem = useTableItems(state => state.toggleItem);
  const setFilter = useTableItems(state => state.setFilter);

  useEffect(() => {
    loadItems();
  }, [filter]);

  if (loading) {
    return (
      <>
        Loading...
      </>
    );
  }

  const handleScroll = () => {
    const page = (items.length / 20) + 1;
    appendItems(20, page);
  }

  const handleItemChecked = (id: number, checked: boolean) => {
    toggleItem(id, checked);
  }

  return (
    <>
      <div>
        <label>Filter</label>
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      <InfiniteScroll style={{ overflow: 'auto' }}
                      height={300}
                      next={handleScroll}
                      hasMore={items.length !== 100}
                      loader={null}
                      dataLength={items.length}
                      scrollThreshold={0.8}>
        <table style={{ marginTop: 50 }}>
          <tr>
            <th />
            <th>ID</th>
            <th>Title</th>
          </tr>
          <tbody>
          {items.map((item: any) => (
            <tr>
              <td>
                <input type="checkbox" checked={item.checked} onChange={() => handleItemChecked(item.id, item.checked)} />
              </td>
              <td>{item.id}</td>
              <td>{item.title}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </>
  );
}

export default App;
