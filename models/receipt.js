const { v4: uuidv4 } = require('uuid');

class Receipt {
    constructor(retailer, purchaseDate, purchaseTime, items, total) {
        this.retailer = retailer;
        this.purchaseDate = purchaseDate;
        this.purchaseTime = purchaseTime;
        this.items = items;
        this.total = total;
        this.id = Receipt.generateId();
        this.points = this.calculatePoints();
    };

    static generateId() {
        return uuidv4(); // Generates a unique ID
    };

    static calculatePoints() {
        let points = 0;

        // One point for every alphanumeric character in the retailer name:
        points += this.retailer.replace(/[^a-zA-Z0-9]/g, '').length;

        // 50 points if the total is a round dollar amount with no cents:
        if (parseFloat(this.total) % 1 === 0) points += 50;  // parseFloat because input will be string and needs to be converted to a number

        // 25 points if the total is a multiple of 0.25.
        if (parseFloat(this.total) % 0.25 === 0) points += 25;

        // 5 points for every two items on the receipt.
        points += Math.floor(this.items.length / 2) * 5; // Math.floor to round down to the nearest integer

        // If the trimmed length of the item description is a multiple of 3, 
        // multiply the price by 0.2 and round up to the nearest integer. 
        // The result is the number of points earned.

        this.items.forEach(item => {
            const trimmedDescLen = item.shortDescription.trim().length;

            if (trimmedDescLen % 3 === 0) {
                points += Math.ceil(parseFloat(item.price * 0.2)) // Math.ceil rounds up to the nearest integer
            };
        });

         // 6 points if the day in the purchase date is odd.
        if (parseFloat(this.purchaseDate.split('-')[2]) % 2 !== 0) price += 6;

        // Example:
        // this.purchaseDate.split('-') -> ['2022', '01', '01']
        // ['2022', '01', '01'][2] -> '01'
        // parseInt('01', 10) -> 1

        // 10 points if the time of purchase is after 2:00pm and before 4:00pm.
        const [ hour, minute ] = this.purchaseTime.split(':').map(Number); 

        // Example:
        // this.purchaseTime.split(':') -> ['13', '00']
        // .map(Number) -> [13, 0]

        // 2:00pm = 14:00, 4:00pm = 16:00
        if ((hour >= 14 && hour < 16) || (hour === 16 && minute === 0)) points += 10;
       
        return points;
    };
    
 };

 module.exports = Receipt;