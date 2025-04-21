import { SoloBadgeColor } from "@/shared/ui/SoloBadge"

export const getRatingBadgeColor = (value: number): SoloBadgeColor => {
    if (value >= 3.5 && value < 4) return 'green-light'
    if (value >= 4) return 'green'

    return 'grey'
}