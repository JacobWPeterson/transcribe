import React from 'react';
import { Definition, Word } from '../../styles.js';

const DictionaryEntry = ({ word, definition }) => (
  <>
    <Word id={word}>{word}</Word>
    <Definition>{definition}</Definition>
  </>
);

export default DictionaryEntry;
