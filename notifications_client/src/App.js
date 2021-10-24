import './App.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { observer } from 'mobx-react';
import { createRef, useEffect } from 'react';

import Notification from './components/notification/Notification';
import { notificationsStore, initialNotifications, userData, uiStore } from './store';



const App = observer(() => {
  const toastRef = createRef();
  let activeMsg;


    const initialSetup = async () => {
        await initialNotifications();
        await userData();

        let notificationsInterval = setInterval(() => {
            if (!notificationsStore.messages.length) {
                clearInterval(notificationsInterval);
                return;
            }
            // Skip next message if user closed notification
            if (uiStore.closedMessage) {
                uiStore.toggleClosedMessage();
                return;
            }

            notificationsStore.updateActiveMessage();
            activeMsg = notificationsStore.activeMessage;
            toastRef.current.classList.remove("hide");

            setTimeout(() => toastRef.current.classList.add("hide"), notificationsStore.notificationsDuration);

        }, notificationsStore.notificationsDelay)

    }

    useEffect(() => {
      toastRef.current.classList.add("hide")
      initialSetup();
    }, [])

  return (
    <div className="App">
     <Notification store={notificationsStore} uiStore={uiStore} ref={toastRef} />
    </div>
  );
})

export default App;
