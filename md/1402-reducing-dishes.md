### Leetcode 1402 (Hard): Reducing Dishes [Practice](https://leetcode.com/problems/reducing-dishes)

### Description  
You're given an array `satisfaction`, where each `satisfaction[i]` is the satisfaction level of the iᵗʰ dish. A chef can prepare any subset of these dishes in any order. For each dish prepared at time t (starting from t=1, then t=2, ...), the chef gains t × satisfaction[i] points. The chef may skip any dish. Your task: Return the maximum total like-time coefficient (the sum of t × satisfaction for all prepared dishes) that the chef can obtain by choosing an optimal preparation order and subset.

### Examples  

**Example 1:**  
Input: `satisfaction = [-1, -8, 0, 5, -9]`  
Output: `14`  
*Explanation: Prepare dishes in the order [5, 0, -1]. Time-points: 1×5 + 2×0 + 3×(-1) = 5 + 0 - 3 = 2, but if you instead do [0, 5], 1×0 + 2×5 = 10, or [5], 1×5 = 5. The best is [0, 5, -1] which gives 0×1 + 2×5 + 3×(-1) = 0 + 10 - 3 = 7. But actually, the optimal is [5, 0, -1] totaling 14.*

**Example 2:**  
Input: `satisfaction = [4, 3, 2]`  
Output: `20`  
*Explanation: Prepare all dishes: 1×2 + 2×3 + 3×4 = 2 + 6 + 12 = 20.*

**Example 3:**  
Input: `satisfaction = [-1, -4, -5]`  
Output: `0`  
*Explanation: It's better to skip all dishes as including any negative satisfaction only hurts the score.*


### Thought Process (as if you’re the interviewee)  
- Brute-force would try all subsets and orders - this is exponential and not practical. 
- Since multiplying negative numbers by higher time hurts the sum, we want to avoid using dishes with very negative satisfaction unless including them ends up boosting the total sum for higher-rated dishes.
- Sort dishes by satisfaction. Consider adding dishes starting from the highest satisfaction (last in sorted order). If cumulative sum with each new dish improves total, we include it. If adding a dish causes the running total to decrease (becomes non-positive), we stop adding further.
- This greedy approach works because adding a dish with lower satisfaction (possibly negative) only helps if the increase in time factors for the remaining (better) dishes outweighs the current "penalty" the negative dish brings.

### Corner cases to consider  
- All satisfactions are negative.
- All satisfactions are positive.
- Zero in array, or all zeros.
- Array length = 1.
- Array with large positive and large negative numbers.


### Solution

```python
from typing import List

def maxSatisfaction(satisfaction: List[int]) -> int:
    # Sort satisfaction in ascending order
    satisfaction.sort()
    n = len(satisfaction)

    ans = 0
    curr_sum = 0
    # Start from the end and accumulate
    for i in range(n-1, -1, -1):
        curr_sum += satisfaction[i]
        if curr_sum > 0:
            ans += curr_sum
        else:
            break  # No point in adding more dishes with negative total
    return ans
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n) — Dominated by sorting the satisfaction array.
- **Space Complexity:** O(1) extra space (aside from input array if sorted in place), only a few integer variables are used.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if you were not allowed to sort the array?  
  *Hint: Is there a way to use a heap to pick dishes in optimal order on the fly?*

- What if some dishes must be included because they're required by the chef?  
  *Hint: Can you adapt the greedy logic to force required elements, and optimize the rest?*

- If you want to maximize not the sum, but the minimum like-time coefficient across chosen dishes, how does the strategy change?  
  *Hint: Focus on balancing the contributions and potentially dynamic programming to track minimum values.*

### Summary
This problem is a classic greedy + prefix sum optimization. The greedy logic of including more negative elements only if it boosts the running sum is a pattern often seen in subset maximization. Sorting and then adding up from the highest values is essential. Similar greedy or prefix sum ideas appear in scheduling, maximizing rewards, and minimizing penalties in sequence-related problems.


### Flashcard
Sort dishes by satisfaction, greedily add highest satisfaction dishes if they improve total sum.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
