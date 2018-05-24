import WebpackLoader from 'phaser-webpack-loader';
import AssetManifest from '../AssetManifest';
import PhaserInput from 'phaser-input';

/**
 * Preload the game and display the loading screen.
 */
export default class Preload extends Phaser.State {
  /**
   * Once loading is complete, switch to the main state.
   */
  create() {
    // Determine which postfix to use on the assets based on the DPI.
    let postfix = '';
    if (window.devicePixelRatio >= 3) {
      postfix = '@3x';
    } else if (window.devicePixelRatio > 1) {
      postfix = '@2x';
    }

    // Fix CORS issues with the loader and allow for unlimited parallel downloads.
    this.game.load.crossOrigin = 'anonymous';
    this.game.load.maxParallelDownloads = Infinity;

    // Begin loading all of the assets.
    this.game.plugins.add(WebpackLoader, AssetManifest, postfix, PhaserInput.Plugin)
      .load()
      .then(() => {
        this.game.state.start('Test');
      });
  }

  /**
   * Update the loading display with the progress.
   */
  update() {

  }
}
