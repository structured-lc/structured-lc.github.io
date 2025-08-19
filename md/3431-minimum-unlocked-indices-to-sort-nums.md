### Leetcode 3431 (Medium): Minimum Unlocked Indices to Sort Nums [Practice](https://leetcode.com/problems/minimum-unlocked-indices-to-sort-nums)

### Description  
Given two lists, **nums** and **locked**, both of equal length:
- **nums** only contains the numbers 1, 2, or 3.
- **locked**: locked[i] is 1 if the iᵗʰ index is *locked* (cannot be changed directly), or 0 if it is *unlocked* (can be swapped freely with other unlocked positions).

You can *unlock* locked indices by paying one operation per index. After unlocking some indices, you can freely sort the numbers at all unlocked positions (including the newly unlocked ones).

The task: **Return the minimum number of indices you need to unlock so that you can fully sort nums. If sorting is impossible even after unlocking, return -1.**

---

### Examples  

**Example 1:**  
Input: `nums = [2, 3, 1, 2, 3]`, `locked = [0, 1, 1, 0, 1]`  
Output: `2`  
*Explanation:  
The indices 1 and 2 (locked) block the 3 and 1.  
If you unlock both, you can move the numbers in the unlocked area.  
Unlocking both allows you to freely reposition all necessary elements to sort nums to [1, 2, 2, 3, 3].*

**Example 2:**  
Input: `nums = [1, 3, 2, 3, 2]`, `locked = [1, 1, 1, 1, 1]`  
Output: `-1`  
*Explanation:  
All indices are locked. The 3 at index 1 is before the last 1. Because you cannot swap or unlock any element, sorting is impossible.*

**Example 3:**  
Input: `nums = [2, 1, 2]`, `locked = [0, 0, 0]`  
Output: `0`  
*Explanation:  
All indices are already unlocked, so you can sort with no extra operations.*

---

### Thought Process (as if you’re the interviewee)  

The problem can be reduced to **identifying "critical" locked indices that block proper ordering**. Sortability in this case means all 1's must be before all 2's, which must be before all 3's.

**Brute-force:**  
Try all combinations of unlocking indices, but that's exponential—too slow.

**Optimized:**  
Notice:
- If any 3 appears *before* the last 1, sorting is impossible (since you can't swap locked indices by any means).
- The main blockers are locked indices in key transition zones:
  - Between the first 2 and last 1 (must put all 1's before all 2's)
  - Between the first 3 and last 2 (must put all 2's before all 3's)

**Algorithm:**
1. Track positions:
   - last1 = last index of a 1
   - first2 = first index of a 2
   - last2 = last index of a 2
   - first3 = first index of a 3
2. If first3 < last1, return -1 (impossible)
3. Count *locked* indices within:
   - first2 ≤ i < last1 (between first 2 and last 1)
   - first3 ≤ i < last2 (between first 3 and last 2)
4. The answer is the number of such locked indices.

---

### Corner cases to consider  
- All indices are initially unlocked (`locked` all 0).
- All indices are locked (`locked` all 1), and the array is not sorted.
- Some transitions don't exist (e.g., no 3's in nums).
- Already sorted (should return 0 regardless of locked/unlocked unless impossible).
- Only one type of element (e.g., `[3,3,3]` or `[1,1,1]`).

---

### Solution

```python
def minUnlockedIndices(nums, locked):
    n = len(nums)
    first2 = n
    first3 = n
    last1 = -1
    last2 = -1
    
    # Identify the transition positions
    for i, val in enumerate(nums):
        if val == 1:
            last1 = i
        elif val == 2:
            if first2 == n:
                first2 = i
            last2 = i
        elif val == 3:
            if first3 == n:
                first3 = i
    
    # If any 3 comes before the last 1, impossible to sort
    if first3 < last1:
        return -1

    count = 0
    for i in range(n):
        # Need to unlock locked indices in [first2, last1)
        if locked[i] == 1 and first2 <= i < last1:
            count += 1
        # Need to unlock locked indices in [first3, last2)
        if locked[i] == 1 and first3 <= i < last2:
            count += 1
    return count
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We traverse nums once for positions and once over the array for counting.
- **Space Complexity:** O(1)  
  Uses only counters and basic variables regardless of input size.

---

### Potential follow-up questions (as if you’re the interviewer)  

- What if swaps between *any* indices were allowed, regardless of locked/unlocked?  
  *Hint: Could the answer ever be impossible then?*

- If allowed to unlock a range of indices at a bulk "block" cost, how would your algorithm adapt?  
  *Hint: How would you identify minimal disjoint unlocking ranges?*

- What if more than 3 distinct numbers are in nums?  
  *Hint: Generalize the interval covering logic for multiple transitions between number groups.*

---

### Summary

This problem leverages **interval analysis** and careful **transition detection** within a limited domain (only 1,2,3 in nums). The key coding pattern is **range-based greedy counting**, and the approach is memory-efficient and linear time.  
Related patterns include "critical block detection," two pointers, and interval sweeps, which are also used in merge intervals, sliding window optimization, and subarray/group partitioning problems.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
