import { LightningElement, track, api } from 'lwc';

export default class WelcomeBanner extends LightningElement {
    @api userName = 'John Eaton Doe';
    @api welcomeMessage = 'You have 13 pending tasks and 20 new notifications';
    @track currentDate = '';
    @track currentTime = '';
    @track intervalId = null;

    connectedCallback() {
        this.updateDateTime();
        this.intervalId = setInterval(() => {
            this.updateDateTime();
        }, 1000);
    }

    disconnectedCallback() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
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

    handleDashboard() {
        console.log('Navigating to dashboard...');
        // Add your navigation logic here
    }

    handleProfile() {
        console.log('Navigating to profile...');
        // Add your navigation logic here
    }
}