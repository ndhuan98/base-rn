import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { appColors } from 'src/utils/theme';
import Modal from 'react-native-modal';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import ImageViewer from 'react-native-image-zoom-viewer';
import CloseIcon from '../assets/svg-icons/CloseIcon';
import FastImage from 'react-native-fast-image';

type Props = {
  imageViews: any[];
  onClose: () => void;
};

export const AppFullViewPicture: React.FC<Props> = ({ imageViews, onClose }) => {
  return (
    <Modal isVisible={imageViews.length > 0}>
      <TouchableOpacity style={styles.backButton} onPress={onClose}>
        <CloseIcon color={appColors.white} />
      </TouchableOpacity>
      <ImageViewer
        imageUrls={imageViews || []}
        style={styles.img}
        enableSwipeDown
        onCancel={onClose}
        renderImage={props => (
          <FastImage
            {...props}
            style={{ width: '100%', height: '100%' }}
            source={{
              uri: props.source.uri,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  img: {
    width: ScreenWidth,
    alignSelf: 'center',
  },
  backButton: {
    zIndex: 50,
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    top: 15,
    right: -10,
    position: 'absolute',
  },
});
