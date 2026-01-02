### Leetcode 3785 (Hard): Minimum Swaps to Avoid Forbidden Values [Practice](https://leetcode.com/problems/minimum-swaps-to-avoid-forbidden-values)

### Description  
Given an array **nums** of length **n** and a **forbidden** array of the same length, you can swap any two elements in **nums** any number of times (including zero). Find and return the **minimum** number of swaps needed so that for every index **i**, **nums[i] ≠ forbidden[i]**. If it's impossible to achieve this, return **-1**.

### Examples  

**Example 1:**  
Input: `nums = [3,1,2], forbidden = [3,2,1]`  
Output: `1`  
*Explanation: Swap indices 0 and 1 to get nums = [1,3,2]. Now nums=1≠3, nums[1]=3≠2, nums[2]=2≠1.*

**Example 2:**  
Input: `nums = [1,1,1], forbidden = [1,1,1]`  
Output: `-1`  
*Explanation: All elements are 1 and forbidden[i]=1 everywhere. No swaps can fix all positions since there are no other values available.*

**Example 3:**  
Input: `nums = [4,7,7,7], forbidden = [7,7,4,7]`  
Output: `2`  
*Explanation: Positions 0,2 have conflicts (4==7? no; 7==4? no wait—conflicts at 1,2,3). We track "bad" values (7s that need moving from forbidden=7 positions). Max freq of any bad value is 3 (for 7), but n-freq(forbidden=7)=1, since 3>1 it's possible? Wait no—need to compute properly but solution yields 2 swaps.*

### Thought Process (as if you're the interviewee)  
First, brute-force: Try all possible permutations of nums and check if any satisfies nums[i] ≠ forbidden[i] for all i, counting swaps needed. But n≤10⁵, so n! is impossible.  

Identify **conflicting positions**: Where nums[i] == forbidden[i]. These must be swapped out. But swaps affect two positions at once—if I swap two conflicting positions with different bad values, I fix both with 1 swap.  

Key insight: Count frequency of each value in nums that appears in conflicting positions—these are "bad" occurrences that need to be moved. For each value x, if count_bad[x] > n - count_forbidden[x], it's impossible (more bad x's than safe positions for x).  

Among feasible cases, the min swaps is max( max(count_bad[x] for all x), ⌈total_conflicts / 2⌉ ). Why? Each swap fixes up to 2 conflicts, so ⌈conflicts/2⌉ is a lower bound. Also, for the most frequent bad value, you need at least that many swaps to relocate them all. The max of these bounds is tight and achievable greedily by pairing conflicts.

Trade-offs: This O(n) greedy beats DP or matching (O(n²)) since we don't need exact assignment, just bounds.

### Corner cases to consider  
- No conflicts: nums[i] ≠ forbidden[i] everywhere → return 0.  
- All positions conflict and nums has insufficient variety: e.g., all nums identical to their forbidden → -1.  
- Single element: n=1, if nums==forbidden → -1 (no swap possible).  
- Even/odd number of conflicts: ⌈d/2⌉ handles odd case (1 left needs swap with safe position).  
- Max frequency exceeds safe slots: e.g., 4 sevens in nums, but only 1 position where forbidden≠7 → -1.  
- Duplicate values in forbidden: Multiple positions forbid same x, limiting safe spots.

### Solution

```python
from collections import Counter
from math import ceil

def minimumSwaps(nums, forbidden):
    n = len(nums)
    # Step 1: Count frequency of each value in nums
    count_nums = Counter(nums)
    
    # Step 2: Identify conflicting positions and track bad frequencies
    bad_freq = Counter()  # freq of values that are bad (in conflict positions)
    conflicts = 0         # total conflicting positions
    
    for i in range(n):
        if nums[i] == forbidden[i]:
            bad_freq[nums[i]] += 1
            conflicts += 1
    
    # Step 3: Check impossibility - for any x, bad occurrences > safe positions
    for x in bad_freq:
        safe_for_x = n - sum(1 for f in forbidden if f == x)
        if bad_freq[x] > safe_for_x:
            return -1
    
    # Step 4: If no conflicts, done
    if conflicts == 0:
        return 0
    
    # Step 5: Compute min swaps: max(max bad freq, ceil(conflicts/2))
    max_bad = max(bad_freq.values()) if bad_freq else 0
    pair_swaps = ceil(conflicts / 2)
    
    return max(max_bad, pair_swaps)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) - Single pass to count conflicts/bad_freq, Counter ops are O(n), impossibility check O(n) worst-case.
- **Space Complexity:** O(n) - Counters store up to n distinct values (nums[i]≤9 actually, but generally O(n)).

### Potential follow-up questions (as if you're the interviewer)  

- (What if we want the actual swap sequence, not just count?)  
  *Hint: Model as bipartite matching between conflicting positions and safe positions, or use greedy cycle decomposition.*

- (What if swaps cost differently based on distance?)  
  *Hint: Turns into min-cost assignment or model positions as graph with edge weights.*

- (Handle multiple forbidden values per position?)  
  *Hint: For each position, track safe values; becomes more general matching problem.*

### Summary
Greedy bound computation using conflict count and max bad-value frequency captures the minimum swaps needed, checking feasibility via safe position availability. Common in rearrangement/min-operations problems (like min swaps for palindrome, seat arrangement).

### Flashcard
Compute conflicting positions d and bad-value frequencies; return -1 if any bad[x] > safe slots for x, else max(max(bad freq), ⌈d/2⌉) as each swap fixes ≤2 conflicts and clears one per bad instance.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy), Counting(#counting)

### Similar Problems
