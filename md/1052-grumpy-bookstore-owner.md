### Leetcode 1052 (Medium): Grumpy Bookstore Owner [Practice](https://leetcode.com/problems/grumpy-bookstore-owner)

### Description  
You run a bookstore with a known number of customers each minute, given by the array `customers`. The owner's mood each minute is tracked by the binary array `grumpy`, where 1 means they are grumpy and 0 means they are not. Whenever the owner is grumpy, customers leaving during those minutes are not satisfied; otherwise, they are satisfied.

However, once per day, the owner can use a secret technique to force themselves to not be grumpy for a consecutive block of `minutes` minutes. Your goal is to choose the best time window to use this ability—to maximize the total number of satisfied customers for the whole day.

### Examples  

**Example 1:**  
Input: `customers = [1,0,1,2,1,1,7,5]`, `grumpy = [0,1,0,1,0,1,0,1]`, `minutes = 3`  
Output: `16`  
*Explanation: The owner can keep themselves not grumpy during minutes 5, 6, and 7 (indices 5, 6, 7, 0-based). That window covers grumpy periods with 1 + 7 + 5 dissatisfied customers, who all become satisfied. Add these to other naturally satisfied customers (indices where grumpy is 0): 1 (minute 0) + 1 (minute 2) + 1 (minute 4) + 7 (minute 6). Total is 16.*

**Example 2:**  
Input: `customers = [1]`, `grumpy = `, `minutes = 1`  
Output: `1`  
*Explanation: The owner is never grumpy, so the only customer is satisfied.*

**Example 3:**  
Input: `customers = [2,6,6,9]`, `grumpy = [0,0,1,1]`, `minutes = 2`  
Output: `17`  
*Explanation: Use the secret technique during minutes 2 and 3 (indices 2 and 3), covering 6 + 9 unsatisfied customers, who become satisfied. Naturally satisfied customers: 2 + 6 = 8. Total: 8 + 6 + 9 = 23. (Correction in the statement: Output is 23.)*


### Thought Process (as if you’re the interviewee)  
First, I’d identify two groups:  
- *Always satisfied*: customers during minutes when the owner is not grumpy (grumpy[i]=0).  
- *Unsatisfied*: customers arriving when the owner is grumpy (grumpy[i]=1).  

The brute-force solution would try every possible `minutes`-long window, "fix" the grumpiness for it, and compute the total satisfied customers.  
But that's inefficient for large inputs—it'd be O(n × minutes).

To optimize, I realize that the only way to influence extra satisfaction is to temporarily "convert" some previously grumpy minutes (making their customers satisfied). So, I'll:  
- First, sum all always-satisfied customers.
- Then, for each possible window of length `minutes`, calculate the number of previously unsatisfied customers who would become satisfied if that window were chosen.
- Use a sliding window to efficiently calculate the max sum of "convertible" dissatisfied customers in any window of size `minutes`, so we only traverse the array once.

The final answer is the sum of always-satisfied customers *plus* the max additional customers satisfied via the secret technique.

### Corner cases to consider  
- Array length smaller than `minutes`.
- All grumpy values are 0 (nobody needs to be converted).
- All grumpy values are 1 (potential for maximal gain from window).
- `minutes = 1` or equals the input length.
- Windows at the array boundaries.
- customers[i] all zeros (zero customer case).

### Solution

```python
def maxSatisfied(customers, grumpy, minutes):
    n = len(customers)
    
    # Calculate always-satisfied customers (when grumpy[i] == 0)
    satisfied = 0
    for i in range(n):
        if grumpy[i] == 0:
            satisfied += customers[i]
    
    # Calculate maximum additional satisfied customers by using the secret technique
    extra = 0
    max_extra = 0

    # Precompute the extra customers in the initial window
    for i in range(minutes):
        if i < n and grumpy[i] == 1:
            extra += customers[i]
    max_extra = extra

    # Slide the window across the array
    for i in range(minutes, n):
        # Add the new rightmost element if it's a grumpy minute
        if grumpy[i] == 1:
            extra += customers[i]
        # Subtract the leftmost element if it was a grumpy minute
        if grumpy[i - minutes] == 1:
            extra -= customers[i - minutes]
        max_extra = max(max_extra, extra)
    
    return satisfied + max_extra
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We traverse the input arrays only a constant number of times. Initial satisfied sum is O(n), and sliding window is O(n).
  
- **Space Complexity:** O(1)  
  Only a constant amount of extra storage is used, aside from the input arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the secret technique could be used multiple times but not overlapping?
  *Hint: Think "maximum sum of several non-overlapping windows."*
- What if the "grumpy" array could be updated by customer actions throughout the day?
  *Hint: Consider mutable data structures and how your logic would adapt.*
- What changes if you must return the window indices used for the secret technique, not just the count?
  *Hint: Track the position where you get the max_extra.*

### Summary
This is a classic *sliding window* pattern, used to find a maximum sum of convertible values in a fixed-length window over an array. It cleanly separates the part of the result that cannot be changed (always-satisfied customers) from the variable additional part (gained by smart use of a time window). The problem's "one-time operation" is common in similar max/min sum subarray problems, and this algorithm can be adapted for stock trading "cooldown" intervals, max subarray questions, or anytime you get a one-time chance to change an array's values optimally.