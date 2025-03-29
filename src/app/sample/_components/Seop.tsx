'use client';

import { useState } from 'react';

export default function DropdownButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="rounded-md bg-blue-500 px-4 py-2 text-white">
        옵션 선택
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-40 rounded-md border bg-white shadow-md">
          <li className="cursor-pointer p-2 hover:bg-gray-100">옵션 1</li>
          <li className="cursor-pointer p-2 hover:bg-gray-100">옵션 2</li>
          <li className="cursor-pointer p-2 hover:bg-gray-100">옵션 3</li>
        </ul>
      )}
    </div>
  );
}
