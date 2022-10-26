'use babel';

import TotoMacauView from './toto-macau-view';
import { CompositeDisposable } from 'atom';

export default {

  totoMacauView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.totoMacauView = new TotoMacauView(state.totoMacauViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.totoMacauView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'toto-macau:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.totoMacauView.destroy();
  },

  serialize() {
    return {
      totoMacauViewState: this.totoMacauView.serialize()
    };
  },

  toggle() {
    console.log('TotoMacau was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
