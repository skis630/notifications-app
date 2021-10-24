import { forwardRef, useState } from 'react';
import { observer } from 'mobx-react';

import './Notification.scss'; 


const Notification = observer(forwardRef(({ store, uiStore }, ref) => {

    const removeHandler = e => {
        // Update user clicked notifications on DB 
        const activeMsg = store.activeMessage;
        const msgId = activeMsg._id;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        fetch(`/users/${store.userId}/clicked_notifications`, { 
            method: 'PUT',
            headers,
            body: JSON.stringify({
                msgId,
                severity: activeMsg.severity,
                text: activeMsg.text
            })
        });

        uiStore.toggleClosedMessage();
        ref.current.classList.add("hide");
        store.removeMsg(msgId);

    }

    
    return (
        <div className={`notification${store.activeMessage ? ` ${store.activeMessage.severity}` : ""}`}
             onClick={removeHandler} ref={ref} >
            <i className={store.activeMessage ? `pi ${uiStore.messageIcons[store.activeMessage.severity]}` : ""} ></i>
            <p>{store.processedMessage}</p>
            <span className="close-btn">&times;</span>
        </div>
    )

}))


export default Notification;