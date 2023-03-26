import FormData from 'form-data';
import { useState } from 'react';
import { postRequest } from '../../../utils/axios.utils';

export const ProductGenerator = () => {
  const [generation, setGeneration] = useState('x');
  const [size, setGenerationSize] = useState(100);
  const [files, setGenerateFiles] = useState<File[]>([]);

  const generate = async () => {
    const formData = new FormData();

    files.forEach(file => {
      formData.append('files', file);
    });

    await postRequest(`product/generate/${generation}/${size}`, formData);
  };

  return <div>
    <input type="text"
           placeholder="generation"
           value={generation}
           onChange={e => setGeneration(e.target.value)}/>
    <input type="number"
           placeholder="size"
           value={size}
           onChange={e => setGenerationSize(Number(e.target.value))}/>
    <input type="file"
           multiple
           onChange={e => setGenerateFiles(Array.from(e.target.files!))}/>

    <button onClick={generate}>
      GENERATE
    </button>
  </div>;
};