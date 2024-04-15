
// uppercase the first letter of a word
export const capitalize = (word: string) => (
  word.charAt(0).toUpperCase() + word.slice(1)
);

// readable detail page slugs (would use '-' as separator but name lookup fails for hyphenated country names)
export const slugify = (value: string) => encodeURIComponent(value.toLowerCase().replaceAll(' ', '_'));
export const unslugify = (value: string) => decodeURIComponent(value.toLowerCase().replaceAll('_', ' '));