import './App.css'
import { TheChart } from './Chart'

import bekken5mai from './data/bekken-5-mai.json';
import lianvannet12mai from './data/lianvannet-12-mai.json';
import bekken19mai from './data/bekken-19-mai.json';
import lian2juni from './data/lian-2-juni.json';
import nilsbyen9juni from './data/nilsbyen-9-juni.json';
import strandlinjen16juni from './data/strandlinjen-16-juni.json';

import { useState } from 'react';

export interface DataSet {
  title: string,
  data: {
    ClassAgeFrom: number;
    NetTime: number;
    NameFormatted: string;
  }[]
}


const dataSets = [
  { title: 'Bekken 5 mai', data: bekken5mai, },
  { title: 'Lianvannet 12 mai', data: lianvannet12mai, },
  { title: 'Bekken 19 mai', data: bekken19mai, },
  { title: 'Lian 2 juni', data: lian2juni, },
  { title: 'Nilsbyen 9 juni', data: nilsbyen9juni, },
  { title: 'Strandlinjen 16 juni', data: strandlinjen16juni, },
];


function App() {
  const [dataset, setDataset] = useState(dataSets[0]);
  const [filter, setFilter] = useState('');

  return <>
    <strong>Chart</strong>
    <TheChart dataset={dataset} filter={filter} />
    <div>
        {dataSets.map(dataset => (
          <button onClick={() => setDataset(dataset)}>{dataset.title}</button>
        ))}
    </div>
    <div>
        <input onChange={(event) => setFilter(event.target.value)} />
    </div>
  </>
}

export default App
