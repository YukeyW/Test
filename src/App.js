import React, { useState, useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import { columns, getData } from './Table';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setData(await getData());
    }
    fetchData();
  }, []);

  const onChange = (sorter) => {
    console.log('params', sorter);
  }

  return (
    <div className="App">
    <Table columns={columns} dataSource={data} onChange={onChange} />
  </div>
  );
}

export default App;
