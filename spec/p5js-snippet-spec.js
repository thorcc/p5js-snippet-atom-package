'use babel';

import P5jsSnippet from '../lib/p5js-snippet';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('P5jsSnippet', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('p5js-snippet');
  });

  describe('when the p5js-snippet:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.p5js-snippet')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'p5js-snippet:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.p5js-snippet')).toExist();

        let p5jsSnippetElement = workspaceElement.querySelector('.p5js-snippet');
        expect(p5jsSnippetElement).toExist();

        let p5jsSnippetPanel = atom.workspace.panelForItem(p5jsSnippetElement);
        expect(p5jsSnippetPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'p5js-snippet:toggle');
        expect(p5jsSnippetPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.p5js-snippet')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'p5js-snippet:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let p5jsSnippetElement = workspaceElement.querySelector('.p5js-snippet');
        expect(p5jsSnippetElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'p5js-snippet:toggle');
        expect(p5jsSnippetElement).not.toBeVisible();
      });
    });
  });
});
