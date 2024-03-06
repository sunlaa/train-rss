import './title.css';
import Div from '../../components/divElement';

class Title extends Div {
  constructor() {
    super({ className: 'title', content: 'PUZZLE' });
  }
}

export default Title;
