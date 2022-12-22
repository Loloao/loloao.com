import React from 'react'
import { NavProps, NavList, NavItem } from './type'
import { colors } from './navBorderColors'

export type { NavList }

const Nav = (props: NavProps) => {
  return (
    <ul className="dark:text-slate-400 text-slate-900 flex h-14 items-center text-lg">
      {props.navList.map((v, i) => {
        const color = colors[i]
        const isActive = v.active ? 'border-b-2 dark:text-white' : ''
        return (
          <li key={v.id} onClick={() => v.onClickItem?.(v, i)}>
            <input name={v.title} type="radio" className="hidden peer" />
            <label
              htmlFor={v.title}
              className={`${color[0]} ${isActive} cursor-pointer block h-7.5 transition-all text-center hover:border-b-2 dark:hover:text-white mr-6 ${color[1]}`}
            >
              {v.component ?? <span>{v.title}</span>}
            </label>
          </li>
        )
      })}
    </ul>
  )
}

Nav.defaultProps = {
  navList: []
}
export default Nav
