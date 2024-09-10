import React, { useState } from 'react';
import {Button, Card,Grid, Stack, IconButton, InputAdornment,TextField, } from '@mui/material';

const EnterMark = ({ marks, outOf, callback }) => {
  const [admission, setAdmission] = useState('');
  const [mark, setMark] = useState('');

  const handleAdd = () => {
    const markObject = marks.find(m => m.admission === parseInt(admission));
    if(markObject){

        if ( parseFloat(markObject.mark)< parseFloat(outOf)) {
            markObject.mark = parseFloat(mark);
            markObject.outOf = parseFloat(outOf);
            callback(markObject);
          }
          setAdmission('');
          setMark('');
        };
    }
    

  return (
    <div>
      <input
        type="text"
        placeholder="Admission"
        value={admission}
        onChange={e => setAdmission(e.target.value)}
      />
      {marks.some(m => m.admission === parseInt(admission)) && (
        <>
          <input
            type="text"
            placeholder="Mark"
            value={mark}
            onChange={e => setMark(e.target.value)}
          />
          <button onClick={handleAdd}>Add</button>
        </>
      )}
    </div>
  );
};

export default EnterMark;
