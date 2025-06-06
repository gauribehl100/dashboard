import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setClassFilter,
  setUnitFilter,
  setStatusFilter,
  setWeakChaptersFilter,
  setSortOrder,
  clearAllFilters
} from '@/store/filtersSlice';
import { Button } from '@/components/ui/button';

export default function FiltersPanel() {
  const dispatch = useDispatch();
  const { classes, units, status, weakChapters, sortAscending } = useSelector(state => state.filters);
  const activeSubject = useSelector(state => state.chapters.activeSubject);
  const data = useSelector(state => state.chapters.data);

  const current = data.filter(ch => ch.subject === activeSubject);
  const allClasses = [...new Set(current.map(ch => ch.class))];
  const allUnits = [...new Set(current.map(ch => ch.unit))];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Filters</h2>
      <div className="flex gap-3 flex-wrap">
        {allClasses.map(cls => (
          <label key={cls} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={classes.includes(cls)}
              onChange={() => dispatch(setClassFilter(cls))}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{cls}</span>
          </label>
        ))}
        {allUnits.map(unit => (
          <label key={unit} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={units.includes(unit)}
              onChange={() => dispatch(setUnitFilter(unit))}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{unit}</span>
          </label>
        ))}
      </div>
      <div className="mt-3 flex gap-3">
        {['Not Started', 'In Progress', 'Completed'].map(stat => (
          <Button
            key={stat}
            variant="ghost"
            onClick={() => dispatch(setStatusFilter(stat === status ? '' : stat))}
          >
            {status === stat ? '✅' : ''} {stat}
          </Button>
        ))}
        <Button onClick={() => dispatch(setWeakChaptersFilter(!weakChapters))}>
          {weakChapters ? '✅' : ''} Weak Chapters
        </Button>
        <Button onClick={() => dispatch(setSortOrder(!sortAscending))}>
          Sort: {sortAscending ? '⬆️' : '⬇️'}
        </Button>
        <Button variant="destructive" onClick={() => dispatch(clearAllFilters())}>
          Clear All
        </Button>
      </div>
    </div>
  );
}