'use client';

import { useEffect, useMemo,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { ChevronDown, Moon, Sun, BookOpen, Calculator, Atom, Zap } from 'lucide-react';
import {ArrowUp,ArrowDown, 
  Atom, 
  BookOpen, 
  Sun, 
  Moon, 
  CaretDown,
  Calculator,
  Lightning} from 'phosphor-react'
import { Button } from '../ui/button';
import { Checkbox } from '../ui/CheckBox';
import { setActiveSubject } from '../store/chaptersSlice';
import { 
  setClassFilter, 
  setUnitFilter, 
  setStatusFilter, 
  setWeakChaptersFilter, 
  setSortOrder, 
  clearAllFilters 
} from '@/store/filtersSlice';
import { 
  toggleDarkMode, 
  setDarkMode, 
  toggleFilterDropdown, 
  closeAllFilterDropdowns 
} from '@/store/uiSlice';

// Mock data (replace with your actual data)
const mockData = [
 {
    "subject": "Physics",
    "chapter": "Mathematics in Physics",
    "class": "Class 11",
    "unit": "Mechanics 1",
    "yearWiseQuestionCount": {
      "2019": 0,
      "2020": 2,
      "2021": 5,
      "2022": 5,
      "2023": 3,
      "2024": 7,
      "2025": 6
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": false
  },
  {
    "subject": "Physics",
    "chapter": "Units and Dimensions",
    "class": "Class 11",
    "unit": "Mechanics 1",
    "yearWiseQuestionCount": {
      "2019": 2,
      "2020": 6,
      "2021": 8,
      "2022": 4,
      "2023": 6,
      "2024": 3,
      "2025": 10
    },
    "questionSolved": 39,
    "status": "Completed",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Motion In One Dimension",
    "class": "Class 11",
    "unit": "Mechanics 1",
    "yearWiseQuestionCount": {
      "2019": 2,
      "2020": 10,
      "2021": 6,
      "2022": 7,
      "2023": 0,
      "2024": 2,
      "2025": 6
    },
    "questionSolved": 33,
    "status": "Completed",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Motion In Two Dimensions",
    "class": "Class 11",
    "unit": "Mechanics 1",
    "yearWiseQuestionCount": {
      "2019": 3,
      "2020": 10,
      "2021": 2,
      "2022": 7,
      "2023": 8,
      "2024": 0,
      "2025": 8
    },
    "questionSolved": 38,
    "status": "Completed",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Laws of Motion",
    "class": "Class 11",
    "unit": "Mechanics 1",
    "yearWiseQuestionCount": {
      "2019": 3,
      "2020": 0,
      "2021": 6,
      "2022": 5,
      "2023": 8,
      "2024": 6,
      "2025": 8
    },
    "questionSolved": 36,
    "status": "Completed",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Work Power Energy",
    "class": "Class 11",
    "unit": "Mechanics 1",
    "yearWiseQuestionCount": {
      "2019": 10,
      "2020": 4,
      "2021": 9,
      "2022": 10,
      "2023": 2,
      "2024": 7,
      "2025": 5
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Center of Mass Momentum and Collision",
    "class": "Class 11",
    "unit": "Mechanics 1",
    "yearWiseQuestionCount": {
      "2019": 7,
      "2020": 5,
      "2021": 2,
      "2022": 7,
      "2023": 6,
      "2024": 10,
      "2025": 0
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Rotational Motion",
    "class": "Class 11",
    "unit": "Mechanics 1",
    "yearWiseQuestionCount": {
      "2019": 9,
      "2020": 9,
      "2021": 9,
      "2022": 9,
      "2023": 9,
      "2024": 2,
      "2025": 5
    },
    "questionSolved": 52,
    "status": "Completed",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Gravitation",
    "class": "Class 11",
    "unit": "Mechanics 1",
    "yearWiseQuestionCount": {
      "2019": 3,
      "2020": 4,
      "2021": 5,
      "2022": 9,
      "2023": 0,
      "2024": 6,
      "2025": 8
    },
    "questionSolved": 35,
    "status": "Completed",
    "isWeakChapter": false
  },
  {
    "subject": "Physics",
    "chapter": "Mechanical Properties of Solids",
    "class": "Class 11",
    "unit": "Mechanics 2",
    "yearWiseQuestionCount": {
      "2019": 4,
      "2020": 6,
      "2021": 0,
      "2022": 2,
      "2023": 10,
      "2024": 10,
      "2025": 7
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": false
  },
  {
    "subject": "Physics",
    "chapter": "Mechanical Properties of Fluids",
    "class": "Class 11",
    "unit": "Mechanics 2",
    "yearWiseQuestionCount": {
      "2019": 2,
      "2020": 0,
      "2021": 1,
      "2022": 0,
      "2023": 0,
      "2024": 7,
      "2025": 8
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": false
  },
  {
    "subject": "Physics",
    "chapter": "Thermal Properties of Matter",
    "class": "Class 11",
    "unit": "Thermodynamics",
    "yearWiseQuestionCount": {
      "2019": 6,
      "2020": 9,
      "2021": 10,
      "2022": 0,
      "2023": 0,
      "2024": 9,
      "2025": 1
    },
    "questionSolved": 35,
    "status": "Completed",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Thermodynamics",
    "class": "Class 11",
    "unit": "Thermodynamics",
    "yearWiseQuestionCount": {
      "2019": 8,
      "2020": 10,
      "2021": 9,
      "2022": 5,
      "2023": 6,
      "2024": 8,
      "2025": 4
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Kinetic Theory of Gases",
    "class": "Class 11",
    "unit": "Thermodynamics",
    "yearWiseQuestionCount": {
      "2019": 4,
      "2020": 7,
      "2021": 3,
      "2022": 8,
      "2023": 2,
      "2024": 5,
      "2025": 3
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": false
  },
  {
    "subject": "Physics",
    "chapter": "Oscillations",
    "class": "Class 11",
    "unit": "Mechanics 2",
    "yearWiseQuestionCount": {
      "2019": 7,
      "2020": 2,
      "2021": 1,
      "2022": 4,
      "2023": 10,
      "2024": 2,
      "2025": 9
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Waves and Sound",
    "class": "Class 11",
    "unit": "Mechanics 2",
    "yearWiseQuestionCount": {
      "2019": 4,
      "2020": 4,
      "2021": 2,
      "2022": 8,
      "2023": 6,
      "2024": 8,
      "2025": 6
    },
    "questionSolved": 22,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Electrostatics",
    "class": "Class 12",
    "unit": "Electromagnetism",
    "yearWiseQuestionCount": {
      "2019": 0,
      "2020": 1,
      "2021": 3,
      "2022": 1,
      "2023": 3,
      "2024": 3,
      "2025": 7
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": false
  },
  {
    "subject": "Physics",
    "chapter": "Capacitance",
    "class": "Class 12",
    "unit": "Electromagnetism",
    "yearWiseQuestionCount": {
      "2019": 2,
      "2020": 9,
      "2021": 1,
      "2022": 5,
      "2023": 7,
      "2024": 8,
      "2025": 5
    },
    "questionSolved": 11,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Current Electricity",
    "class": "Class 12",
    "unit": "Electromagnetism",
    "yearWiseQuestionCount": {
      "2019": 0,
      "2020": 10,
      "2021": 0,
      "2022": 4,
      "2023": 6,
      "2024": 8,
      "2025": 10
    },
    "questionSolved": 38,
    "status": "Completed",
    "isWeakChapter": false
  },
  {
    "subject": "Physics",
    "chapter": "Magnetic Properties of Matter",
    "class": "Class 12",
    "unit": "Electromagnetism",
    "yearWiseQuestionCount": {
      "2019": 3,
      "2020": 8,
      "2021": 6,
      "2022": 2,
      "2023": 9,
      "2024": 1,
      "2025": 2
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Magnetic Effects of Current",
    "class": "Class 12",
    "unit": "Electromagnetism",
    "yearWiseQuestionCount": {
      "2019": 3,
      "2020": 8,
      "2021": 0,
      "2022": 2,
      "2023": 4,
      "2024": 0,
      "2025": 4
    },
    "questionSolved": 21,
    "status": "Completed",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Electromagnetic Induction",
    "class": "Class 12",
    "unit": "Electromagnetism",
    "yearWiseQuestionCount": {
      "2019": 2,
      "2020": 10,
      "2021": 9,
      "2022": 1,
      "2023": 9,
      "2024": 4,
      "2025": 7
    },
    "questionSolved": 16,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Alternating Current",
    "class": "Class 12",
    "unit": "Electromagnetism",
    "yearWiseQuestionCount": {
      "2019": 8,
      "2020": 4,
      "2021": 5,
      "2022": 9,
      "2023": 1,
      "2024": 10,
      "2025": 9
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Electromagnetic Waves",
    "class": "Class 12",
    "unit": "Miscellaneous",
    "yearWiseQuestionCount": {
      "2019": 10,
      "2020": 6,
      "2021": 0,
      "2022": 2,
      "2023": 5,
      "2024": 9,
      "2025": 9
    },
    "questionSolved": 28,
    "status": "In Progress",
    "isWeakChapter": false
  },
  {
    "subject": "Physics",
    "chapter": "Ray Optics",
    "class": "Class 12",
    "unit": "Optics",
    "yearWiseQuestionCount": {
      "2019": 3,
      "2020": 6,
      "2021": 10,
      "2022": 4,
      "2023": 10,
      "2024": 6,
      "2025": 10
    },
    "questionSolved": 30,
    "status": "In Progress",
    "isWeakChapter": false
  },
  {
    "subject": "Physics",
    "chapter": "Wave Optics",
    "class": "Class 12",
    "unit": "Optics",
    "yearWiseQuestionCount": {
      "2019": 3,
      "2020": 10,
      "2021": 10,
      "2022": 9,
      "2023": 8,
      "2024": 5,
      "2025": 4
    },
    "questionSolved": 6,
    "status": "In Progress",
    "isWeakChapter": false
  },
  {
    "subject": "Physics",
    "chapter": "Dual Nature of Matter",
    "class": "Class 12",
    "unit": "Modern Physics",
    "yearWiseQuestionCount": {
      "2019": 9,
      "2020": 0,
      "2021": 6,
      "2022": 0,
      "2023": 4,
      "2024": 7,
      "2025": 9
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Atomic Physics",
    "class": "Class 12",
    "unit": "Modern Physics",
    "yearWiseQuestionCount": {
      "2019": 6,
      "2020": 4,
      "2021": 1,
      "2022": 7,
      "2023": 4,
      "2024": 2,
      "2025": 1
    },
    "questionSolved": 14,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Nuclear Physics",
    "class": "Class 12",
    "unit": "Modern Physics",
    "yearWiseQuestionCount": {
      "2019": 7,
      "2020": 2,
      "2021": 6,
      "2022": 3,
      "2023": 5,
      "2024": 2,
      "2025": 8
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Semiconductors",
    "class": "Class 12",
    "unit": "Miscellaneous",
    "yearWiseQuestionCount": {
      "2019": 9,
      "2020": 10,
      "2021": 9,
      "2022": 8,
      "2023": 6,
      "2024": 2,
      "2025": 7
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": false
  },
  {
    "subject": "Physics",
    "chapter": "Communication System",
    "class": "Class 12",
    "unit": "Miscellaneous",
    "yearWiseQuestionCount": {
      "2019": 5,
      "2020": 10,
      "2021": 8,
      "2022": 2,
      "2023": 5,
      "2024": 1,
      "2025": 10
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Experimental Physics",
    "class": "Class 12",
    "unit": "Miscellaneous",
    "yearWiseQuestionCount": {
      "2019": 6,
      "2020": 7,
      "2021": 4,
      "2022": 10,
      "2023": 5,
      "2024": 8,
      "2025": 0
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": false
  },
  {
    "subject": "Chemistry",
    "chapter": "Some Basic Concepts of Chemistry",
    "class": "Class 11",
    "unit": "Physical Chemistry",
    "yearWiseQuestionCount": {
      "2019": 8,
      "2020": 2,
      "2021": 8,
      "2022": 2,
      "2023": 7,
      "2024": 8,
      "2025": 4
    },
    "questionSolved": 28,
    "status": "In Progress",
    "isWeakChapter": false
  },
  {
    "subject": "Chemistry",
    "chapter": "Structure of Atom",
    "class": "Class 11",
    "unit": "Physical Chemistry",
    "yearWiseQuestionCount": {
      "2019": 6,
      "2020": 3,
      "2021": 10,
      "2022": 5,
      "2023": 6,
      "2024": 6,
      "2025": 10
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Chemistry",
    "chapter": "Classification of Elements and Periodicity in Properties",
    "class": "Class 11",
    "unit": "Inorganic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 4,
      "2020": 8,
      "2021": 1,
      "2022": 2,
      "2023": 3,
      "2024": 9,
      "2025": 5
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Chemistry",
    "chapter": "Chemical Bonding and Molecular Structure",
    "class": "Class 11",
    "unit": "Inorganic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 7,
      "2020": 5,
      "2021": 2,
      "2022": 0,
      "2023": 5,
      "2024": 5,
      "2025": 3
    },
    "questionSolved": 22,
    "status": "In Progress",
    "isWeakChapter": false
  },
  {
    "subject": "Chemistry",
    "chapter": "States of Matter",
    "class": "Class 11",
    "unit": "Physical Chemistry",
    "yearWiseQuestionCount": {
      "2019": 1,
      "2020": 1,
      "2021": 1,
      "2022": 1,
      "2023": 1,
      "2024": 5,
      "2025": 9
    },
    "questionSolved": 9,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Chemistry",
    "chapter": "Thermodynamics (C)",
    "class": "Class 11",
    "unit": "Physical Chemistry",
    "yearWiseQuestionCount": {
      "2019": 8,
      "2020": 9,
      "2021": 2,
      "2022": 0,
      "2023": 2,
      "2024": 0,
      "2025": 7
    },
    "questionSolved": 28,
    "status": "Completed",
    "isWeakChapter": false
  },
  {
    "subject": "Chemistry",
    "chapter": "Chemical Equilibrium",
    "class": "Class 11",
    "unit": "Physical Chemistry",
    "yearWiseQuestionCount": {
      "2019": 8,
      "2020": 3,
      "2021": 5,
      "2022": 7,
      "2023": 5,
      "2024": 9,
      "2025": 2
    },
    "questionSolved": 35,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Chemistry",
    "chapter": "Ionic Equilibrium",
    "class": "Class 11",
    "unit": "Physical Chemistry",
    "yearWiseQuestionCount": {
      "2019": 5,
      "2020": 2,
      "2021": 7,
      "2022": 3,
      "2023": 4,
      "2024": 5,
      "2025": 2
    },
    "questionSolved": 5,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Chemistry",
    "chapter": "Redox Reactions",
    "class": "Class 11",
    "unit": "Physical Chemistry",
    "yearWiseQuestionCount": {
      "2019": 1,
      "2020": 2,
      "2021": 1,
      "2022": 6,
      "2023": 4,
      "2024": 2,
      "2025": 7
    },
    "questionSolved": 11,
    "status": "In Progress",
    "isWeakChapter": false
  },
  {
    "subject": "Chemistry",
    "chapter": "Hydrogen",
    "class": "Class 11",
    "unit": "Inorganic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 8,
      "2020": 6,
      "2021": 1,
      "2022": 7,
      "2023": 10,
      "2024": 4,
      "2025": 0
    },
    "questionSolved": 36,
    "status": "Completed",
    "isWeakChapter": false
  },
  {
    "subject": "Chemistry",
    "chapter": "s Block Elements",
    "class": "Class 11",
    "unit": "Inorganic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 0,
      "2020": 4,
      "2021": 4,
      "2022": 7,
      "2023": 6,
      "2024": 2,
      "2025": 10
    },
    "questionSolved": 33,
    "status": "Completed",
    "isWeakChapter": true
  },
  {
    "subject": "Chemistry",
    "chapter": "p Block Elements (Group 13 & 14)",
    "class": "Class 11",
    "unit": "Inorganic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 6,
      "2020": 5,
      "2021": 2,
      "2022": 10,
      "2023": 4,
      "2024": 10,
      "2025": 8
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Chemistry",
    "chapter": "General Organic Chemistry",
    "class": "Class 11",
    "unit": "Organic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 9,
      "2020": 0,
      "2021": 0,
      "2022": 7,
      "2023": 6,
      "2024": 5,
      "2025": 6
    },
    "questionSolved": 33,
    "status": "Completed",
    "isWeakChapter": false
  },
  {
    "subject": "Chemistry",
    "chapter": "Hydrocarbons",
    "class": "Class 11",
    "unit": "Organic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 8,
      "2020": 5,
      "2021": 0,
      "2022": 6,
      "2023": 6,
      "2024": 4,
      "2025": 9
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": false
  },
  {
    "subject": "Chemistry",
    "chapter": "Environmental Chemistry",
    "class": "Class 11",
    "unit": "Organic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 6,
      "2020": 1,
      "2021": 4,
      "2022": 10,
      "2023": 5,
      "2024": 3,
      "2025": 6
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Chemistry",
    "chapter": "Solid State",
    "class": "Class 12",
    "unit": "Physical Chemistry",
    "yearWiseQuestionCount": {
      "2019": 9,
      "2020": 8,
      "2021": 6,
      "2022": 3,
      "2023": 8,
      "2024": 7,
      "2025": 9
    },
    "questionSolved": 50,
    "status": "Completed",
    "isWeakChapter": true
  },
  {
    "subject": "Chemistry",
    "chapter": "Solutions",
    "class": "Class 12",
    "unit": "Physical Chemistry",
    "yearWiseQuestionCount": {
      "2019": 8,
      "2020": 2,
      "2021": 7,
      "2022": 7,
      "2023": 7,
      "2024": 8,
      "2025": 1
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Chemistry",
    "chapter": "Electrochemistry",
    "class": "Class 12",
    "unit": "Physical Chemistry",
    "yearWiseQuestionCount": {
      "2019": 0,
      "2020": 0,
      "2021": 5,
      "2022": 3,
      "2023": 10,
      "2024": 2,
      "2025": 10
    },
    "questionSolved": 6,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Chemistry",
    "chapter": "Chemical Kinetics",
    "class": "Class 12",
    "unit": "Physical Chemistry",
    "yearWiseQuestionCount": {
      "2019": 1,
      "2020": 9,
      "2021": 7,
      "2022": 0,
      "2023": 10,
      "2024": 0,
      "2025": 4
    },
    "questionSolved": 31,
    "status": "Completed",
    "isWeakChapter": true
  },
  {
    "subject": "Chemistry",
    "chapter": "Surface Chemistry",
    "class": "Class 12",
    "unit": "Physical Chemistry",
    "yearWiseQuestionCount": {
      "2019": 2,
      "2020": 2,
      "2021": 8,
      "2022": 8,
      "2023": 9,
      "2024": 1,
      "2025": 10
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": false
  },
  {
    "subject": "Chemistry",
    "chapter": "General Principles and Processes of Isolation of Metals",
    "class": "Class 12",
    "unit": "Inorganic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 8,
      "2020": 0,
      "2021": 3,
      "2022": 0,
      "2023": 2,
      "2024": 0,
      "2025": 3
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": false
  },
  {
    "subject": "Chemistry",
    "chapter": "p Block Elements (Group 15, 16, 17 & 18)",
    "class": "Class 12",
    "unit": "Inorganic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 3,
      "2020": 3,
      "2021": 8,
      "2022": 0,
      "2023": 4,
      "2024": 4,
      "2025": 9
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": false
  },
  {
    "subject": "Chemistry",
    "chapter": "d and f Block Elements",
    "class": "Class 12",
    "unit": "Inorganic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 4,
      "2020": 4,
      "2021": 7,
      "2022": 0,
      "2023": 9,
      "2024": 10,
      "2025": 8
    },
    "questionSolved": 33,
    "status": "In Progress",
    "isWeakChapter": false
  },
  {
    "subject": "Chemistry",
    "chapter": "Coordination Compounds",
    "class": "Class 12",
    "unit": "Inorganic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 1,
      "2020": 3,
      "2021": 1,
      "2022": 0,
      "2023": 1,
      "2024": 8,
      "2025": 10
    },
    "questionSolved": 24,
    "status": "Completed",
    "isWeakChapter": true
  },
  {
    "subject": "Chemistry",
    "chapter": "Haloalkanes and Haloarenes",
    "class": "Class 12",
    "unit": "Organic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 9,
      "2020": 4,
      "2021": 10,
      "2022": 6,
      "2023": 8,
      "2024": 1,
      "2025": 3
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": false
  },
  {
    "subject": "Chemistry",
    "chapter": "Alcohols Phenols and Ethers",
    "class": "Class 12",
    "unit": "Organic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 1,
      "2020": 0,
      "2021": 2,
      "2022": 2,
      "2023": 5,
      "2024": 5,
      "2025": 5
    },
    "questionSolved": 20,
    "status": "Completed",
    "isWeakChapter": false
  },
  {
    "subject": "Chemistry",
    "chapter": "Aldehydes and Ketones",
    "class": "Class 12",
    "unit": "Organic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 8,
      "2020": 3,
      "2021": 9,
      "2022": 0,
      "2023": 6,
      "2024": 1,
      "2025": 3
    },
    "questionSolved": 21,
    "status": "In Progress",
    "isWeakChapter": false
  },
  {
    "subject": "Chemistry",
    "chapter": "Carboxylic Acid Derivatives",
    "class": "Class 12",
    "unit": "Organic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 3,
      "2020": 6,
      "2021": 0,
      "2022": 6,
      "2023": 3,
      "2024": 4,
      "2025": 8
    },
    "questionSolved": 30,
    "status": "Completed",
    "isWeakChapter": false
  },
  {
    "subject": "Chemistry",
    "chapter": "Amines",
    "class": "Class 12",
    "unit": "Organic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 3,
      "2020": 10,
      "2021": 6,
      "2022": 2,
      "2023": 7,
      "2024": 5,
      "2025": 4
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Chemistry",
    "chapter": "Biomolecules",
    "class": "Class 12",
    "unit": "Organic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 6,
      "2020": 0,
      "2021": 0,
      "2022": 0,
      "2023": 8,
      "2024": 9,
      "2025": 2
    },
    "questionSolved": 18,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Chemistry",
    "chapter": "Polymers",
    "class": "Class 12",
    "unit": "Organic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 3,
      "2020": 6,
      "2021": 9,
      "2022": 8,
      "2023": 1,
      "2024": 4,
      "2025": 6
    },
    "questionSolved": 35,
    "status": "In Progress",
    "isWeakChapter": false
  },
  {
    "subject": "Chemistry",
    "chapter": "Chemistry in Everyday Life",
    "class": "Class 12",
    "unit": "Organic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 4,
      "2020": 7,
      "2021": 6,
      "2022": 1,
      "2023": 2,
      "2024": 2,
      "2025": 6
    },
    "questionSolved": 28,
    "status": "Completed",
    "isWeakChapter": false
  },
  {
    "subject": "Chemistry",
    "chapter": "Practical Chemistry",
    "class": "Class 12",
    "unit": "Inorganic Chemistry",
    "yearWiseQuestionCount": {
      "2019": 6,
      "2020": 4,
      "2021": 9,
      "2022": 5,
      "2023": 3,
      "2024": 1,
      "2025": 3
    },
    "questionSolved": 20,
    "status": "In Progress",
    "isWeakChapter": false
  },
  {
    "subject": "Mathematics",
    "chapter": "Basic of Mathematics",
    "class": "Class 11",
    "unit": "Miscellaneous",
    "yearWiseQuestionCount": {
      "2019": 9,
      "2020": 9,
      "2021": 6,
      "2022": 5,
      "2023": 1,
      "2024": 1,
      "2025": 8
    },
    "questionSolved": 21,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Quadratic Equation",
    "class": "Class 11",
    "unit": "Algebra",
    "yearWiseQuestionCount": {
      "2019": 1,
      "2020": 6,
      "2021": 1,
      "2022": 1,
      "2023": 9,
      "2024": 1,
      "2025": 1
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": false
  },
  {
    "subject": "Mathematics",
    "chapter": "Complex Number",
    "class": "Class 11",
    "unit": "Algebra",
    "yearWiseQuestionCount": {
      "2019": 3,
      "2020": 7,
      "2021": 5,
      "2022": 1,
      "2023": 7,
      "2024": 5,
      "2025": 5
    },
    "questionSolved": 31,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Permutation Combination",
    "class": "Class 11",
    "unit": "Algebra",
    "yearWiseQuestionCount": {
      "2019": 5,
      "2020": 5,
      "2021": 1,
      "2022": 6,
      "2023": 8,
      "2024": 7,
      "2025": 3
    },
    "questionSolved": 4,
    "status": "In Progress",
    "isWeakChapter": false
  },
  {
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "class": "Class 11",
    "unit": "Algebra",
    "yearWiseQuestionCount": {
      "2019": 10,
      "2020": 8,
      "2021": 5,
      "2022": 0,
      "2023": 10,
      "2024": 0,
      "2025": 9
    },
    "questionSolved": 36,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Mathematical Induction",
    "class": "Class 11",
    "unit": "Algebra",
    "yearWiseQuestionCount": {
      "2019": 7,
      "2020": 9,
      "2021": 10,
      "2022": 7,
      "2023": 6,
      "2024": 4,
      "2025": 9
    },
    "questionSolved": 31,
    "status": "In Progress",
    "isWeakChapter": false
  },
  {
    "subject": "Mathematics",
    "chapter": "Binomial Theorem",
    "class": "Class 11",
    "unit": "Algebra",
    "yearWiseQuestionCount": {
      "2019": 1,
      "2020": 3,
      "2021": 4,
      "2022": 1,
      "2023": 2,
      "2024": 8,
      "2025": 9
    },
    "questionSolved": 28,
    "status": "Completed",
    "isWeakChapter": false
  },
  {
    "subject": "Mathematics",
    "chapter": "Trigonometric Ratios & Identities",
    "class": "Class 11",
    "unit": "Trigonometry",
    "yearWiseQuestionCount": {
      "2019": 8,
      "2020": 9,
      "2021": 4,
      "2022": 9,
      "2023": 8,
      "2024": 0,
      "2025": 6
    },
    "questionSolved": 6,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Trigonometric Equations",
    "class": "Class 11",
    "unit": "Trigonometry",
    "yearWiseQuestionCount": {
      "2019": 2,
      "2020": 4,
      "2021": 10,
      "2022": 0,
      "2023": 1,
      "2024": 8,
      "2025": 3
    },
    "questionSolved": 28,
    "status": "Completed",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Straight Lines",
    "class": "Class 11",
    "unit": "Coordinate Geometry",
    "yearWiseQuestionCount": {
      "2019": 4,
      "2020": 1,
      "2021": 2,
      "2022": 7,
      "2023": 3,
      "2024": 3,
      "2025": 8
    },
    "questionSolved": 7,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Pair of Lines",
    "class": "Class 11",
    "unit": "Coordinate Geometry",
    "yearWiseQuestionCount": {
      "2019": 2,
      "2020": 3,
      "2021": 1,
      "2022": 1,
      "2023": 3,
      "2024": 10,
      "2025": 6
    },
    "questionSolved": 26,
    "status": "Completed",
    "isWeakChapter": false
  },
  {
    "subject": "Mathematics",
    "chapter": "Circle",
    "class": "Class 11",
    "unit": "Coordinate Geometry",
    "yearWiseQuestionCount": {
      "2019": 1,
      "2020": 2,
      "2021": 2,
      "2022": 2,
      "2023": 8,
      "2024": 7,
      "2025": 9
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Parabola",
    "class": "Class 11",
    "unit": "Coordinate Geometry",
    "yearWiseQuestionCount": {
      "2019": 7,
      "2020": 3,
      "2021": 3,
      "2022": 1,
      "2023": 6,
      "2024": 0,
      "2025": 6
    },
    "questionSolved": 26,
    "status": "Completed",
    "isWeakChapter": false
  },
  {
    "subject": "Mathematics",
    "chapter": "Ellipse",
    "class": "Class 11",
    "unit": "Coordinate Geometry",
    "yearWiseQuestionCount": {
      "2019": 9,
      "2020": 3,
      "2021": 10,
      "2022": 6,
      "2023": 2,
      "2024": 4,
      "2025": 6
    },
    "questionSolved": 25,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Hyperbola",
    "class": "Class 11",
    "unit": "Coordinate Geometry",
    "yearWiseQuestionCount": {
      "2019": 2,
      "2020": 5,
      "2021": 3,
      "2022": 4,
      "2023": 8,
      "2024": 6,
      "2025": 1
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Limits",
    "class": "Class 11",
    "unit": "Calculus",
    "yearWiseQuestionCount": {
      "2019": 1,
      "2020": 4,
      "2021": 4,
      "2022": 8,
      "2023": 10,
      "2024": 10,
      "2025": 8
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Mathematical Reasoning",
    "class": "Class 11",
    "unit": "Algebra",
    "yearWiseQuestionCount": {
      "2019": 4,
      "2020": 2,
      "2021": 10,
      "2022": 2,
      "2023": 6,
      "2024": 0,
      "2025": 0
    },
    "questionSolved": 23,
    "status": "In Progress",
    "isWeakChapter": false
  },
  {
    "subject": "Mathematics",
    "chapter": "Statistics",
    "class": "Class 11",
    "unit": "Algebra",
    "yearWiseQuestionCount": {
      "2019": 3,
      "2020": 0,
      "2021": 4,
      "2022": 3,
      "2023": 9,
      "2024": 7,
      "2025": 9
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": false
  },
  {
    "subject": "Mathematics",
    "chapter": "Heights and Distances",
    "class": "Class 11",
    "unit": "Trigonometry",
    "yearWiseQuestionCount": {
      "2019": 7,
      "2020": 9,
      "2021": 8,
      "2022": 6,
      "2023": 1,
      "2024": 9,
      "2025": 2
    },
    "questionSolved": 42,
    "status": "Completed",
    "isWeakChapter": false
  },
  {
    "subject": "Mathematics",
    "chapter": "Properties of Triangles",
    "class": "Class 11",
    "unit": "Trigonometry",
    "yearWiseQuestionCount": {
      "2019": 0,
      "2020": 8,
      "2021": 8,
      "2022": 6,
      "2023": 4,
      "2024": 6,
      "2025": 3
    },
    "questionSolved": 9,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Sets and Relations",
    "class": "Class 12",
    "unit": "Calculus",
    "yearWiseQuestionCount": {
      "2019": 6,
      "2020": 3,
      "2021": 8,
      "2022": 7,
      "2023": 5,
      "2024": 2,
      "2025": 8
    },
    "questionSolved": 25,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Matrices",
    "class": "Class 12",
    "unit": "Algebra",
    "yearWiseQuestionCount": {
      "2019": 3,
      "2020": 9,
      "2021": 0,
      "2022": 4,
      "2023": 1,
      "2024": 5,
      "2025": 4
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Determinants",
    "class": "Class 12",
    "unit": "Algebra",
    "yearWiseQuestionCount": {
      "2019": 5,
      "2020": 9,
      "2021": 9,
      "2022": 6,
      "2023": 5,
      "2024": 10,
      "2025": 0
    },
    "questionSolved": 10,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Inverse Trigonometric Functions",
    "class": "Class 12",
    "unit": "Trigonometry",
    "yearWiseQuestionCount": {
      "2019": 10,
      "2020": 8,
      "2021": 1,
      "2022": 10,
      "2023": 10,
      "2024": 1,
      "2025": 10
    },
    "questionSolved": 17,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Functions",
    "class": "Class 12",
    "unit": "Calculus",
    "yearWiseQuestionCount": {
      "2019": 10,
      "2020": 7,
      "2021": 5,
      "2022": 6,
      "2023": 0,
      "2024": 5,
      "2025": 0
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Continuity and Differentiability",
    "class": "Class 12",
    "unit": "Calculus",
    "yearWiseQuestionCount": {
      "2019": 3,
      "2020": 2,
      "2021": 6,
      "2022": 5,
      "2023": 6,
      "2024": 4,
      "2025": 6
    },
    "questionSolved": 32,
    "status": "Completed",
    "isWeakChapter": false
  },
  {
    "subject": "Mathematics",
    "chapter": "Differentiation",
    "class": "Class 12",
    "unit": "Calculus",
    "yearWiseQuestionCount": {
      "2019": 0,
      "2020": 8,
      "2021": 8,
      "2022": 9,
      "2023": 5,
      "2024": 5,
      "2025": 7
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": false
  },
  {
    "subject": "Mathematics",
    "chapter": "Application of Derivatives",
    "class": "Class 12",
    "unit": "Calculus",
    "yearWiseQuestionCount": {
      "2019": 4,
      "2020": 9,
      "2021": 4,
      "2022": 0,
      "2023": 6,
      "2024": 4,
      "2025": 4
    },
    "questionSolved": 31,
    "status": "Completed",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Indefinite Integration",
    "class": "Class 12",
    "unit": "Calculus",
    "yearWiseQuestionCount": {
      "2019": 10,
      "2020": 5,
      "2021": 3,
      "2022": 4,
      "2023": 9,
      "2024": 9,
      "2025": 9
    },
    "questionSolved": 19,
    "status": "In Progress",
    "isWeakChapter": false
  },
  {
    "subject": "Mathematics",
    "chapter": "Definite Integration",
    "class": "Class 12",
    "unit": "Calculus",
    "yearWiseQuestionCount": {
      "2019": 6,
      "2020": 10,
      "2021": 8,
      "2022": 5,
      "2023": 3,
      "2024": 4,
      "2025": 7
    },
    "questionSolved": 0,
    "status": "Not Started",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Area Under Curves",
    "class": "Class 12",
    "unit": "Calculus",
    "yearWiseQuestionCount": {
      "2019": 5,
      "2020": 4,
      "2021": 8,
      "2022": 4,
      "2023": 0,
      "2024": 6,
      "2025": 4
    },
    "questionSolved": 31,
    "status": "Completed",
    "isWeakChapter": false
  },
  {
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "class": "Class 12",
    "unit": "Calculus",
    "yearWiseQuestionCount": {
      "2019": 4,
      "2020": 5,
      "2021": 2,
      "2022": 1,
      "2023": 5,
      "2024": 8,
      "2025": 3
    },
    "questionSolved": 28,
    "status": "Completed",
    "isWeakChapter": false
  },
  {
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "class": "Class 12",
    "unit": "Vector",
    "yearWiseQuestionCount": {
      "2019": 10,
      "2020": 7,
      "2021": 5,
      "2022": 7,
      "2023": 0,
      "2024": 0,
      "2025": 6
    },
    "questionSolved": 3,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "class": "Class 12",
    "unit": "Vector",
    "yearWiseQuestionCount": {
      "2019": 4,
      "2020": 1,
      "2021": 5,
      "2022": 10,
      "2023": 3,
      "2024": 9,
      "2025": 8
    },
    "questionSolved": 24,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Linear Programming",
    "class": "Class 12",
    "unit": "Algebra",
    "yearWiseQuestionCount": {
      "2019": 2,
      "2020": 5,
      "2021": 3,
      "2022": 5,
      "2023": 0,
      "2024": 10,
      "2025": 6
    },
    "questionSolved": 31,
    "status": "Completed",
    "isWeakChapter": true
  },
  {
    "subject": "Mathematics",
    "chapter": "Probability",
    "class": "Class 12",
    "unit": "Algebra",
    "yearWiseQuestionCount": {
      "2019": 4,
      "2020": 6,
      "2021": 2,
      "2022": 4,
      "2023": 5,
      "2024": 9,
      "2025": 5
    },
    "questionSolved": 35,
    "status": "Completed",
    "isWeakChapter": true
  }
];

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('Physics');
  const [filters, setFilters] = useState({
    classes: [],
    units: [],
    status: '',
    weakChapters: false
  });
  const [sortAscending, setSortAscending] = useState(true);
  const [showFilters, setShowFilters] = useState({
    class: false,
    units: false,
    status: false
  });

  // Initialize dark mode from system preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

//   useEffect(() => {
//   console.log('Dark mode state:', darkMode);
//   console.log('Document has dark class:', document.documentElement.classList.contains('dark'));
//   console.log('System prefers dark:', window.matchMedia('(prefers-color-scheme: dark)').matches);
// }, [darkMode]);


  // Icon mapping for different chapters
  const getChapterIcon = (chapter, subject) => {
    const icons = {
      'Physics': [Lightning, BookOpen, ArrowUp, Calculator],
      'Chemistry': [Atom, BookOpen, ArrowDown, Calculator],
      'Mathematics': [Calculator, BookOpen, ArrowUp,Lightning]
    };
    const subjectIcons = icons[subject] || icons['Physics'];
    const index = chapter.length % subjectIcons.length;
    return subjectIcons[index];
  };

  // Get unique classes and units for current subject
  const getFilterOptions = useMemo(() => {
    const currentSubjectData = mockData.filter(item => item.subject === activeTab);
    const classes = [...new Set(currentSubjectData.map(item => item.class))].sort();
    const units = [...new Set(currentSubjectData.map(item => item.unit))].sort();
    return { classes, units };
  }, [activeTab]);

  // Filter and sort data
  const filteredData = useMemo(() => {
    let filtered = mockData.filter(item => {
      if (item.subject !== activeTab) return false;
      
      if (filters.classes.length > 0 && !filters.classes.includes(item.class)) return false;
      if (filters.units.length > 0 && !filters.units.includes(item.unit)) return false;
      if (filters.status && item.status !== filters.status) return false;
      if (filters.weakChapters && !item.isWeakChapter) return false;
      
      return true;
    });

    // Sort by total questions
    filtered.sort((a, b) => {
      const totalA = Object.values(a.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0);
      const totalB = Object.values(b.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0);
      return sortAscending ? totalA - totalB : totalB - totalA;
    });

    return filtered;
  }, [activeTab, filters, sortAscending]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'classes' || filterType === 'units') {
        const currentValues = prev[filterType];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(item => item !== value)
          : [...currentValues, value];
        return { ...prev, [filterType]: newValues };
      }
      return { ...prev, [filterType]: value };
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      classes: [],
      units: [],
      status: '',
      weakChapters: false
    });
  };

  // Get trend indicator
  const getTrendIndicator = (yearWiseCount) => {
    const years = Object.keys(yearWiseCount).sort();
    const recent = yearWiseCount[years[years.length - 1]];
    const previous = yearWiseCount[years[years.length - 2]];
    
    if (recent > previous) {
      return <ArrowUp className="w-4 h-4 text-green-500" />;
    } else if (recent < previous) {
      return <ArrowDown className="w-4 h-4 text-red-500" />;
    }
    return null;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Not Started':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const subjects = ['Physics', 'Chemistry', 'Mathematics'];
  const subjectIcons = {
    'Physics': Lightning,
    'Chemistry': Atom,
    'Mathematics': Calculator
  };

  return (
   <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">JEE Main</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile and Desktop Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-64 bg-white dark:bg-gray-800 rounded-lg p-6 h-fit">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subjects</h2>
            {/* <div className="space-y-2">
              {subjects.map((subject) => {
                const Icon = subjectIcons[subject];
                return (
                  <button
                    key={subject}
                    onClick={() => setActiveTab(subject)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                      activeTab === subject
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
          
                    <Icon className="bg-orange-500 w-5 h-5" />
                    <span>{subject}</span>
                  </button>
                );
              })}
            </div> */}

            <div className="space-y-2">
  {subjects.map((subject) => {
    const Icon = subjectIcons[subject];

    // Define icon background color per subject
    const iconBgClass =
      subject === 'Physics'
        ? 'bg-orange-500 text-white'
        : subject === 'Chemistry'
        ? 'bg-green-500 text-white'
        : 'bg-blue-400 text-black'; // fallback/default

    return (
      <button
        key={subject}
        onClick={() => setActiveTab(subject)}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
          activeTab === subject
            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
      >
        <div className={`p-2 rounded-full ${iconBgClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span>{subject}</span>
      </button>
    );
  })}
</div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Tabs */}
            <div className="lg:hidden mb-6">
              <div className="flex space-x-1 bg-white dark:bg-gray-800 p-1 rounded-lg">
                {subjects.map((subject) => {
                  const Icon = subjectIcons[subject];
                  return (
                    <button
                      key={subject}
                      onClick={() => setActiveTab(subject)}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === subject
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{subject}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filters and Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Filter Dropdowns */}
                <div className="flex flex-wrap gap-2">
                  {/* Class Filter */}
                  <div className="relative">
                    <button
                      onClick={() => setShowFilters(prev => ({ ...prev, class: !prev.class }))}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      Class
                      {filters.classes.length > 0 && (
                        <span className="bg-blue-300 text-white text-xs rounded-full px-2 py-0.5">
                          {filters.classes.length}
                        </span>
                      )}
                      <CaretDown className="w-4 h-4" />
                    </button>
                    {showFilters.class && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                        <div className="p-2 space-y-1 max-h-48 overflow-y-auto">
                          {getFilterOptions.classes.map((classItem) => (
                            <label key={classItem} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                              <input
                                type="checkbox"
                                checked={filters.classes.includes(classItem)}
                                onChange={() => handleFilterChange('classes', classItem)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{classItem}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Units Filter */}
                  <div className="relative">
                    <button
                      onClick={() => setShowFilters(prev => ({ ...prev, units: !prev.units }))}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      Units
                      {filters.units.length > 0 && (
                        <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                          {filters.units.length}
                        </span>
                      )}
                      <CaretDown className="w-4 h-4" />
                    </button>
                    {showFilters.units && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                        <div className="p-2 space-y-1 max-h-48 overflow-y-auto">
                          {getFilterOptions.units.map((unit) => (
                            <label key={unit} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                              <input
                                type="checkbox"
                                checked={filters.units.includes(unit)}
                                onChange={() => handleFilterChange('units', unit)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{unit}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Status Filter */}
                  <div className="relative">
                    <button
                      onClick={() => setShowFilters(prev => ({ ...prev, status: !prev.status }))}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      {filters.status || 'Status'}
                      <CaretDown className="w-4 h-4" />
                    </button>
                    {showFilters.status && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                        <div className="p-2 space-y-1">
                          {['Not Started', 'In Progress', 'Completed'].map((status) => (
                            <button
                              key={status}
                              onClick={() => {
                                handleFilterChange('status', filters.status === status ? '' : status);
                                setShowFilters(prev => ({ ...prev, status: false }));
                              }}
                              className="w-full text-left px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300"
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Weak Chapters Toggle */}
                  <label className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.weakChapters}
                      onChange={(e) => handleFilterChange('weakChapters', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Weak Chapters
                  </label>
                </div>

                {/* Right side controls */}
                <div className="flex items-center gap-2 sm:ml-auto">
                  {/* Sort Toggle */}
                  <button
                    onClick={() => setSortAscending(!sortAscending)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {sortAscending ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    Sort
                  </button>

                  {/* Clear Filters */}
                  {(filters.classes.length > 0 || filters.units.length > 0 || filters.status || filters.weakChapters) && (
                    <button
                      onClick={clearFilters}
                      className="px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-md"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Results count */}
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredData.length} chapters
              </div>
            </div>

            {/* Chapter List */}
            <div className="space-y-3">
              {filteredData.map((chapter, index) => {
                const Icon = getChapterIcon(chapter.chapter, chapter.subject);
                const totalQuestions = Object.values(chapter.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0);
                const trendIndicator = getTrendIndicator(chapter.yearWiseQuestionCount);

                return (
                  <div
                    key={`${chapter.subject}-${chapter.chapter}-${index}`}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-blue-500 dark:text-blue-400 " />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {chapter.chapter}
                            </h3>
                            {chapter.isWeakChapter && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                Weak
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {chapter.class} • {chapter.unit}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 flex-shrink-0">
                        {/* Questions Stats */}
                        <div className="text-right hidden sm:block">
                          <div className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                            {totalQuestions}
                            {trendIndicator}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {chapter.questionSolved} solved
                          </div>
                        </div>

                        {/* Status */}
                        <div className="hidden sm:block">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(chapter.status)}`}>
                            {chapter.status}
                          </span>
                        </div>

                        {/* Mobile Stats */}
                        <div className="sm:hidden text-right">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {totalQuestions}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {chapter.questionSolved} solved
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Status */}
                    <div className="sm:hidden mt-3 flex items-center justify-between">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(chapter.status)}`}>
                        {chapter.status}
                      </span>
                      {trendIndicator}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty state */}
            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No chapters found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showFilters.class || showFilters.units || showFilters.status) && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowFilters({ class: false, units: false, status: false })}
        />
      )}
    </div>
  );
}

