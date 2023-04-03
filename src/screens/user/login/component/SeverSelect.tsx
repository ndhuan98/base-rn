import _ from "lodash";
import React from "react";
import { ButtonGroup } from "react-native-elements";
import { Env } from "src/constant";
import { API } from "src/network";
import styles from "./Style";

// Hiện  thị View chuyển sever
export const SeverSelect = () => {
    const [selectedServer, setSelectedServer] = React.useState();
  
    const onChaneSever = React.useCallback(index => {
      console.log('index -->>', index);
      if (API.allowChangeServer) {
        setSelectedServer(index);
        API.switchEnv(Env.all[index]);
      }
    }, []);
  
    return (
      <ButtonGroup
        // containerBorderRadius={4}
        textStyle={styles.buttonGroup}
        selectedTextStyle={styles.txSelected}
        containerStyle={styles.btnGrContainer}
        // selectedBackgroundColor={AppColors.red}
        innerBorderStyle={styles.innerBorder}
        buttons={_.map(Env.all, item => item.toUpperCase())}
        selectedIndex={selectedServer}
        onPress={onChaneSever}
      />
    );
  };
  