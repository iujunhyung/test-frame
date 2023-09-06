import { 
  ContentDialog, 
  InputDialog, 
  InputDialogOptions, 
  MessageDialog, 
  BlankDialog 
} from "@src/components/dialogs";
import { IMenuItem, PopupMenu } from "@src/components/PopupMenu";

class UIManager {
  
  private static _instance: UIManager;
  
  public static get Instance()
  {
      return this._instance || (this._instance = new this());
  }
  
  pageBusyIndicator?: HTMLElement;
  messageBoxDialog?: MessageDialog;
  
  isReady: boolean = false;
   private busyStack: number = 0;


  async initializeAsync(): Promise<boolean> {
    return new Promise(async (resolve) => {
      while(this.isReady != true) {
        await new Promise((resolve) => {
          console.log("waiting for ui manager to be ready");
          setTimeout(resolve, 100);
        });
      }
      resolve(true);
    });
  }

  private ready() {
    this.isReady = this.pageBusyIndicator != null && this.messageBoxDialog != null;
  }

  setPageBusyIndicator(pageBusyIndicator: HTMLElement) {
    this.pageBusyIndicator = pageBusyIndicator;
    this.updateBusyIndicator();
    this.ready();
  }
  
  setMessageDialog(messageBoxDialog: MessageDialog) {
    this.messageBoxDialog = messageBoxDialog;
    this.ready();
  }
  
  async showMessageAsync(title: string, message: string) : Promise<boolean> {

    if (this.messageBoxDialog == null) {
      await this.initializeAsync();
    }

    if (this.messageBoxDialog) {
      this.messageBoxDialog.initOk();
      return this.messageBoxDialog.showAsync(title, message);
    } else {
      throw new Error("message box dialog is null");
    }
  }

  async showMessageOkCancelAsync(title: string, message: string) {
    
    if (this.messageBoxDialog == null) {
      await this.initializeAsync();
    }

    if (this.messageBoxDialog) {
      this.messageBoxDialog.initOkCancel();
      return this.messageBoxDialog.showAsync(title, message);    
    } else {
      throw new Error("message box dialog is null");
    }
  }  

  async showConfirmDialog(title: string, message: string) {
    
    if (this.messageBoxDialog == null) {
      await this.initializeAsync();
    }

    if (this.messageBoxDialog) {
      this.messageBoxDialog.initYesNo();
      return this.messageBoxDialog.showAsync(title, message);
    } else {
      throw new Error("message box dialog is null");
    }
  }
  
  createInertElement(html: string): Element {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild as Element;
  }
  
  async showInputDialogAsync(
    title: string, 
    message: string, 
    options?: InputDialogOptions) {
    
    const html = `<input-dialog hidden></input-dialog>`;
    const element = this.createInertElement(html)
    document.body.appendChild(element);
    
    try {
      let dlg = element as InputDialog;
      let r = await dlg.showAsync(title, message, options);
      return r;    
    } catch (e) {
      return {
        success: false,
        value: null
      };
    } finally {
      document.body.removeChild(element);
    }
  }

  async showDialogAsync(content: any) {
    
    const html = `<blank-dialog hidden></blank-dialog>`;
    const element = this.createInertElement(html)
    document.body.appendChild(element);

    try {
      let dlg = element as BlankDialog;
      dlg.content = content;
      let r = await dlg.showAsync();
      return r;
    } catch (e) {
      return {
        success: false,
        value: null
      };
    } finally {
      document.body.removeChild(element);
    }
  }

  async showContentDialogAsync(title: string, content: any, options?: {
    okCancel?: boolean,
    yesNo?: boolean,
    hiddenButtons?: boolean
    validationHandler?: () => string[]
  }) {
    // # use this to create a dialog
    // let context = {
    //   name: "",
    //   template: "",
    //   emails: []
    // }
    // let el = this.getCreateWorkpageDialog(context);
    // let result = await uiManager.showContentDialogAsync('New Workspace', el);

    const html = `<content-dialog hidden></content-dialog>`;
    const element = this.createInertElement(html)
    document.body.appendChild(element);

    try {
      let dlg = element as ContentDialog;
      dlg.content = content;
      if (options != null) {
        if (options.okCancel) {
          dlg.positiveText = "Ok";
          dlg.negativeText = "Cancel";
          dlg.useNegative = true;
        } else if (options.yesNo) {
          dlg.positiveText = "Yes";
          dlg.negativeText = "No";
          dlg.useNegative = true;
        }

        if (options.hiddenButtons) {
          dlg.hiddenButtons = options.hiddenButtons;
        }
        
        if (options.validationHandler) {
          dlg.validationHandler = options.validationHandler;
        }      
      }
      
      
      let r = await dlg.showAsync(title);
      return r;    
    } catch (e) {
      return {
        success: false,
        value: null
      };
    } finally {
      document.body.removeChild(element);
    }
  }

  async showContextMenu(menuItems: Array<IMenuItem>, e: MouseEvent) {
    
    const html = `<popup-menu hidden></popup-menu>`;
    const element = this.createInertElement(html)
    document.body.appendChild(element);

    try {
      let popupMenu = element as PopupMenu;
      popupMenu.menuItems = menuItems;
      popupMenu.location = {
        x: e.x,
        y: e.y
      };
      
      let r = await popupMenu.showAsync();
      return r;    
    } catch (e) {
      return {
        success: false,
        value: null
      };
    } finally {
      document.body.removeChild(element);
    }
  }
  
  //#region busy indicator

  busy() {
    // busy 스택에 추가
    this.busyStack++;

    this.updateBusyIndicator();
  }

  updateBusyIndicator() {
    if (this.pageBusyIndicator) {
      this.pageBusyIndicator.hidden = this.busyStack > 0 ? false : true;
    }
  }

  unbusy() {
    // busy 스택에서 제거, 0보다 작아지면 0으로 맞춤
    this.busyStack--;
    if (this.busyStack < 0) {
      this.busyStack = 0;
    }
    
    this.updateBusyIndicator();
  }
  
  async invokeInBusy<T>(action: () => Promise<T>) {
    
    this.busy();

    let result: T;
    try
    {
      result = await action();
    } catch (e) {
      throw e;
    } finally {
      this.unbusy();
    }
    return result;
  }
  
  //#endregion

}

export const uiManager = UIManager.Instance;