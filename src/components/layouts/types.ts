import { NextComponentType, NextPageContext } from "next"

export interface LayoutProps {
  children: React.ReactNode
}

export type ComponentWithLayout = {
  Layout?: React.FC<LayoutProps>
} & NextComponentType<NextPageContext>
