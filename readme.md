# GoServices

It is a service booking mobile App for android & iOS that allows users to book a repair/replacement service for their devices and track the progress.

## Installation

Clone this repo and run `npm install && expo start`

## Issues

This repo uses `react-native-reanimated@2.9.1` which has changed `interpolate` to `interpolateNode` which will cause issue after installation.

Solution:

```
$ npm install
```

After the completion of installation of `node_modules`.

```
$ cd node_modules/react-navigation-drawer/lib/module/views
```

Replace interpolate with interpolateNode. It will be in two places, so make sure you change both of them.

This issue will be resolve in upcoming version.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[GNU GENERAL PUBLIC LICENSE](https://www.gnu.org/licenses/gpl-3.0.en.html)
