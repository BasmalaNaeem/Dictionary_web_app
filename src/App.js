import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import fontNames from './utils/font-names';
import Word from './components/Word';
import useFetch from './hooks/useFetch';

function App() {
  const [currentFont, setCurrentFont] = useState(localStorage.getItem('current-font') ?? 'Serif');
  const [input, setInput] = useState('keyboard');
  const [fetchUrl, setFetchUrl] = useState(`https://api.dictionaryapi.dev/api/v2/entries/en/keyboard`);

  const { data: word, isLoading, isError } = useFetch(fetchUrl);

  const fontClass = fontNames[currentFont];

  useEffect(() => {
    localStorage.setItem('current-font', currentFont);
  }, [currentFont]);

  useEffect(() => {
    if (input) {
      setFetchUrl(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
    }
  }, [input]);
//   useEffect(() => {
//   if (input) {
//     setFetchUrl(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
//   }
// }, [input]);
  const fetchData = (input) => {
    setInput(input);
  };


  return (
    <BrowserRouter>
      <div className={`${fontClass} desktop:container px-6  tablet:px-10 text-black-3 dark:text-white dark:bg-black text-body-m`}>
        <Header currentFont={currentFont} applyFont={setCurrentFont} />
        <Search fetchData={fetchData} />
        {!isLoading && !isError && <Word data={word} isError={isError} />}
      </div>
    </BrowserRouter>
  );
}

export default App;



