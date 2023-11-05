import store from '../store'
import DialogBean from '../bean/DialogBean'
import { DialogOperation, DOClick } from '../bean/DialogOperation'
import * as tags from '../assets/value/tags'
import { TextReq } from '../service/request/TextReq'
import ServerMessage from '../bean/ServerMessage'
import SettingService from '../service/SettingService'
import Logger from '../utils/Logger'
import Formatter from '../utils/formatter'

class InfoService {
    async showInstruction(config, isCompulsive) { }

    async showBookInstruction(isCompulsive): Promise<void> { }

    async checkUpdate(config): Promise<void> { }

    showUpdateInfo(message): void { }

    showReloadError(text): void {
        let dialog = new DialogBean(
            tags.DIALOG_COMPULSIVE,
            store.getters.string.loadingFailed,
            text,
            new DialogOperation(store.getters.string.reload, tags.DIALOG_OPERATION_TYPE_PLAIN, () => {
                window.location.reload();
                return true;
            })
        );
        store.dispatch('addDialog', dialog);
    }

    // if updated a new version, shows messages
    async checkNewVersion(config): Promise<void> { }
}

let instance = new InfoService();
export default instance;
