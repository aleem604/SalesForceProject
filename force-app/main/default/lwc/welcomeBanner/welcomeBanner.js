import { LightningElement, track } from 'lwc';

export default class WelcomeBanner extends LightningElement {
    @track userName = 'John Doe';
    @track welcomeMessage = 'You have 3 pending tasks and 2 new notifications';
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
        // Navigate to dashboard
        console.log('Navigating to dashboard...');
        // this[NavigationMixin.Navigate]({
        //     type: 'standard__webPage',
        //     attributes: {
        //         url: '/dashboard'
        //     }
        // });
    }

    handleProfile() {
        // Navigate to profile
        console.log('Navigating to profile...');
        // this[NavigationMixin.Navigate]({
        //     type: 'standard__recordPage',
        //     attributes: {
        //         recordId: 'YOUR_USER_ID',
        //         objectApiName: 'User',
        //         actionName: 'view'
        //     }
        // });
    }
}