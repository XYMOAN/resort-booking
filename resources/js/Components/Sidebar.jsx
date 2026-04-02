import React from 'react'
import { Link, usePage } from '@inertiajs/react'

const navItems = [
  {
    name: 'Dashboard',
    route: '/',
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M3 12a1 1 0 0 1 .293-.707l7-7a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 19 12v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8z"></path><path d="M9 21v-6a2 2 0 0 1-2-2h-4"></path><path d="M15 21v-6a2 2 0 0 1-2-2h-4"></path></svg>
  },
  {
    name: 'Rooms',
    route: '/rooms',
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M18 8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2h12z"></path><path d="M14 4h-4"></path><path d="M9 9h.01"></path><path d="M15 9h.01"></path></svg>
  },
  {
    name: 'Schedules',
    route: '/schedules',
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M3 12a1 1 0 0 1 .293-.707l7-7a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 19 12v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8z"></path><path d="M9 21v-6a2 2 0 0 1-2-2h-4"></path><path d="M15 21v-6a2 2 0 0 1-2-2h-4"></path></svg>
  },
]

const Sidebar = () => {
  const { url } = usePage()

  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        {/* Sidebar content here */}
        <ul className="menu w-full grow">
          {navItems.map((item) => (
            <li key={item.route}>
              <Link
                href={item.route}
                className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${url === item.route ? 'active' : ''}`}
                data-tip={item.name}
              >
                {item.icon}
                <span className="is-drawer-close:hidden">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar