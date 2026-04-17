import fs from 'fs';
import path from 'path';
import { SalonData } from '@/types/salon';

const dataFilePath = path.join(process.cwd(), 'data', 'salon-data.json');

export function getSalonData(): SalonData {
  const fileContents = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function fetchSalonData(): Promise<SalonData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return getSalonData();
}
