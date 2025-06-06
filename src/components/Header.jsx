import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Moon, Sun } from 'phosphor-react';
import { setDarkMode } from '@/store/uiSlice';

export default function Header() {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.ui.darkMode);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white">JEE Dashboard</h1>
      <button
        onClick={() => dispatch(setDarkMode(!darkMode))}
        className="text-gray-500 dark:text-gray-300"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
}




