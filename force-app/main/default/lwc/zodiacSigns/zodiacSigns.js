import { LightningElement, track } from 'lwc';

export default class ZodiacSigns extends LightningElement {
    @track userName = '';
    @track selectedDate = '';
    @track zodiacSign = null;
    @track errorMessage = '';

    zodiacSigns = [
        {
            sign: 'Aries',
            from: 'March 21',
            to: 'April 19',
            element: 'Fire',
            quality: 'Cardinal',
            color: 'Red',
            rulingPlanet: 'Mars',
            emoji: '♈',
            trait: "You are courageous and energetic, always ready to take on new challenges."
        },
        {
            sign: 'Taurus',
            from: 'April 20',
            to: 'May 20',
            element: 'Earth',
            quality: 'Fixed',
            color: 'Green',
            rulingPlanet: 'Venus',
            emoji: '♉',
            trait: "You are reliable and determined, with a strong sense of security."
        },
        {
            sign: 'Gemini',
            from: 'May 21',
            to: 'June 20',
            element: 'Air',
            quality: 'Mutable',
            color: 'Yellow',
            rulingPlanet: 'Mercury',
            emoji: '♊',
            trait: "You are curious and adaptable, with a quick wit and a love for communication."
        },
        {
            sign: 'Cancer',
            from: 'June 21',
            to: 'July 22',
            element: 'Water',
            quality: 'Cardinal',
            color: 'Blue',
            rulingPlanet: 'Moon',
            emoji: '♋',
            trait: "You are emotional and intuitive, with a strong connection to your family and home."
        },
        {
            sign: 'Leo',
            from: 'July 23',
            to: 'August 22',
            element: 'Fire',
            quality: 'Fixed',
            color: 'Gold',
            rulingPlanet: 'Sun',
            emoji: '♌',
            trait: "You are confident and charismatic, with a natural flair for leadership."
        },
        {
            sign: 'Virgo',
            from: 'August 23',
            to: 'September 22',
            element: 'Earth',
            quality: 'Mutable',
            color: 'Green',
            rulingPlanet: 'Mercury',
            emoji: '♍',
            trait: "You are analytical and practical, with a keen eye for detail."
        },
        {
            sign: 'Libra',
            from: 'September 23',
            to: 'October 22',
            element: 'Air',
            quality: 'Cardinal',
            color: 'Pink',
            rulingPlanet: 'Venus',
            emoji: '♎',
            trait: "You are diplomatic and charming, with a strong sense of fairness and justice."
        },
        {
            sign: 'Scorpio',
            from: 'October 23',
            to: 'November 21',
            element: 'Water',
            quality: 'Fixed',
            color: 'Black',
            rulingPlanet: 'Pluto',
            emoji: '♏',
            trait: "You are passionate and resourceful, with a strong intuition and a deep understanding of the human psyche."
        },
        {
            sign: 'Sagittarius',
            from: 'November 22',
            to: 'December 21',
            element: 'Fire',
            quality: 'Cardinal',
            color: 'Red',
            rulingPlanet: 'Jupiter',
            emoji: '♐',
            trait: "You are adventurous and optimistic, with a strong desire for freedom and exploration."
        },
        {
            sign: 'Capricorn',
            from: 'December 22',
            to: 'January 19',
            element: 'Earth',
            quality: 'Cardinal',
            color: 'Brown',
            rulingPlanet: 'Saturn',
            emoji: '♑',
            trait: "You are disciplined and responsible, with a strong drive for success."
        },
        {
            sign: 'Aquarius',
            from: 'January 20',
            to: 'February 18',
            element: 'Air',
            quality: 'Fixed',
            color: 'Blue',
            rulingPlanet: 'Uranus',
            emoji: '♒',
            trait: "You are innovative and independent, with a strong sense of social justice."
        },
        {
            sign: 'Pisces',
            from: 'February 19',
            to: 'March 20',
            element: 'Water',
            quality: 'Mutable',
            color: 'Purple',
            rulingPlanet: 'Neptune',
            emoji: '♓',
            trait: "You are compassionate and artistic, with a deep connection to your emotions."
        }
    ];

    // Helper function to convert month name to number
    getMonthNumber(monthName) {
        const months = {
            'January': 0, 'February': 1, 'March': 2, 'April': 3,
            'May': 4, 'June': 5, 'July': 6, 'August': 7,
            'September': 8, 'October': 9, 'November': 10, 'December': 11
        };
        return months[monthName];
    }

    // Helper function to parse date string "Month Day" to Date object
    parseDateString(dateStr, year) {
        const parts = dateStr.split(' ');
        const month = this.getMonthNumber(parts[0]);
        const day = parseInt(parts[1]);
        return new Date(year, month, day);
    }

    // Find zodiac sign based on date
    findZodiacSign(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        
        // Handle Capricorn special case (Dec 22 - Jan 19)
        if ((month === 11 && day >= 22) || (month === 0 && day <= 19)) {
            return this.zodiacSigns.find(sign => sign.sign === 'Capricorn');
        }
        
        // Handle Aquarius special case (Jan 20 - Feb 18)
        if ((month === 0 && day >= 20) || (month === 1 && day <= 18)) {
            return this.zodiacSigns.find(sign => sign.sign === 'Aquarius');
        }
        
        // Handle Pisces special case (Feb 19 - Mar 20)
        if ((month === 1 && day >= 19) || (month === 2 && day <= 20)) {
            return this.zodiacSigns.find(sign => sign.sign === 'Pisces');
        }

        // For all other signs, check normally
        for (let sign of this.zodiacSigns) {
            const fromDate = this.parseDateString(sign.from, year);
            const toDate = this.parseDateString(sign.to, year);
            
            // Check if date is within range
            if (date >= fromDate && date <= toDate) {
                return sign;
            }
        }
        
        return null;
    }

    // Handle name input change
    handleNameChange(event) {
        this.userName = event.target.value;
    }

    // Handle date selection
    handleDateChange(event) {
        this.selectedDate = event.target.value;
        this.errorMessage = '';
        this.zodiacSign = null;

        if (this.selectedDate) {
            // Convert string to Date object
            const dateParts = this.selectedDate.split('-');
            const year = parseInt(dateParts[0]);
            const month = parseInt(dateParts[1]) - 1; // JavaScript months are 0-based
            const day = parseInt(dateParts[2]);
            const date = new Date(year, month, day);
            
            // Find zodiac sign
            const foundSign = this.findZodiacSign(date);
            
            if (foundSign) {
                this.zodiacSign = foundSign;
            } else {
                this.errorMessage = 'No zodiac sign found for this date.';
            }
        }
    }

    // Getter to check if all data is available
    get showResults() {
        return this.userName && this.zodiacSign;
    }

    // Getter for formatted greeting
    get greeting() {
        return this.userName ? `Hello, ${this.userName}!` : '';
    }

    // Reset form
    handleReset() {
        this.userName = '';
        this.selectedDate = '';
        this.zodiacSign = null;
        this.errorMessage = '';
    }
}