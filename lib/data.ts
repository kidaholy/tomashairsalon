import { SalonData } from '@/types/salon';
import { getSalonData as getSalonDataFromDB } from './database';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'salon-data.json');

export function getSalonDataFromJSON(): SalonData {
  const fileContents = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function getSalonData(): Promise<SalonData> {
  // Try MongoDB first
  try {
    const data = await getSalonDataFromDB();
    if (data) {
      return data;
    }
  } catch (error) {
    console.warn('⚠️  MongoDB not available, falling back to JSON file');
    console.warn('   Error:', (error as Error).message);
  }
  
  // Fallback to JSON file
  return getSalonDataFromJSON();
}

export async function fetchSalonData(): Promise<SalonData> {
  return getSalonData();
}
