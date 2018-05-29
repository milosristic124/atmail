# atmail

Mobile version of atmail using React native.

- How to run
 1. git clone https://github.com/superDev610/atmail.git
 2. yarn
 3. react-native run-ios or run via xcode.


- Deploy to app store(release mode)
1. Create an app ID in https://developer.apple.com
Note that the bundle identifier in xcode and ID must be same.

2. Create an app in https://itunnesconnect.apple.com
Fill out all of the forms of the version page.

3. Add your apple account to xcode and select in sigining of project.

4. Create a release scheme
When building an app for release the React Native Developer Menu will be disabled.
The Javascript files we’ve created for our app will be bundled and put locally in the app so we can test it without being connected to a computer.

Go to Product -> Scheme -> Edit Scheme in XCode.

5. Build app with release scheme
Set the export devices as Generic iOS device.
![untitled](https://user-images.githubusercontent.com/28895488/40599968-260faf38-6282-11e8-8a3b-75701e0486a9.png)

Select Product -> Archive from XCode

6. Validate the app and deploy.
After finish that, you will get this window.
![screenshot_22](https://user-images.githubusercontent.com/28895488/40600072-9b0e698c-6282-11e8-8f2c-fb9d0a67b090.png)

Go to apple developer account, and create a provisiong doc as distribution and download it.
Validate with downloaded file, then you just submit the app.

Wait for apple revewing.

-Run on iPhone

And connect to your iPhone.
![screenshot_24](https://user-images.githubusercontent.com/28895488/40600273-683fe944-6283-11e8-871c-a635b38d0ab9.png)

You can see your iPhone's name (e.g. Dave's iPhone) and select it.
Next, just run the project.


