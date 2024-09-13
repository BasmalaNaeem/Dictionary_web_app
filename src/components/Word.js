import { useEffect, useRef } from 'react';
import Meaning from './Meaning';
import playIcon from '../assets/images/icon-play.svg';
import newWindowIcon from '../assets/images/icon-new-window.svg';

export default function Word({ data }) {
  const audioRef = useRef(null);

  const validPhonetics = data?.[0]?.phonetics?.find(phonetic => phonetic.text && phonetic.audio);

  useEffect(() => {
    if (validPhonetics?.audio) {
      audioRef.current = new Audio(validPhonetics.audio);
    }
  }, [validPhonetics?.audio]);

  function playAudio() {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  }

  const meanings = data?.[0]?.meanings?.map((meaning, index) => (
    <Meaning key={index} meaning={meaning} />
  ));

  return (
    <main className="mt-10 mb-[5.25rem] tablet:mt-11 tablet:mb-[7.75rem] bg-white dark:bg-black text-black dark:text-white">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-mobile-heading-l tablet:text-heading-l tablet:leading-heading-l font-bold tablet:mb-2">
            {data?.[0]?.word || 'No word available'}
          </h1>
          <p className="text-purple-500 text-body-m leading-body-m tablet:text-heading-m tablet:leading-heading-m">
            {validPhonetics?.text || 'No phonetic available'}
          </p>
        </div>
        {validPhonetics?.audio ? (
          <button aria-label="Play" onClick={playAudio}>
            <img src={playIcon} aria-hidden="true" alt="Play icon" className="w-[48px] tablet:w-[75px]" />
          </button>
        ) : (
          <p>No audio available</p>
        )}
      </div>
      {meanings?.length > 0 ? meanings : <p>No meanings available</p>}
      <div className="mt-8 tablet:mt-[2.375rem] pt-6 tablet:pt-[1.125rem] border-t-[1px] border-t-gray-2 dark:border-t-gray-700 text-body-s leading-body-s tablet:flex items-center">
        <div className="text-gray dark:text-gray-300 mb-2 underline tablet:mr-5 tablet:mb-0">Source</div>
        <div className="flex">
          <a href={data?.[0]?.sourceUrls?.[0] || '#'} className="underline mr-2" target="_blank" rel="noopener noreferrer">
            {data?.[0]?.sourceUrls?.[0] || 'No source available'}
          </a>
          <img src={newWindowIcon} alt="External link" />
        </div>
      </div>
    </main>
  );
}
