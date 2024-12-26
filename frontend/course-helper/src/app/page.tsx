'use client';
import { useState } from 'react';
import AppBar from '@/app/ui/appBar';
import Cards from '@/app/ui/cards';
export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  return (<>
    <AppBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
    <Cards searchQuery={searchQuery}/>
    </>
  );
}
