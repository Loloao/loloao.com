import React from 'react'

export interface ClickItem {
  (v: NavItem, i: number): any
}

export interface NavItem {
  id: number
  title: string
  component?: React.ReactElement
  isHidden?: boolean
  active?: boolean
  onClickItem?: ClickItem
}

export type NavList = NavItem[]

export interface NavProps {
  navList: NavList
}
