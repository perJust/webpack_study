let str = require('./1.js');
document.querySelector('#app').innerHTML = str;
import './index.css';
import './index.scss';

if(module.hot) {
    module.hot.accept();
}