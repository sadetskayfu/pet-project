export const getLastCharacters = (str: string, charactersCount: number) => {
    return `${str.length > charactersCount ? '..' : ''}${str.slice(-charactersCount)}`
}