type IconSize = "xxs" | "xs" | "s" | "m" | "l" | "inherit";
type IconColor = 'primary' | 'inherit' | 'soft'

export interface IconProps {
    className?: string
    size?: IconSize
    color?: IconColor
}