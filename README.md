# IP Address Tracker App

This is a simple IP Address Tracker App built with [create-react-app](https://create-react-app.dev/), inspired by [Frontend Mentor](https://frontendmentor.io).
It uses the free [ipify Geo API](https://geo.ipify.org/) to request and locate IPv4 or IPv6 addresses and display the located area on the map. The map is provided by the [Leaflet](https://leafletjs.com/) package.


## Overview ##
When launched, the user inputs an IPv4 or IPv6 address into the search bar and, if correct, the address details are displayed in the details in the center of the page, along with the location on the map.

## Installation & Usage ##

To install the project, simply download or clone and run

``` npm install ```

or

```yarn install ```

After installation, create a ```.env``` file in the root of your project and add the API key from [ipify](https://geo.ipify.org/). It is required in the app to be able to send the request correctly. The free subscription to ipify Geo API is limited to 1,000 queries per month.

**.env** file
```
REACT_APP_IPIFY_API_KEY=YOUR_API_KEY_HERE
```

## Screenshots ##
![Desktop view](src/images/screenshot.png?raw=true "Desktop view")
![Mobile view](src/images/screenshot2.png?raw=true "Mobile view")