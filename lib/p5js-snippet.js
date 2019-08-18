'use babel';

import P5jsSnippetView from './p5js-snippet-view';
import { CompositeDisposable } from 'atom';

export default {

  p5jsSnippetView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.p5jsSnippetView = new P5jsSnippetView(state.p5jsSnippetViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.p5jsSnippetView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'p5js-snippet:createTemplate': () => this.createTemplate()
    }
  ));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.p5jsSnippetView.destroy();
  },

  serialize() {
    return {
      p5jsSnippetViewState: this.p5jsSnippetView.serialize()
    };
  },

  createTemplate() {
    return {
      p5jsSnippetViewState: this.p5jsSnippetView.generateNewProject()
    };
  }


};