import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/trade',     label: 'Trade'     },
    { to: '/portfolio', label: 'Account'   },
    { to: '/history',   label: 'History'   }
  ];

  return (
    <nav className="bg-white shadow p-4">
      <ul className="flex space-x-6">
        {links.map(l => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              className={({ isActive }) =>
                isActive
                  ? 'font-semibold text-blue-600'
                  : 'text-gray-700 hover:text-blue-500'
              }
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
