### Leetcode 3776 (Medium): Minimum Moves to Balance Circular Array [Practice](https://leetcode.com/problems/minimum-moves-to-balance-circular-array)

### Description  
You are given a circular array `balance` where each element represents a person's balance. In one move, you can transfer 1 unit from any index to its left or right neighbor (with wrap-around due to circularity). Return the minimum number of moves to make every balance non-negative, or -1 if impossible. It's guaranteed that at most one index starts negative.

### Examples  

**Example 1:**  
Input: `balance = [1,2,-3]`  
Output: `3`  
*Explanation: Move 1 from index 1 to 2 → [1,1,-2]; move 1 from 0 to 2 → [0,1,-1]; move 1 from 1 to 2 → [0,0,0]. Total 3 moves.*

**Example 2:**  
Input: `balance = [3,2,5]`  
Output: `0`  
*Explanation: All balances are already non-negative, so no moves needed.*

**Example 3:**  
Input: `balance = [-1]`  
Output: `-1`  
*Explanation: Single element is negative with no other elements to transfer from, so impossible.*


### Thought Process (as if you’re the interviewee)  
First, check if total sum is negative—if yes, impossible since we can't create balance. Next, find the single negative index (or none, return 0). Brute force would simulate all possible transfers, but with n≤185, that's too slow.  

Since it's circular and at most one deficit, think greedily: compute "distance" from deficit index to each surplus position (min clockwise/counterclockwise), and max units transferable from there is balance[i] (must leave it ≥0). Closer surpluses are cheaper per unit, so collect all (distance, surplus) pairs, sort by increasing distance, then greedily take from nearest until deficit is covered—cost is distance × units taken. This is optimal as farther moves are always more expensive.

### Corner cases to consider  
- All non-negative initially → return 0.  
- Single element negative → return -1.  
- Total sum < 0 → return -1.  
- Deficit exactly matches one neighbor's surplus.  
- Circular wrap-around (e.g., deficit at 0 uses n-1).  
- Multiple max-distance surpluses needed.

### Solution

```python
def minimumMovesToBalance(balance):
    # Find total sum; if negative, impossible
    total = sum(balance)
    if total < 0:
        return -1
    
    n = len(balance)
    # Find negative index (guaranteed ≤1)
    neg_idx = -1
    for i in range(n):
        if balance[i] < 0:
            neg_idx = i
            break
    
    # Already all non-negative
    if neg_idx == -1:
        return 0
    
    # Units needed to make negative index 0
    needed = -balance[neg_idx]
    
    # Collect donors: (dist, surplus_amt) for each i != neg_idx
    donors = []
    for i in range(n):
        if i == neg_idx:
            continue
        # Circular distance: min clockwise, counterclockwise
        d = min(abs(i - neg_idx), n - abs(i - neg_idx))
        donors.append((d, balance[i]))
    
    # Sort by distance ascending (greedy: use closest first)
    donors.sort()
    
    moves = 0
    for dist, amt in donors:
        if needed <= 0:
            break
        # Take min(needed, available from this donor)
        take = min(needed, amt)
        moves += take * dist  # Each unit costs dist moves
        needed -= take
    
    return moves if needed <= 0 else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) from sorting n donors; sum/scan is O(n).  
- **Space Complexity:** O(n) for donors list storing distance-surplus pairs.


### Potential follow-up questions (as if you’re the interviewer)  

- (What if multiple negative balances are allowed?)  
  *Hint: Compute median as target, or use prefix sums for min transport cost.*

- (Can we transfer >1 unit per move?)  
  *Hint: Reduces to same greedy but scale units; check if multi-unit changes optimality.*

- (Make all equal instead of non-negative?)  
  *Hint: Target = total//n; compute directed flow to median-like position.*

### Summary
Greedy algorithm prioritizing closest surpluses by circular distance to cover single deficit. Common in circular redistribution/min-cost flow problems (e.g., circular array equalization).

### Flashcard
Greedily cover deficit from nearest circular surpluses first: sort (min-distance, surplus) pairs and accumulate cost as units × distance until covered or impossible.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
