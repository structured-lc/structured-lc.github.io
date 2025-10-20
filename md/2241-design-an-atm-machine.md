### Leetcode 2241 (Medium): Design an ATM Machine [Practice](https://leetcode.com/problems/design-an-atm-machine)

### Description  
Design an ATM machine simulation that supports two operations:
- **deposit(banknotesCount):** Deposit a given list of banknotes into the ATM, according to the order: \[20, 50, 100, 200, 500\].
- **withdraw(amount):** Withdraw a specific amount using the least number of banknotes possible, prioritizing larger denominations first. If exact withdrawal isn't possible, reject and return \[-1\]. The machine starts empty.

### Examples  

**Example 1:**  
Input: `["ATM", "deposit", "withdraw", "deposit", "withdraw", "withdraw"]`,  
`[[], [0,0,1,2,1], , [0,1,0,1,1], , ]`  
Output: `[null, null, [0,0,1,0,1], null, [-1], [0,1,0,0,1]]`  
*Explanation:*
- deposit([0,0,1,2,1]): +1 $100, +2 $200, +1 $500.
- withdraw(600): ATM has {20:0, 50:0, 100:1, 200:2, 500:1}, gives 1 $100, 1 $500 (total $600).
- deposit([0,1,0,1,1]): +1 $50, +1 $200, +1 $500.
- withdraw(600): Cannot give another exact $600 (insufficient $100s), returns [-1].
- withdraw(550): Uses 1 $50, 1 $500.

**Example 2:**  
Input: `["ATM", "withdraw"]`,  
`[[], ]`  
Output: `[null, [-1]]`  
*Explanation*: ATM is empty, cannot withdraw 100.

**Example 3:**  
Input: `["ATM", "deposit", "withdraw"]`,  
`[[], [3,0,0,0,0], ]`  
Output: `[null, null, [3,0,0,0,0]]`  
*Explanation*: Deposit 3×$20. Withdraw 60: uses all 3.

### Thought Process (as if you’re the interviewee)  
- The ATM only needs to support 5 denominations, which are always in a specific order.
- For **deposit**, simply add the given counts (element-wise) to the internal counters by denomination.
- For **withdraw**, use a greedy approach: always try to use the largest available denomination as much as possible (without exceeding both the count and the remaining amount), then proceed to smaller denominations.
- After calculating the needed banknotes, only actually deduct them if the withdrawal is successful (i.e., the remaining amount reaches zero). Otherwise, leave the ATM state unchanged.
- Greedy works because larger notes always count more heavily towards the amount, so using smaller ones when larger are possible never reduces the total count of bills used.

### Corner cases to consider  
- Withdraw amount is less than the smallest bill ($20).
- Amount is not divisible by 10 or is impossible with available denominations (e.g., try 30 or 70 with just $50s and $200s in ATM).
- Not enough notes of a required denomination, even if in total the amount exists (e.g., need two $100s but only one left).
- Withdraw from empty ATM or after a rejection (ATM state should not have changed).
- Deposit of all zeros; Withdraw amount is exactly zero.

### Solution

```python
class ATM:
    def __init__(self):
        # Banknote denominations in order: [20, 50, 100, 200, 500]
        self.denoms = [20, 50, 100, 200, 500]
        # Count of each note
        self.counts = [0] * 5

    def deposit(self, banknotesCount):
        # Add deposited bills to each denomination
        for i in range(5):
            self.counts[i] += banknotesCount[i]

    def withdraw(self, amount):
        res = [0] * 5
        rem = amount
        # Try to use large bills first, from largest to smallest
        for i in range(4, -1, -1):
            note = self.denoms[i]
            # Max notes usable from this denomination, without exceeding rem or what's available
            num = min(rem // note, self.counts[i])
            res[i] = num
            rem -= num * note
        if rem != 0:
            return [-1]
        # Commit: decrement notes only if successful
        for i in range(5):
            self.counts[i] -= res[i]
        return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) for both deposit and withdraw, since the banknote types are fixed (just 5).
- **Space Complexity:** O(1) for storage, as we only have 5 counters plus the constant space for bookkeeping.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there were more denominations or the order was dynamic?  
  *Hint: Could use a map or dynamic data structures instead of a fixed array.*

- How would you handle concurrent access (multiple withdrawal or deposit requests at the same time)?  
  *Hint: Consider thread-safety, use locks or similar mechanisms.*

- If notes can get jammed in the ATM and become temporarily unavailable, how would your design change?  
  *Hint: Track available vs. faulty notes, maybe add a maintenance flag per slot.*

### Summary
This problem is a classic greedy simulation: for each withdrawal, maximize the use of large denominations, greedy style. The ATM is modeled as a simple fixed-length array. This pattern—greedily taking the largest at each step—shows up in coin change, scheduling, and other resource allocation problems with hierarchical resources.


### Flashcard
Track banknote counts; withdraw greedily from largest to smallest denomination.

### Tags
Array(#array), Greedy(#greedy), Design(#design)

### Similar Problems
- Simple Bank System(simple-bank-system) (Medium)
- Minimum Number of Operations to Convert Time(minimum-number-of-operations-to-convert-time) (Easy)