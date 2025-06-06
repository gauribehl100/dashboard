import React from 'react';
import { useSelector } from 'react-redux';
import { TrendUp, TrendDown, BookOpen, Rocket, PenNib, Gear } from 'phosphor-react';

const iconList = [Rocket, PenNib, Gear, BookOpen];

export default function ChapterList() {
  const { activeSubject, data } = useSelector(state => state.chapters);
  const filters = useSelector(state => state.filters);

  const getTrendIcon = (counts) => {
    const years = Object.keys(counts).sort();
    const a = counts[years.at(-2)], b = counts[years.at(-1)];
    if (b > a) return <TrendUp size={16} className="text-green-500" />;
    if (b < a) return <TrendDown size={16} className="text-red-500" />;
    return null;
  };

  const getStatusClass = (status) => {
    const map = {
      Completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'Not Started': 'bg-gray-100 text-gray-800 dark:bg-grey-800 dark:text-gray-200'
    };
    return map[status] || map['Not Started'];
  };

  const filtered = data.filter(ch => {
    if (ch.subject !== activeSubject) return false;
    if (filters.classes.length && !filters.classes.includes(ch.class)) return false;
    if (filters.units.length && !filters.units.includes(ch.unit)) return false;
    if (filters.status && ch.status !== filters.status) return false;
    if (filters.weakChapters && !ch.isWeakChapter) return false;
    return true;
  }).sort((a, b) => {
    const ta = Object.values(a.yearWiseQuestionCount).reduce((x, y) => x + y, 0);
    const tb = Object.values(b.yearWiseQuestionCount).reduce((x, y) => x + y, 0);
    return filters.sortAscending ? ta - tb : tb - ta;
  });

  return (
    <div className="grid gap-4">
      {filtered.length ? filtered.map((ch, i) => {
        const total = Object.values(ch.yearWiseQuestionCount).reduce((a, b) => a + b, 0);
        const Icon = iconList[ch.chapter.length % iconList.length];
        return (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 border hover:shadow">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Icon size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {ch.chapter} {ch.isWeakChapter && <span className="text-xs ml-2 px-2 py-0.5 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">Weak</span>}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{ch.class} • {ch.unit}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {total} {getTrendIcon(ch.yearWiseQuestionCount)}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{ch.questionSolved} solved</p>
                <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${getStatusClass(ch.status)}`}>{ch.status}</span>
              </div>
            </div>
          </div>
        );
      }) : (
        <div className="text-center py-10">
          <BookOpen size={40} className="mx-auto text-gray-400 dark:text-gray-600" />
          <p className="mt-2 text-gray-600 dark:text-gray-300">No chapters match the filters</p>
        </div>
      )}
    </div>
  );
}
