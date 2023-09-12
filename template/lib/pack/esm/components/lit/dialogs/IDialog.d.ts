export type IDialog = HTMLElement & Element & {
    show: Function;
    hide: Function;
    handleDocumentFocus: EventListenerOrEventListenerObject;
};
