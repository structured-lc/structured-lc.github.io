### Leetcode 2499 (Hard): Minimum Total Cost to Make Arrays Unequal [Practice](https://leetcode.com/problems/minimum-total-cost-to-make-arrays-unequal)

### Description  
You are given two arrays, **nums1** and **nums2**, of length n. You can swap elements at any indices \(i\) and \(j\) (i < j), and the cost of a swap is i + j.  
The goal: Make **nums1** and **nums2** *unequal* at every index (i.e., for all i, nums1[i] ≠ nums2[i]) by any number of swaps, at the minimum possible total cost.  
If it is impossible to achieve, return -1.

### Examples  

**Example 1:**  
Input: `nums1 = [1,2,1]`, `nums2 = [2,1,2]`  
Output: `0`  
*Explanation: All indices already satisfy nums1[i] ≠ nums2[i]. No swaps needed, so cost is 0.*

**Example 2:**  
Input: `nums1 = [1,2,2]`, `nums2 = [2,2,2]`  
Output: `1`  
*Explanation:  
- Initially, at index 1 and 2, nums1[i] == nums2[i] == 2.  
- We must swap to fix at least one.
- Swap index 0 and 1. After swap: nums1=[2,1,2], nums2=[2,2,2].
- Now only index 2 is still bad, but there's no further swap to help (both positions have the same value).
- If we swap (1,2): nums1=[2,2,1], nums2=[2,2,2]. Still, two indices match.
- Thus, after swapping indices 0 and 1 (cost=0+1=1), at least one is fixed.
- But the last duplicate remains, so not all indices are fixed...  
- Actually, it's **impossible**. Answer: `-1`.*

**Example 3:**  
Input: `nums1 = [2,2,2]`, `nums2 = [2,2,2]`  
Output: `-1`  
*Explanation: All indices match, and any swaps among equal numbers can't create non-equal pairs. So it's impossible.*

### Thought Process (as if you’re the interviewee)  
**Brute force:**  
Try every possible sequence of swaps, check if each swap “breaks apart” idx where nums1[i] == nums2[i]. But that's O(n!) and infeasible for n up to 10⁵.

**Observation:**  
We need to “fix” all indices i where nums1[i] == nums2[i]. At such indices, neither swapping alone nor between two such “conflict” indices will help. So, we need to “bring in” other values from outside.

**Optimization:**  
- Count how many “conflict” positions there are, and for which value.
- The worst case is if a value occurs so often at conflicts that it's impossible to “spread them apart” through swapping.
- The “bottleneck” is if any value appears among the conflicts more than ⌊total_conflicts/2⌋ times. Then we can't break all conflicts without swapping in from outside.
- To fix, greedily swap with positions outside the conflict group such that neither nums1[i] nor nums2[i] match the “troublesome” value.

**Final approach:**  
- First, sum costs for all conflict positions (i.e., indices where nums1[i] == nums2[i]).
- For every index with nums1[i] ≠ nums2[i], and both not equal to the most frequent conflicting value, swap these in as needed (lowest cost: smallest indices).
- If enough such swaps are available, output the total cost; otherwise, return -1.

### Corner cases to consider  
- Arrays are already unequal at all indices (cost 0).
- All numbers are the same (impossible).
- Only one conflict, or all but one conflict.
- Not enough “other” values to fix the conflicts.
- Large n, but very skewed value distributions.
- nums1 and nums2 have no overlap.

### Solution

```python
def minimumTotalCost(nums1, nums2):
    n = len(nums1)
    total_cost = 0
    max_freq = 0
    most_freq_num = 0
    conflict_freq = dict()
    conflict_positions = []

    # Step 1: Record conflict positions (where nums1[i] == nums2[i])
    for i in range(n):
        if nums1[i] == nums2[i]:
            conflict_positions.append(i)
            conflict_freq[nums1[i]] = conflict_freq.get(nums1[i], 0) + 1
            if conflict_freq[nums1[i]] > max_freq:
                max_freq = conflict_freq[nums1[i]]
                most_freq_num = nums1[i]
            total_cost += i

    # Step 2: Count how many extra swaps needed to "break" the most frequent conflict value
    must_swap = max(0, 2 * max_freq - len(conflict_positions))

    # Step 3: Find additional candidates to swap in
    extras = []
    for i in range(n):
        if nums1[i] != nums2[i]:
            # Both are not the most frequent value: valid
            if nums1[i] != most_freq_num and nums2[i] != most_freq_num:
                extras.append(i)

    # Step 4: If not enough, impossible
    if must_swap > len(extras):
        return -1

    # Step 5: Add cost of first must_swap valid swaps
    for i in range(must_swap):
        total_cost += extras[i]

    return total_cost
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  We iterate over the arrays a few times: once to identify conflicts (O(n)), once to gather extra indices (O(n)), once for up to O(n) additional swaps.
- **Space Complexity:** O(n) in the worst case (due to storing conflict positions, frequencies, and extra indices).

### Potential follow-up questions (as if you’re the interviewer)  

- How do you handle the scenario if costs are based on the elements instead of indices?  
  *Hint: The mapping between indices and costs breaks, so try a min-heap or sorted structure for greedy selection.*

- Can we handle the case where swap cost varies (not i + j)?  
  *Hint: Re-think the greedy selection by minimizing cost at every step via a custom cost comparator.*

- What if only k swaps are allowed?  
  *Hint: You need to select the most “effective” swaps — possibly optimizing which conflicts to fix first.*

### Summary
This is a classic hard greedy + counting problem, often appearing with "spread apart values to avoid collision" constraints.  
The core is finding "bottleneck" values in conflicts, then using *just enough* outside swaps to break deadlocks, always favoring swaps at lowest possible cost.  
This “conflict resolve + greedy fixup” can be applied to array rearrangement, double-pointer mismatch fixing, or similar scheduling problems.


### Flashcard
Count "conflict" indices where nums1[i] = nums2[i]; swap with non-conflict values to resolve, minimizing total cost.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy), Counting(#counting)

### Similar Problems
