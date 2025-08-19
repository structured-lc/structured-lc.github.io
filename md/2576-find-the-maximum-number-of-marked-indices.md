### Leetcode 2576 (Medium): Find the Maximum Number of Marked Indices [Practice](https://leetcode.com/problems/find-the-maximum-number-of-marked-indices)

### Description  
Given a 0-indexed array of integers `nums`, all indices are initially unmarked. You may repeatedly perform the following operation any number of times:  
Pick two different unmarked indices i and j such that 2 × nums[i] ≤ nums[j], then mark i and j.  
Return the **maximum number of marked indices** that can be reached by repeating this operation as many times as possible.  
(You are always marking **pairs**. Each index can be marked at most once.)

### Examples  

**Example 1:**  
Input: `nums = [3,5,2,4]`  
Output: `2`  
*Explanation: Mark index 2 (nums[2]=2) and index 1 (nums[1]=5) since 2×2 ≤ 5. No other pair can be formed.*

**Example 2:**  
Input: `nums = [9,2,5,4]`  
Output: `4`  
*Explanation: Mark index 3 (4) and index 0 (9), since 2×4=8 ≤ 9. Then mark 1 (2) and 2 (5), since 2×2=4 ≤ 5. All indices are marked: total 4.*

**Example 3:**  
Input: `nums = [7,6,8]`  
Output: `0`  
*Explanation: No valid pairs, as 2×6=12>7, 2×7=14>6, 2×8=16>7, etc. No operation.*

### Thought Process (as if you’re the interviewee)  
- Start by brute-force: Try all possible pairs of unmarked indices (i, j), mark them if 2 × nums[i] ≤ nums[j], and recursively continue. But this leads to high computational cost—O(n^2) choices per step, not feasible for n up to 10⁵.
- We notice we want to **maximize pairs**—always pair the smallest possible number with a large enough number, using each index at most once.
- **Optimization:**  
  - **Sort** nums.
  - Try to pair the **smallest unmarked** (from left) with the **smallest valid** larger number (from middle or right).
  - Use a two-pointer technique: left starts at 0, right starts at ⌊n/2⌋ or (n+1)//2, compare 2 × nums[left] ≤ nums[right]. If so, mark both and increment result by 2, and move both pointers forward. Otherwise, right++
  - This is similar to greedy pairing in matching problems—always pair as early as possible.

### Corner cases to consider  
- Single element: `[1]` → Output: 0  
- All numbers too close: `[5,5,5,5]` → Output: 0  
- All possible pairs: e.g. `[1,10,1,10]`  
- Sorted vs. unsorted input  
- Large input with only one possible marking  
- n odd and even  
- Numbers at maximum/minimum limits

### Solution

```python
def maxNumOfMarkedIndices(nums):
    # Sort the numbers to pair smallest with largest so that 2×nums[left] ≤ nums[right]
    nums.sort()
    n = len(nums)

    # Left pointer at 0, right pointer at ⌊n/2⌋ (middle of the array)
    left, right = 0, (n + 1) // 2
    marked = 0

    # Two pointer approach
    while right < n:
        # If we can pair, mark both (count +2), advance both pointers
        if nums[left] * 2 <= nums[right]:
            marked += 2
            left += 1
        # Always move right (progress through larger numbers)
        right += 1

    return marked
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) — for sorting the input array. The two-pointer scan after that is O(n).
- **Space Complexity:** O(1) extra (ignoring sorting in-place), or O(n) if counting the original array storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the marking allowed overlapping pairs, i.e., indices can be marked more than once?  
  *Hint: Consider graph/greedy matching.*

- Can you return the list of pairs used, not just the count?  
  *Hint: Track index positions during sort and record pairings.*

- How would your approach change if the condition was nums[i] + nums[j] ≥ T for given T?  
  *Hint: This modifies the pairing logic, may require two-pointers from opposite sides.*

### Summary
A classic greedy + two-pointer solution after sorting: pair smallest available element with smallest large-enough element. This "pairing/greedy" pattern can be seen in matchings (assignments, socks, etc.), "max pairs with some constraint" problems, and optimizations involving sorted arrays and two-pointer sweeps.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Minimum Array Length After Pair Removals(minimum-array-length-after-pair-removals) (Medium)