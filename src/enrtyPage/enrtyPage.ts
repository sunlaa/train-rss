import { BaseElement } from '../components/base-element';
import Form from './form/form';
import Title from './title/title';
import './entryPage.css';

class EntryPage extends BaseElement {
  constructor() {
    super({ tag: 'section', className: 'entryPage' }, new Title(), new Form());
  }
}

export default EntryPage;
