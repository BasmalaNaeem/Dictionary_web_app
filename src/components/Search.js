import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Search({ fetchData }) {
  const [queryParams, setQueryParams] = useSearchParams();
  const initialInput = queryParams.get('word') ?? 'keyboard';

  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState(true);

  const invalidClass = !isValid ? 'border-[1px] border-red' : '';

  useEffect(() => {
    setInput(initialInput);
    fetchData(initialInput);
  }, [initialInput, fetchData]); // Include `fetchData` in the dependency array

  function handleChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (input.length < 1) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    setQueryParams({ word: input });
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        className={`w-full bg-gray-200 dark:bg-gray-600 leading-[1.25rem] rounded-2xl py-[0.875rem] pl-6 pr-14 tablet:py-5 tablet:pl-6 tablet:pr-18 
        text-default tablet:text-20 font-bold placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none focus:outline-purple ${invalidClass}`}
        value={input}
        onChange={handleChange}
        placeholder="Search for any word…"
      />
      {!isValid && <div className="text-red mt-2">Whoops, can’t be empty…</div>}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
      >
        <path
          fill="none"
          stroke="#A445ED"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
        />
      </svg>
    </form>
  );
  
}
