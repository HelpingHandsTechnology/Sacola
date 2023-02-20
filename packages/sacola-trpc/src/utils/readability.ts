import { Reader } from '../types';

// TODO: Write tests to this function
// NOTE: Be careful when updating the readability version, since this error message can be changed
const readabilityError = 'Something went wrong, but don’t fret — let’s give it another shot.';

export const getSiteDescription = (reader: Reader, doc: Document): string => {
  if (reader && reader.excerpt !== readabilityError) return reader.excerpt;

  const htmlDescriptionElement = doc.querySelector('meta[name="description"]');
  const htmlDescription = htmlDescriptionElement && htmlDescriptionElement.getAttribute('content');

  if (htmlDescription) return htmlDescription;

  return 'The content from this URL does not have an HTML description';
};
