import './App.css'
import { TheChart } from './Chart'

import bekken5mai from './data/bekken-5-mai.json';
import lianvannet12mai from './data/lianvannet-12-mai.json';
import bekken19mai from './data/bekken-19-mai.json';
import lian2juni from './data/lian-2-juni.json';
import nilsbyen9juni from './data/nilsbyen-9-juni.json';
import strandlinjen16juni from './data/strandlinjen-16-juni.json';
import strandlinjen18august from './data/strandlinjen-18-august.json';
import lian25august from './data/lian-25-august.json';

import { useState } from 'react';

export type Gender = string; // 'M'|''|'F';
export interface DataSet {
  title: string,
  data: {
    ClassAgeFrom: number;
    NetTime: number;
    NameFormatted: string;
    Gender: Gender;
  }[]
}


const dataSets = [
  { title: 'Bekken 5 mai', data: bekken5mai, },
  { title: 'Lianvannet 12 mai', data: lianvannet12mai, },
  { title: 'Bekken 19 mai', data: bekken19mai, },
  { title: 'Lian 2 juni', data: lian2juni, },
  { title: 'Nilsbyen 9 juni', data: nilsbyen9juni, },
  { title: 'Strandlinjen 16 juni', data: strandlinjen16juni, },
  { title: 'Strandlinjen 18 august', data: strandlinjen18august, },
  { title: 'Strandlinjen 18 august', data: lian25august, },
];


function App() {
  const [dataset, setDataset] = useState(dataSets[0]);
  const [filter, setFilter] = useState('Jonas');
  const [gender, setGender] = useState<Gender>('B');

  return <>
    <strong>Chart</strong>
    <TheChart dataset={dataset} filter={filter} gender={gender} />
    <div>
        {dataSets.map(dataset => (
          <button key={dataset.title} onClick={() => setDataset(dataset)}>{dataset.title}</button>
        ))}
    </div>
    <div>
        <label htmlFor='filter'>Filtrer:</label>
        <input id="filter" type="text" value={filter} onChange={(event) => setFilter(event.target.value)} />
        
        <div onChange={evt => setGender((evt.target as any).value) }> 
           <label htmlFor="theme-auto">
              <input type="radio" value="B" name="gender" />
              Begge
           </label>
           <label htmlFor="theme-dark">
            <input type="radio" value="M" name="gender"/> 
            Herrer</label> 
             <label htmlFor="theme-light">
           <input type="radio" value="F" name="gender" />
              Kvinner</label> 
          </div>

    </div>
  </>
}

export default App
