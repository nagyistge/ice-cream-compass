This is a simple [Cordova][]-based mobile app that directs the user
to [Ice & Vice][], an experimental ice cream shop based in New York
City.

<a href="https://toolness-media.herokuapp.com/v/ice-cream-compass/play/loop"><img src="https://toolness-media.herokuapp.com/v/ice-cream-compass.poster.play.jpg" alt="Play 'Ice Cream Compass' video"></a>

The app can also be used as a web page that progressively enhances to
its full mobile app functionality, depending on the presence of various
mobile APIs.

## Development

### Browser

You'll probably want to do most of your development in a web browser.

Just launch a static web server like [http-server][] from the `www`
directory and visit it.

You can add the following to the querystring for debugging:

* `fakeCompass=on` will simulate a compass.
* `debug=on` will show various debugging variables.

### Mobile

The following assumes you want to develop on android, but you can
substitute `android` for `ios` to build for iOS.

You'll first want to run `cordova platform add android`.

Then run any of the following:

* `cordova build android` will build the mobile app.
* `cordova emulate android` will run the app in an emulator. Since most
  emulators don't simulate the compass, though, this probably won't be
  very useful.
* `cordova run android` will run the app on your connected mobile device.

[Cordova]: https://cordova.apache.org/
[Ice & Vice]: http://iceandvice.com/
[http-server]: https://github.com/indexzero/http-server#readme
