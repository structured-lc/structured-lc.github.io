### Leetcode 1357 (Medium): Apply Discount Every n Orders [Practice](https://leetcode.com/problems/apply-discount-every-n-orders)

### Description  
You are running a supermarket billing system where every nᵗʰ customer receives a percentage discount on their entire bill. Given:
- A list of products and their unique IDs with prices.
- For each customer, their order as two lists: product IDs and quantities.
- On every nᵗʰ order (i.e., customer count is a multiple of n), apply a given discount percentage to the total bill, otherwise charge full price.
Design a class that can:
- Initialize the product catalog and discount info.
- For each customer, return their bill after discount (if applicable).

### Examples  

**Example 1:**  
Input:  
`n = 3, discount = 50, products = [1,2,3,4,5], prices = [100,200,300,400,500]`  
`Customer 1: product = [1,2], amount = [1,2]`  
`Customer 2: product = [3,5], amount = [1,1]`  
`Customer 3: product = [3,4], amount = [1,1]`  
Output:  
- Customer 1: `500.0`  
- Customer 2: `800.0`  
- Customer 3: `350.0`  
*Explanation:  
- Cust 1: 1×100 + 2×200 = 500 (no discount)  
- Cust 2: 1×300 + 1×500 = 800 (no discount)  
- Cust 3: 1×300 + 1×400 = 700, 3rd customer → discount, so 700 × 0.5 = 350.0*

**Example 2:**  
Input:  
`n = 2, discount = 20, products = [1,2], prices = [150,250]`  
`Customer 1: product = [2], amount = [1]`  
`Customer 2: product = [1,2], amount = [2,3]`  
Output:  
- Customer 1: `250.0`  
- Customer 2: `950.0`  
*Explanation:  
- Cust 1: 1×250 = 250 (no discount)  
- Cust 2: 2×150 + 3×250 = 300 + 750 = 1050, 2nd customer → discount, 1050 × 0.8 = 840.0*

**Example 3:**  
Input:  
`n = 4, discount = 25, products = , prices = `  
`Customer 1: product = , amount = [1]`  
`Customer 2: product = , amount = [2]`  
`Customer 3: product = , amount = [3]`  
`Customer 4: product = , amount = [4]`  
Output:  
- Customer 1: `90.0`  
- Customer 2: `180.0`  
- Customer 3: `270.0`  
- Customer 4: `270.0`  
*Explanation:  
- Cust 1: 1×90 = 90  
- Cust 2: 2×90 = 180  
- Cust 3: 3×90 = 270  
- Cust 4: 4×90 = 360, 4th customer → discount, 360 × 0.75 = 270.0*

### Thought Process (as if you’re the interviewee)  
First, we need a way to quickly look up prices by product ID, so we can create a dictionary mapping product ID → price.  
We need to track the number of customers seen so far to know when to apply the discount.  
For each getBill call:
- Calculate the total by summing (price × quantity) for all ordered products.
- If the current customer's number is a multiple of n, apply the discount percentage to the total.
- Otherwise, return the total as is.

Brute-force and optimized approaches are essentially the same here, as every operation is directly tied to the size of the order (few products). Building the price lookup once in the constructor is optimal.

**Trade-offs:**  
- Using a dictionary for price lookup is O(1) per product per bill.
- Storing customer count as an instance variable adds O(1) space.
- Each getBill is O(k), where k is the number of different products ordered by this customer.

### Corner cases to consider  
- Orders where the product or amount lists are empty (total is 0).
- Orders containing the same product ID more than once (shouldn’t occur per problem, but needs awareness).
- n = 1 (every order gets the discount).
- Large discount (100%, bill becomes 0).
- Discount = 0 (never reduces price).
- Very large number of calls.

### Solution

```python
class Cashier:
    def __init__(self, n, discount, products, prices):
        # Number of customers after which to apply discount
        self.n = n
        # Discount percentage to apply every nth customer
        self.discount = discount
        # Product ID to Price mapping for quick lookup
        self.price_map = {}
        for prod_id, price in zip(products, prices):
            self.price_map[prod_id] = price
        # Track the number of customers served so far
        self.count = 0

    def getBill(self, product, amount):
        # Count this customer
        self.count += 1

        # Compute total for this bill
        total = 0
        for prod_id, qty in zip(product, amount):
            total += self.price_map[prod_id] * qty

        # If discount applies, apply it
        if self.count % self.n == 0:
            total *= (100 - self.discount) / 100

        return total
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Constructor: O(p), where p = number of products, for building the price map.
  - getBill: O(k), where k = number of items in the customer’s order (since we sum over all products ordered).
- **Space Complexity:**  
  - O(p) to store the price map (one entry per product). O(1) extra (for counters and local variables).

### Potential follow-up questions (as if you’re the interviewer)  

- What if customers can buy products not in the initial catalog?  
  *Hint: How would you handle unknown product IDs?*

- Could the discount rule be changed to every nᵗʰ unique customer ID instead of every n calls to getBill?  
  *Hint: Would you need to track individual customers? How?*

- What if the discount percentage changes dynamically after every k calls?  
  *Hint: Can you make your class more configurable for changes in discount policy?*

### Summary
This problem demonstrates a **mapping and counting pattern**: using a hash map for fast lookups and a counter to track state across calls. It's a common approach in billing, coupon, or reward systems where you must apply special logic on every Nᵗʰ event. The solution pattern (static lookup, accumulator, trigger on every N) is widely applicable in design and implementation of point-of-sale, inventory, customer rewards, and similar systems.

### Tags
Array(#array), Hash Table(#hash-table), Design(#design)

### Similar Problems
- Apply Discount to Prices(apply-discount-to-prices) (Medium)