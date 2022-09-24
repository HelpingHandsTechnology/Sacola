import { Readability } from '@mozilla/readability';
import axios from 'axios';
import { JSDOM } from 'jsdom';

export default async function articleHandler(req, res) {
  const response = await axios.get('https://github.com/mozilla/readability');
  const doc = new JSDOM(response.data);
  const reader = new Readability(doc.window.document);
  const article = reader.parse();
  console.log(article);
  res.status(200).json({ name: 'John Doe' });
}
