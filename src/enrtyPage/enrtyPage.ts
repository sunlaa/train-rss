import { BaseElement } from '../components/base-element';
import Form from './form/form';
import Title from './title/title';
import './entryPage.css';
import Router from '../helpers/router';

class EntryPage extends BaseElement {
  constructor(router: Router) {
    super(
      { tag: 'section', className: 'entryPage' },
      new Title(),
      new Form(router)
    );
  }
}

export default EntryPage;
