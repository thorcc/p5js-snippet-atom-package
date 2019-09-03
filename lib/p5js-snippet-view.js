'use babel';
const fse = require('fs-extra')

export default class P5jsSnippetView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('p5js-snippet');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The P5jsSnippet package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);

    this.localPath =  atom.packages.resolvePackagePath("p5js-snippet");
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  generateNewProject(evt){
    let el = evt.target;

    // If target does not have a data-path, find its child node that does
    if (!el.dataset.path) {
      el = el.querySelector('[data-path]');
    }
    let elPath = el.dataset.path;

    // If target is a file, find its parent directory
    if (fse.lstatSync(elPath).isFile()) {
      elPath = path.dirname(elPath);
    }
    fse.copySync(this.localPath + "/p5", elPath);
  }
}
