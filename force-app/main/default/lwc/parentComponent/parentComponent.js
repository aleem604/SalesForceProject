import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    userName = 'James Clark Smith Bush';
    welcomeMessage = 'You have 3 pending tasks and 2 new notifications';
    currentDate = '';
    currentTime = '';

    connectedCallback() {
        this.updateDateTime();
        setInterval(() => {
            this.updateDateTime();
        }, 1000);
    }

    updateDateTime() {
        const now = new Date();
        this.currentDate = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        this.currentTime = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
}