# 42logtimestats

Browser extension that displays logtime statistics in [profile.intra.42.fr](https://profile.intra.42.fr).

## Supported browsers

Currently only Chrome 108 has been tested.

The extension will most likely work with other browsers, but may require downgrading `manifest_version` to `2` in `manifest.json`.

## Installation

The extension is not available from any official web extension pages.

Since distributing the extension as a package is not straight forward either, it must now be installed manually by getting the source code:

#### Chrome
1. Get the extension source, e.g. with `git clone https://github.com/jnsh/42logtimestats.git`.
2. Go to [chrome://extensions/](about://extensions)
3. From top right corner, enable "Developer mode".
4. From top left, click "Load unpacked".
5. Select the directory where you cloned/extracted the extension source.
