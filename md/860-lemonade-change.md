### Leetcode 860 (Easy): Lemonade Change [Practice](https://leetcode.com/problems/lemonade-change)

### Description  
You run a lemonade stand where each lemonade costs $5. Each customer pays with either a \$5, \$10, or \$20 bill.  
You must provide correct change using only bills you have received so far, starting with no initial cash.  
Given the order of bills from customers in an array, determine if you can make change for every customer in order.

### Examples  

**Example 1:**  
Input: `[5,5,5,10,20]`  
Output: `True`  
*Explanation:  
- Customer 1: pays \$5, no change needed.  
- Customer 2: pays \$5, no change needed.  
- Customer 3: pays \$5, no change needed.  
- Customer 4: pays \$10, give \$5 change (have \$5).  
- Customer 5: pays \$20, give \$10+\$5 change (have \$10 and \$5).*

**Example 2:**  
Input: `[5,5,10,10,20]`  
Output: `False`  
*Explanation:  
- Customer 1: pays \$5, no change needed.  
- Customer 2: pays \$5, no change needed.  
- Customer 3: pays \$10, give \$5 (have \$5).  
- Customer 4: pays \$10, give \$5 (have \$5).  
- Customer 5: pays \$20, need \$15 as change (but only have \$10, no \$5 left).*

**Example 3:**  
Input: `[5,10,5,20]`  
Output: `True`  
*Explanation:  
- Customer 1: pays \$5, no change needed.  
- Customer 2: pays \$10, give \$5 (have \$5).  
- Customer 3: pays \$5, no change needed.  
- Customer 4: pays \$20, give \$10+\$5 (have both \$10 and \$5).*

### Thought Process (as if you’re the interviewee)  
Start by keeping track of how many \$5 and \$10 bills you have, since those are the only denominations used for change (no need to track \$20 bills).  
Iterate through the list of bills:
- If the bill is \$5: increment the count of \$5 bills.
- If the bill is \$10: need to give back \$5. If a \$5 is available, decrement \$5 count and increment \$10 count. If not, return false.
- If the bill is \$20: need to give \$15 as change. Prefer giving one \$10 and one \$5 if possible, as it conserves \$5 bills for future transactions; otherwise, give three \$5 bills. If neither is possible, return false.

This is a greedy strategy—always try to use larger bills in change when possible.

### Corner cases to consider  
- Empty array (`[]`): should return `True` (no customers, no change needed).
- Only \$5 bills: always possible, return `True`.
- First customer doesn’t pay with \$5: impossible, return `False`.
- Have to give change but don’t have enough bills.
- Sudden spike in \$20 bills with scarce \$5 or \$10 bills.

### Solution

```python
def lemonadeChange(bills):
    five = 0   # Count of $5 bills
    ten = 0    # Count of $10 bills

    for bill in bills:
        if bill == 5:
            five += 1
        elif bill == 10:
            if five == 0:
                return False
            five -= 1
            ten += 1
        else:  # bill == 20
            # Prefer to give one $10 and one $5 as change if possible
            if ten > 0 and five > 0:
                ten -= 1
                five -= 1
            elif five >= 3:
                five -= 3
            else:
                return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we process each bill exactly once.
- **Space Complexity:** O(1), as we only use variables to store the counts of \$5 and \$10 bills (no extra storage that grows with input).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the bill denominations could vary (e.g., not just \$5, \$10, \$20)?  
  *Hint: How would you store available bills, and how would your algorithm change?*

- If you start with a certain amount of cash, can you still guarantee change?  
  *Hint: Allow the function to accept initial counts for each bill.*

- What if every lemonade costs a different price?  
  *Hint: How does having variable prices affect your change calculation?*

### Summary
This problem uses a **greedy greedy approach**, always giving change with the highest denominations available to conserve smaller bills for future transactions.  
The core idea is counting and updating available change in real-time while processing the queue.  
It’s a variant of the "can you make change?" pattern, useful in cashier systems, vending machines, and simulation of resource allocation.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
