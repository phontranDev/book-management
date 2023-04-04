import React, {useEffect, useRef} from 'react';
import {Platform, View} from 'react-native';
// import Pdf from 'react-native-pdf';
import PDFView from 'react-native-view-pdf/lib/index';

const resources = {
  file:
    Platform.OS === 'ios'
      ? 'downloadedDocument.pdf'
      : '/sdcard/Download/downloadedDocument.pdf',
  url: 'https://sachvui.vn/wp-content/uploads/2021/10/sachvui-vn-7-buoc-dem-dan-den-thanh-cong.pdf',
  base64: 'JVBERi0xLjMKJcfs...',
};

const PDFExample = () => {
  const src = {
    uri: 'https://sachvui.vn/wp-content/uploads/2021/10/sachvui-vn-7-buoc-dem-dan-den-thanh-cong.pdf',
  };
  const resourceType = 'url';

  return (
    <PDFView
      fadeInDuration={250.0}
      style={{width: '100%', height: '100%'}}
      resource={resources[resourceType]}
      resourceType={resourceType}
      onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
    />
  );
};

export default PDFExample;
