import React from 'react';
import { Linking, Platform } from 'react-native';
import { ScreenWidth, ScreenHeight } from 'react-native-elements/dist/helpers';
import { appColors } from 'src/utils/theme';
import WebView from 'react-native-webview';

interface Props {
  description?: string;
  hasFooter?: boolean | false;
}
export const AppWebView: React.FC<Props> = React.memo(({ description, hasFooter }) => {
  return (
    <WebView
      showsVerticalScrollIndicator={false}
      mixedContentMode="always"
      scalesPageToFit={Platform.OS === 'ios'}
      containerStyle={{ backgroundColor: appColors.whiteBg }}
      androidLayerType="hardware"
      source={{
        html: `<html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500&display=swap" rel="stylesheet">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          font-family: 'Cabin', sans-serif;
        }
        body {
          background-color: #FAFAFA !important;
          width: ${ScreenWidth * 0.9} !important;
          margin: auto;
        }
        figure {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        img{
          display: block; 
          width: ${ScreenWidth * 0.9} !important; 
          height: auto !important;
          align-self: center;
        }
        iframe {
          width:${ScreenWidth * 0.9}!important; 
          height: ${ScreenHeight * 0.45} !important;
          frameBorder: 0;
        }
        p {
          display: flex;
          flex-wrap: wrap;
        }
        #footer {
          font-size: 16px;
          margin: 0 auto;
          text-align: center;
          width: ${ScreenWidth * 0.8};
          display: ${hasFooter ? 'block' : 'none'};
        }
        #txContact {
          font-size: 16px;
          color:${appColors.gray3}
        }
        #txMail {
          font-size: 18px;
          margin-top: -10px;
          color:${appColors.main};
          background: none;
        }
      </style>
    </head>
    <body>
    ${
      (description || '')
        .replace('<oembed url=', '<iframe src=')
        .replace('</oembed>', '</iframe>')
        .replace('com/watch?v=', 'com/embed/')
        // .replace('<p>', '<span>')
        // .replace('</p>', '</span>')
        .replace('<figcaption>', '<figcaption style="text-align: center;">') || ''
    }
        <div id="footer">
          <p id="txContact">Bạn cũng có thể liên hệ ngay với chúng tôi thông qua hotline: </p>
          <button id="txMail" onclick="onContact()"> 097 765 1884</button>
        </div>  
        <script>
         function onContact() {
           setTimeout(function () {
             window.ReactNativeWebView.postMessage('hotline')
           }, 0)
         }
       </script>
    </body>
    </html>`,
      }}
      onMessage={async event => {
        if (event.nativeEvent.data === 'hotline') {
          await Linking.openURL('tel: 0977651884');
        }
      }}
      onShouldStartLoadWithRequest={request => {
        const isExternalLink = Platform.OS === 'ios' ? request.navigationType === 'click' : true;
        if (request.url !== 'about:blank' && isExternalLink) {
          Linking.openURL(request.url);
          return false;
        } else {
          return true;
        }
      }}
    />
  );
});
