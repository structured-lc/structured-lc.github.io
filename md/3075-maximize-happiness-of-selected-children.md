### Leetcode 3075 (Medium): Maximize Happiness of Selected Children [Practice](https://leetcode.com/problems/maximize-happiness-of-selected-children)

### Description  
You are given an array `happiness` of length n. Each `happiness[i]` represents the happiness value of the iᵗʰ child standing in a line. You also have a positive integer k, the number of children you must select in k turns.  
Each turn, you choose 1 child; after the child is chosen, all not-yet-chosen children have their happiness value decreased by 1 (but happiness cannot go below zero).  
Your goal is to select k children so that the sum of their effective happiness values (value at selection time) is maximized.

### Examples  

**Example 1:**  
Input: `happiness = [1,2,3], k = 2`  
Output: `4`  
*Explanation: Pick the child with happiness 3 first. Remaining: [1,2] → after decrement: [0,1]. Then, pick the child with happiness 1. Total = 3 + 1 = 4.*

**Example 2:**  
Input: `happiness = [1,1,1,1], k = 2`  
Output: `1`  
*Explanation: Pick any child: remaining: [1,1,1] → after decrement: [0,0,0]. Pick any next: value is 0. Total = 1 + 0 = 1.*

**Example 3:**  
Input: `happiness = [2,3,4,5], k = 1`  
Output: `5`  
*Explanation: Pick max first (5, index 3); only one pick needed, so total is 5.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach is to try all ways of picking k children and simulating the decrements each time. This would be exponential and is not feasible.

To optimize, if we pick the happiest child each round, we're delaying decrements on the largest values, so they suffer the least loss. Thus, sort `happiness` in descending order.  
When picking children, for the iᵗʰ pick (0-based), that child's happiness has been decremented i times, so their effective value is max(happiness[i] - i, 0). We sum the k largest adjusted values.

**Why this works:**  
- Picking happier kids earlier prevents them from becoming less happy due to decrements.
- The decrements act as a penalty for each selection delay.
- Greedy by happiness value ensures we always maximize the marginal contribution at each turn.

### Corner cases to consider  
- k = 0 (select none): answer is 0.
- k > n: Not possible by problem description, but if it were, stop at n picks.
- All happiness = 0: Total is 0.
- Some happiness initially < k: Later picks can become 0 due to repeated decrementing.
- Large arrays; confirm solution is efficient for n up to 10⁵.
- All happiness equal: Only first pick(s) are positive; others could drop to 0.

### Solution

```python
from typing import List

def maximumHappinessSum(happiness: List[int], k: int) -> int:
    # Sort happiness values descending
    happiness.sort(reverse=True)
    total = 0
    # Select the happiest available child in each turn
    for i in range(k):
        # The i-th selected child's happiness is reduced by i (number of previous picks)
        eff = happiness[i] - i
        if eff < 0:
            eff = 0
        total += eff
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  (Sorting the happiness list is the dominant operation, selection is O(k) and k ≤ n).
- **Space Complexity:** O(n)  
  (Sorting makes a shallow copy, otherwise O(1) extra.)

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could select the k children all at once (no decrement penalty)?
  *Hint: No need to decrement; just pick the k largest values.*

- How would you do it if happiness values could be negative?
  *Hint: When computing max(happiness[i] - i, 0), allow the possibility of negative picks—should negative picks ever be made?*

- Can you do this in O(n) without full sort for large n and small k?
  *Hint: Use a heap to extract k largest values.*

### Summary
This problem uses the greedy pattern: always take the largest available value to minimize future loss (due to decrements). The problem reduces to sorting and then simulating the decrement process for at most k children.  
This *selection with penalty* pattern shows up in resource allocation, optimal scheduling, and variations of knapsack where the value diminishes with delay.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Maximum Candies Allocated to K Children(maximum-candies-allocated-to-k-children) (Medium)