import { LongArrow } from "@/shared/assets/icons"
import { SectionTitle, SectionTitleProps } from "./SectionTitle"
import { memo } from "react"

export const SectionTitleWithArrows = memo((props: SectionTitleProps) => {
	return (
		<div className="section__header">
			<SectionTitle {...props} />
			<div className="section__header-icons">
				<LongArrow direction="left" />
				<LongArrow direction="right" />
			</div>
		</div>
	)
})
