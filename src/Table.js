const key = require('./url');

export const columns = [
  {
    title: 'Coin',
    dataIndex: 'coin',
    render: text => <b>{text}</b>
  },
  {
    title: 'Price',
    dataIndex: 'price'
  },
  {
    title: '24h',
    dataIndex: 'aDay',
    render: text => <a>{text}</a>
  },
  {
    title: '7d',
    dataIndex: 'sevenDay',
    render: text => <a>{text}</a>
  },
  {
    title: '1 month',
    dataIndex: 'aMonth',
    render: text => <a>{text}</a>
  },
  {
    title: '24h Volume',
    dataIndex: 'volume'
  },
  {
    title: 'Mkt Cap',
    dataIndex: 'mktCap',
    defaultSortOrder: 'descend',
    sorter: (a, b) => parseInt(a.mktCap.substring(1, a.mktCap.length).replace(/,/g, '')) - parseInt(b.mktCap.substring(1, b.mktCap.length).replace(/,/g, ''))
  },
];

export const getData = async () => {
  const resp = await fetch(key.url);
  const data = await resp.json()
  return data
}
