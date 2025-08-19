### Leetcode 2763 (Hard): Sum of Imbalance Numbers of All Subarrays [Practice](https://leetcode.com/problems/sum-of-imbalance-numbers-of-all-subarrays)

### Description  
Given an array of integers, you are asked to calculate the sum of *imbalance numbers* of all possible subarrays.  
The *imbalance number* of a subarray is defined as the number of pairs of consecutive elements (in its sorted order) where the difference between the elements is greater than 1.  
To solve this, for each subarray, you need to list its elements, sort them, and count how many times the difference between neighboring sorted elements is >1. The total answer is the sum of these imbalance numbers for all possible subarrays.

### Examples  

**Example 1:**  
Input: `[1,2,4]`  
Output: `1`  
*Explanation: Subarrays and imbalance:*  
- `[1]`: sorted `[1]`, imbalance 0  
- `[1,2]`: sorted `[1,2]`, imbalance 0  
- `[1,2,4]`: sorted `[1,2,4]`, difference between 2 and 4 is 2 (>1), so imbalance 1  
- `[2]`, `[2,4]`, `[4]` contribute 0 each  
Total = 1

**Example 2:**  
Input: `[3,1,3,3,5]`  
Output: `8`  
*Explanation: (Eliding explicit breakdown for brevity, but for each subarray repeat the above—sort, count gaps >1, sum)*

**Example 3:**  
Input: `[2,3,1,4]`  
Output: `3`  
*Explanation:  
- `[2,3]`: sorted `[2,3]`, no gaps >1  
- `[3,1,4]`: sorted `[1,3,4]`, the gap between 1 and 3 is 2 (>1), imbalance increases by 1  
- Continue for all other subarrays…  
Total sum = 3

### Thought Process (as if you’re the interviewee)  
First, brute-force: For each of O(n²) subarrays, extract the subarray, sort it, then for each pair of consecutive sorted elements check if their difference >1, and count such pairs.  
- For subarray of length k, sorting takes O(k log k), loop is O(k), so overall O(n³ log n) time—way too slow for large n.

Optimization:  
Notice that we only care about the *number* of gaps >1 in a sorted subarray. Instead of full sorting each time, can we maintain gaps as we build each subarray?  
- For every starting index L, keep a structure (like a set or SortedList) for the current numbers.  
- When adding new R (right end), insert nums[R] into the sorted set.  
- As each element is added, only new gaps involving this element matter. Check direct neighbors:  
    - If inserting num, check if its left and right neighbors in the set (if any) had a gap >1 before, and how it changes after insertion.  
    - Adjust current count of gaps accordingly.  
- This idea leads to O(n² log n) via using a balanced BST or `SortedList`.

There are further optimizations to O(n²) by noting that for each subarray, the number of pairs of consecutive values (values that are consecutive integers) can be precomputed FAST, but the simplest “efficient and safe” solution is the set + incremental imbalance count.

### Corner cases to consider  
- Empty array (should be 0, but input may guarantee n≥1)
- All elements equal: no gaps >1 possible in any subarray ⇒ total 0
- Strictly consecutive values: subarrays should also have imbalance 0  
- Arrays with large jumps, e.g. `[1,100]` 
- Single element subarrays: imbalance 0
- Negative numbers or unsorted input

### Solution

```python
def sumImbalanceNumbers(nums):
    n = len(nums)
    result = 0
    for i in range(n):
        # Track present elements and dynamically-count imbalance
        seen = set()
        curr_imbalance = 0
        seen.add(nums[i])
        for j in range(i+1, n):
            x = nums[j]
            # If x is already present, just add current imbalance
            if x in seen:
                result += curr_imbalance
                continue
            # Check for neighbors
            left = x - 1 in seen
            right = x + 1 in seen
            # With new x, increment curr_imbalance by 1 (new gap)
            # If x-1 in seen, closing a gap on left: decrease by 1
            # If x+1 in seen, closing a gap on right: decrease by 1
            increment = 1
            if left:
                increment -=1
            if right:
                increment -=1
            curr_imbalance += increment
            result += curr_imbalance
            seen.add(x)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
    For each subarray (start index i = 0..n-1), right end j = i+1..n-1. Each iteration does constant-time set and integer work for neighbors (max element is n), so total O(n²).

- **Space Complexity:** O(n)  
    Set `seen` at most n size per starting index.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array length is up to 10⁵? Can this be further improved?
  *Hint: Think about prefix frequency arrays for presence of consecutive numbers, or difference arrays.*

- How would your solution change if the subarray imbalance definition changes to compare all pairs, not just consecutive elements in sorted order?
  *Hint: Think about the number of distinct values and how many pairs they form with gaps.*

- Could you optimize space if array values are within known range (e.g., 1..n)?
  *Hint: Use a fixed-size boolean or integer array as presence bitset instead of set.*

### Summary
This solution uses the “expand right end and track changes” pattern — a variant of sliding window with dynamic structure to efficiently maintain a property as a subarray grows.  
It dynamically calculates imbalance as subarrays expand, using a set to keep track of the current subarray’s numbers and efficiently updating the imbalance count as elements are added.  
Patterns: set expansion, incremental property maintenance.  
This approach is common in substring/subarray statistics (“count X over all substrings/subarrays”), and similar strategies apply in substring uniqueness/counting, frequency windowing, and other sliding window or prefix-sum optimizations.

### Tags
Array(#array), Hash Table(#hash-table), Ordered Set(#ordered-set)

### Similar Problems
- Count Subarrays With Median K(count-subarrays-with-median-k) (Hard)