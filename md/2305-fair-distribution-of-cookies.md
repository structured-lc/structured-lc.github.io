### Leetcode 2305 (Medium): Fair Distribution of Cookies [Practice](https://leetcode.com/problems/fair-distribution-of-cookies)

### Description  
You are given an integer array **cookies** where cookies[i] is the number of cookies in the iᵗʰ bag, and an integer **k** (the number of children). Your goal is to distribute all the bags to the children — you can't split a bag, and each bag must be assigned to one child. The **unfairness** of a distribution is defined as the maximum cookies any single child receives. Return the **minimum unfairness** possible among all valid assignments.

### Examples  

**Example 1:**  
Input: `cookies = [8,15,10,20,8]`, `k = 2`  
Output: `31`  
*Explanation: One optimal way is to assign [8,15,8] to child 1 and [10,20] to child 2. Child 1 gets 31, child 2 gets 30. The unfairness is max(31,30) = 31. No distribution achieves lower unfairness.*

**Example 2:**  
Input: `cookies = [6,1,3,2,2,4,1,2]`, `k = 3`  
Output: `7`  
*Explanation: One optimal assignment: [6,1], [3,4], [2,2,1,2]. The max given to a child is 7.*

**Example 3:**  
Input: `cookies = [1,2,3]`, `k = 3`  
Output: `3`  
*Explanation: Each child gets one bag: [1], [2], [3]. Every child gets their own bag, so unfairness is 3.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  - Try all possible ways of distributing n bags among k children.
  - For each distribution, compute the unfairness (max total cookies for any one child) and record the minimum.
  - This is O(kⁿ), which is intractable for n > 7 or so.

- **Backtracking with Pruning:**  
  - Represent the bags assigned to each child as an array of sums.
  - At every step (assigning the next bag), try putting it with each child recursively, then undo to backtrack.
  - **Prune:**  
    - If at any step, the current maximum cookies assigned to any child already ≥ current best (minimum unfairness so far), stop searching that path.
    - If multiple children have the same total so far, don't try assigning identical future bags to interchangeable children (avoid duplicate computation).
  - Sort cookies in descending order to try placing large bags first, helping prune earlier.

- This makes the solution feasible for n ≤ 8, which is the problem’s constraint.

**Chosen approach:**  
Backtracking with pruning, keeping track of current assignments, aborting unpromising branches early.

### Corner cases to consider  
- All cookies are the same size: [2,2,2,2], k = 2
- Only one bag: , k = 2
- Only one child: cookies = [...], k = 1
- More children than bags: cookies = [1,2], k = 5
- Large bags with zeros: [0,0,10], k = 2
- No cookies: [ ], k = any (not valid as per constraints, but should not crash)

### Solution

```python
from typing import List

class Solution:
    def distributeCookies(self, cookies: List[int], k: int) -> int:
        # We will do recursive backtracking.
        n = len(cookies)
        res = float('inf')
        children = [0] * k

        def backtrack(idx):
            nonlocal res
            if idx == n:
                # All bags assigned: update res if a better max found
                res = min(res, max(children))
                return
            # Prune if current max in this path already worse than res
            for c in range(k):
                # Optimization: if this assignment gives same state as previous,
                # skip duplicate work (avoid symmetric permutations)
                if c > 0 and children[c] == children[c-1]:
                    continue
                children[c] += cookies[idx]
                # Prune if this path can't improve on res
                if max(children) < res:
                    backtrack(idx + 1)
                children[c] -= cookies[idx]
                # If this child has no cookies after removal (early empty),
                # no point assigning next cookies to further empty kids in this path
                if children[c] == 0:
                    break

        # Sort cookies descending: try big bags first for earlier pruning
        cookies.sort(reverse=True)
        backtrack(0)
        return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - In worst case, O(kⁿ), as each of n bags can go to any of k children.
  - But with pruning and symmetry avoidance, it’s much faster in practice for n ≤ 8 (as required).
- **Space Complexity:**  
  - O(k) for the array tracking the cookies per child.
  - O(n) recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose each child must get at least one bag.  
  *Hint: Add a check at the end of assignment (all assigned) that no child has zero; prune branches that would lead to unassigned children.*

- What if the bags can be split arbitrarily between children?  
  *Hint: This becomes min-max “load balancing”, solved greedily by always assigning the current bag to the child with the smallest total.*

- How would you optimize further for very large n (over 10)?  
  *Hint: Consider using DP+bitmask if n ≤ 20, or approximation algorithms/greedy if n much larger.*

### Summary
This problem is a classic **backtracking with pruning** pattern, minimized unfairness being the "max of partitions". It uses recursion, state space pruning, and symmetry breaking — concepts common in fair allocation and load balancing domains. Variants appear in multi-way partition problems, task scheduling, or distributing objects with a fairness criterion.
