import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { setActiveSubject } from '@/store/chaptersSlice';
import { Planet, Atom, Calculator } from 'phosphor-react';

const subjects = ['Physics', 'Chemistry', 'Mathematics'];
const subjectIcons = { Physics: Planet, Chemistry: Atom, Mathematics: Calculator };

export default function SubjectTabs() {
  const dispatch = useDispatch();
  const activeSubject = useSelector(state => state.chapters.activeSubject);

  return (
    <div className="flex gap-4 flex-wrap justify-center mb-6">
      {subjects.map(subject => {
        const Icon = subjectIcons[subject];
        return (
          <Button
            key={subject}
            variant={activeSubject === subject ? 'default' : 'outline'}
            onClick={() => dispatch(setActiveSubject(subject))}
          >
            <Icon size={16} className="mr-2" />
            {subject}
          </Button>
        );
      })}
    </div>
  );
}
