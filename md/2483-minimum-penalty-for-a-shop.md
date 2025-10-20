### Leetcode 2483 (Medium): Minimum Penalty for a Shop [Practice](https://leetcode.com/problems/minimum-penalty-for-a-shop)

### Description  
Given a string `customers` of length _n_, where each character is either 'Y' (yes, customers will come this hour) or 'N' (no, customers), you must decide at which hour (from 0 to n inclusive) to close a shop to minimize penalty.  
- **Penalty rules:**  
  - If the shop is **open** and no customers come ('N'), penalty increases by 1.
  - If the shop is **closed** and customers show up ('Y'), penalty increases by 1.  
Return the **earliest hour** to close the shop with minimum penalty.

### Examples  

**Example 1:**  
Input: `customers = "YYNY"`  
Output: `2`  
*Explanation:  
- Close at hour 0: penalty=3 (all 'Y's after, all missed; 1 for open no customers (hour 2))
- Close at hour 1: penalty=2 (hours 1-3: missed 2 'Y's)
- Close at hour 2: penalty=2 (hours 2-3: 1 'N' open, 1 missed 'Y')
- Close at hour 3: penalty=3  
Earliest hour with minimum penalty=2*

**Example 2:**  
Input: `customers = "NNNNN"`  
Output: `0`  
*Explanation:  
- No customers at any time. Opening adds penalty for every hour with 'N' (since shop open and no customer).  
- Closing at 0: shop is always closed, so no penalty. Minimum is 0.*

**Example 3:**  
Input: `customers = "YYYY"`  
Output: `4`  
*Explanation:  
- All hours have customers. Opening is always correct, closing always causes penalty for missed customers.
- Closing at 4: shop never closes during open time, so penalty = 0. Minimum is at n=4.*

### Thought Process (as if you’re the interviewee)  
- **Naive/brute-force:** For every possible closing time 0 to n, simulate the penalty:
  - For hours < closing, add 1 for every 'N' (open but no customer).
  - For hours ≥ closing, add 1 for every 'Y' (closed but customer).
  - O(n²) overall, but that's too slow for n up to 10⁵.  

- **Observation:**  
  - There are only n+1 possible closing times.
  - Each closing time only needs to know cumulative 'Y' and 'N' statistics up to that point, so we can precompute prefix sums.

- **Optimized approach:**  
  - For closing at hour j:
    - Penalty = (number of 'N' in [0, j)) + (number of 'Y' in [j, n))
    - Track prefix sums of number of 'Y's and 'N's for fast calculation.
    - Iterate through all possible closing hours, compute penalty in O(1) per closing time.

- **Decision:**  
  - Since ties must return the **earliest** such hour, store the earliest index with the minimum penalty.

### Corner cases to consider  
- Empty string.
- All 'N's (shop never has any customers).
- All 'Y's (shop always has customers every hour).
- Alternate 'Y', 'N' patterns.
- Ties at multiple closing hours, must pick the earliest.
- Single-element strings ('N' or 'Y').

### Solution

```python
def bestClosingTime(customers: str) -> int:
    n = len(customers)
    penalty = 0
    min_penalty = customers.count('Y')  # If closed at time 0, all 'Y's missed.
    best_hour = 0

    # Now process hours: keeping shop open for prefix, compute penalty
    # At each hour j: penalty = missed 'Y's after j + open on 'N's before j
    # We step through hours, adjusting penalty as if closing at hour j+1
    
    for j in range(n):
        # If customers[j] == 'Y', we open one more hour; we won't miss this 'Y' as penalty now,
        # but if customers[j] == 'N', penalty increases (open, no customer)
        if customers[j] == 'Y':
            min_penalty -= 1
        else:
            penalty += 1
        if penalty + min_penalty < min_penalty:
            min_penalty = penalty + min_penalty
            best_hour = j + 1
    # Actually, more elegantly:
    penalty = 0
    min_penalty = customers.count('Y')
    best_hour = 0
    for i, c in enumerate(customers):
        # If 'N', open but no customer = penalty
        if c == 'N':
            penalty += 1
        else:
            min_penalty -= 1
        if penalty + min_penalty < customers.count('Y'):
            customers.count('Y')
        if penalty + min_penalty < customers.count('Y')+penalty:
            min_penalty = penalty + min_penalty
            best_hour = i + 1
    # More general implementation:
    penalty = 0
    totalY = customers.count('Y')
    min_penalty = totalY
    best_hour = 0
    for j in range(n):
        if customers[j] == 'Y':
            totalY -= 1
        else:
            penalty += 1
        if penalty + totalY < min_penalty:
            min_penalty = penalty + totalY
            best_hour = j + 1
    return best_hour
```

**Alternative, more compact and readable:**

```python
def bestClosingTime(customers: str) -> int:
    n = len(customers)
    penalty = customers.count('Y')
    min_penalty = penalty
    res = 0

    for i, c in enumerate(customers):
        # At each hour, if 'Y', we're open, so one less customer missed later
        if c == 'Y':
            penalty -= 1
        else:
            penalty += 1
        if penalty < min_penalty:
            min_penalty = penalty
            res = i + 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each character is visited exactly once, and prefix penalties updated in O(1).

- **Space Complexity:** O(1)  
  Variables for penalty and counters; no extra storage linear to input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return *all* hours that achieve minimal penalty?  
  *Hint: Track every hour where penalty matches the global minimum.*

- How would you adapt this for more than two customer types, e.g. VIP vs regular?  
  *Hint: You'd need separate penalties and possibly multiple prefix sums.*

- What if closing and opening had additional costs?  
  *Hint: Add those fixed costs at each closing calculation and seek minimum.*

### Summary
This problem is a **prefix sum** and **greedy scan** optimization, common where costs or rewards are split around a division point.  
The idea generalizes to "break point"/"cutoff" minimization tasks in strings/arrays, and the technique can be found in scheduling, cutoff detection, and certain dynamic programming base cases.


### Flashcard
Precompute prefix sums of 'Y' and 'N', then for each closing time, compute penalty in O(1) using these sums.

### Tags
String(#string), Prefix Sum(#prefix-sum)

### Similar Problems
- Grid Game(grid-game) (Medium)
- Minimum Amount of Damage Dealt to Bob(minimum-amount-of-damage-dealt-to-bob) (Hard)