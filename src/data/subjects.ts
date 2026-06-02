import type { ComponentType } from 'react';
import type { SvgIconProps } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LanguageIcon from '@mui/icons-material/Language';
import EditIcon from '@mui/icons-material/Edit';
import CalculateIcon from '@mui/icons-material/Calculate';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MapIcon from '@mui/icons-material/Map';
import ScienceIcon from '@mui/icons-material/Science';
import BiotechIcon from '@mui/icons-material/Biotech';

export interface Subject {
  id: string;
  name: string;
  schedule: string;
  price: string;
  Icon: ComponentType<SvgIconProps>;
}

/** Placeholder schedules and prices — update before launch */
export const subjects: Subject[] = [
  { id: 'history',   name: 'ისტორია',            schedule: 'ორშ, ოთხ · 16:00–18:00', price: '150 ₾ / თვე', Icon: MenuBookIcon },
  { id: 'english',   name: 'ინგლისური',           schedule: 'სამ, ხუთ · 16:00–18:00', price: '150 ₾ / თვე', Icon: LanguageIcon },
  { id: 'georgian',  name: 'ქართული',             schedule: 'ორშ, ოთხ · 14:00–16:00', price: '150 ₾ / თვე', Icon: EditIcon },
  { id: 'math',      name: 'მათემატიკა',           schedule: 'სამ, ხუთ · 14:00–16:00', price: '150 ₾ / თვე', Icon: CalculateIcon },
  { id: 'civics',    name: 'სამოქალაქო განათლება', schedule: 'პარ · 14:00–17:00',       price: '150 ₾ / თვე', Icon: AccountBalanceIcon },
  { id: 'geography', name: 'გეოგრაფია',            schedule: 'ორშ, ოთხ · 10:00–12:00', price: '150 ₾ / თვე', Icon: MapIcon },
  { id: 'physics',   name: 'ფიზიკა',              schedule: 'სამ, ხუთ · 10:00–12:00', price: '150 ₾ / თვე', Icon: ScienceIcon },
  { id: 'chemistry', name: 'ქიმია',               schedule: 'პარ · 10:00–13:00',       price: '150 ₾ / თვე', Icon: BiotechIcon },
];
