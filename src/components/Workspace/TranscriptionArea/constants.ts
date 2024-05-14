import pluralize from 'pluralize';

export const shortMessage = (number: number): string => `Your answer is ${pluralize('letter', number, true)} too short.`;

export const longMessage = (number: number): string => `Your answer is ${pluralize('letter', number, true)} too long.`;
