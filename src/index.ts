import './global.css';
import Form from './enrtyPage/form/form';
import Title from './enrtyPage/title/title';

const form = new Form();
const title = new Title();

document.body.append(title.getElement());
document.body.append(form.getElement());
