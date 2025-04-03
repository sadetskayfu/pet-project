export type Mods = Record<string, boolean | undefined>
export type AdditionalClasses = Array<string | undefined>

export function classNames(
	mainClass: string | undefined,
	additionalClasses: AdditionalClasses = [],
	mods: Mods = {}
) {
	return [
		mainClass,
		...additionalClasses.filter(Boolean),
		...Object.entries(mods)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.filter(([_, value]) => Boolean(value))
			.map(([className]) => className),
	].join(' ')
}