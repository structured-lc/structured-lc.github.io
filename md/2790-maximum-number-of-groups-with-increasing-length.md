### Leetcode 2790 (Hard): Maximum Number of Groups With Increasing Length [Practice](https://leetcode.com/problems/maximum-number-of-groups-with-increasing-length)

### Description  
Given an array usageLimits of size n, where usageLimits[i] represents the maximum number of times the iᵗʰ value can be picked (distinct values, but can be picked multiple times), determine the **maximum number of groups you can form** such that:
- The 1ˢᵗ group has at least 1 element, the 2ⁿᵈ group at least 2 elements, …, the kᵗʰ group at least k elements (all sizes strictly increasing).
- Each group consists of distinct values, no value repeated in a group, and each value’s total uses (across all groups) does not exceed usageLimits[i].
- Return the largest k for which this grouping is possible.

### Examples  

**Example 1:**  
Input: `[1, 2, 5]`  
Output: `3`  
*Explanation:  
You can form three groups:
- Group 1: [A]
- Group 2: [B, C]
- Group 3: [A, B, C]  
All element uses do not exceed their limits. No value is used more than its usage limit.*

**Example 2:**  
Input: `[2, 2, 1]`  
Output: `2`  
*Explanation:  
You can form two groups:
- Group 1: [C]
- Group 2: [A, B]  
You cannot form a third group, as you would run out of available usage counts.*

**Example 3:**  
Input: `[1, 1, 1, 1]`  
Output: `2`  
*Explanation:  
You can form two groups:
- Group 1: [A]
- Group 2: [B, C]  
Not enough unique usages to form a third group of size 3.*

### Thought Process (as if you’re the interviewee)  
Let’s start step by step:

- **Brute Force:**  
  Try to assign values to groups, tracking what is left after each assignment, and check if next group can be larger. This is expensive since the number of assignments explodes combinatorially.

- **Optimized Strategy:**  
  The real question: what is the largest k such that we can form k groups where group i has i members? Total required picks: 1 + 2 + 3 + ... + k = k×(k+1)/2.
  - Each group needs only distinct values (usage limit on each value).
  - Assign usages greedily: always use elements with smallest remaining limits first, to spread out usage.
  - **Sort usageLimits**. Try to repeatedly form a group of next size using the smallest available counts.

- **Algorithm:**  
  1. Sort usageLimits in non-decreasing order.
  2. For group sizes incrementing from 1 upwards:
     - Check if the sum of all available usages (`sum`) is enough to pick the next group (size k).
     - If current sum ≥ needed, decrement available usages, and move to next group size.
     - Repeat until sum < next needed group size.

- **Why sorting helps:**  
  By using lowest limits first, prevent running out for smaller groups before reaching large ones.

### Corner cases to consider  
- Single element array (e.g., [1])
- All elements have limit 1 ([1,1,1,1])
- Large limits but few elements ([5])
- Zeroes present (invalid, depends on constraints)
- Already sorted usageLimits
- Very large array

### Solution

```python
def maxIncreasingGroups(usageLimits):
    # Sort the limits so we use elements with the least available picks first
    usageLimits.sort()
    
    groups = 0   # Total groups formed
    total = 0    # Total available usages left for all elements
    
    for limit in usageLimits:
        total += limit
        # Form a new group if we have enough for the next group size (groups+1)
        if total >= groups + 1:
            groups += 1
            total -= groups  # Use up 'groups' elements for this group
    
    return groups
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n = len(usageLimits). This is due to sorting; the subsequent pass is O(n).
- **Space Complexity:** O(1) (ignoring input), since we use only a constant number of variables. The sort is in-place.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize this to allow repeated values within a group?  
  *Hint: What does “distinct” guarantee in the original problem?*

- Can this be solved without sorting if input has some useful properties?  
  *Hint: Could counting or bucket sort help if range is small?*

- What if each group must also be made up of only even/odd values?  
  *Hint: How would you filter eligible values per group?*

### Summary
This problem is a variation of the greedy grouping/piling pattern, where you aim to maximize the number of increasing-size groups with resource constraints. Sorting is a frequent pattern here, spreading the smallest resources first. A similar logic applies to “maximum number of complete rows,” "coin pile" or "staircase" type problems. This pattern can be applied to task distribution, scheduling, and resource allocation under usage/deduplication limits.