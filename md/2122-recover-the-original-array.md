### Leetcode 2122 (Hard): Recover the Original Array [Practice](https://leetcode.com/problems/recover-the-original-array)

### Description  
Given an integer array `nums` of length 2n, it was constructed by choosing an original array `arr` of n positive integers, picking a positive integer k, then creating two new arrays:
- `lower[i] = arr[i] - k`
- `higher[i] = arr[i] + k`
Finally, all 2n elements of `lower` and `higher` were merged into one array `nums` with no label indicating which value came from which.  
You are given only `nums`. Recover any possible valid array `arr`.

### Examples  

**Example 1:**  
Input: `[2,10,6,4,8,12]`  
Output: `[6,8,10]`  
*Explanation: k = 2. lower = [4,6,8], higher = [8,10,12], arr = [6,8,10]. Sorted nums splits into pairs (4,8), (6,10), (8,12); midpoints: [6,8,10].*

**Example 2:**  
Input: `[1,1,3,3]`  
Output: `[2,2]`  
*Explanation: k = 1. lower = [1,1], higher = [3,3], arr = [2,2]. Pairing the smallest with the one 2 greater gives midpoints 2,2.*

**Example 3:**  
Input: `[5,6,7,8,9,10]`  
Output: `[7,8,9]`  
*Explanation: k = 2. lower = [5,6,7], higher = [9,10,8], arr (midpoints) = [7,8,9].*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**:  
  Try all possible values for k. For each, check if nums can be split into n pairs where the difference is exactly 2 × k. But checking all pairs leads to very high time complexity.
  
- **Optimized Approach**:  
  Sort `nums`.  
  For possible `k`, try each difference between smallest element (nums) and the others: if difference positive and even (so k integer), try to reconstruct the original array.  
  Use a counter to greedily pair elements x, y such that y - x = 2 × k, always pairing the smallest available x first.  
  For each pair, (x, x+2k), compute the midpoint x+k and collect n such midpoints as `arr`.
  
  Stop when a valid reconstruction is found.  
  Trade-offs: Solution is O(n²) in worst-case due to pairwise searching, but greedy counting with hashmaps/prioritized order keeps it practical for input sizes given in constraints.

### Corner cases to consider  
- Repeated elements in arr (e.g. arr = [2,2], so lower/higher arrays have repeats)
- The only valid k leads to zero, negative or odd differences (e.g. nums has large odd jumps)
- All numbers equal (not possible since k must be positive, but input must be valid)
- Input that’s already sorted or not sorted; must always sort

### Solution

```python
def recoverArray(nums):
    # Sort nums to efficiently pair smallest elements with possible matches
    nums.sort()
    n = len(nums) // 2

    for i in range(1, len(nums)):
        diff = nums[i] - nums[0]
        # To be a k, diff must be even and > 0
        if diff == 0 or diff % 2 != 0:
            continue
        k = diff // 2
        # Attempt to pair up all numbers using this k
        freq = {}
        for num in nums:
            freq[num] = freq.get(num, 0) + 1
        arr = []
        for num in nums:
            if freq.get(num, 0) == 0:
                continue
            target = num + 2 * k
            if freq.get(target, 0) == 0:
                break
            # Pair up num and target
            freq[num] -= 1
            freq[target] -= 1
            arr.append(num + k)
        if len(arr) == n:
            return arr
    # If we get here, problem constraints say there must be an answer
    return []
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), as for each i, we may pair up to n times, and there are up to n possible k to check.
- **Space Complexity:** O(n) for frequency map and result array.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize further if the range of nums is very large?  
  *Hint: Is there a way to avoid pairwise search?*

- How does your approach handle repeated numbers in arr?  
  *Hint: How does frequency tracking interact with repeated values?*

- Can you reconstruct arr if k is allowed to be zero?  
  *Hint: How does that change the grouping logic?*

### Summary
This problem is a strong example of **hashing and greedy pairing** after sorting. It highlights the pattern of candidate generation by checking all reasonable "differences" and verifying validity with hash counting. Variations of this technique appear in problems with "pair up" requirements, or when reconstructing arrays generated from deterministic operations on unknowns. The need to handle duplicates gracefully makes this a good hashmap/frequency practice problem.

### Tags
Array(#array), Hash Table(#hash-table), Two Pointers(#two-pointers), Sorting(#sorting), Enumeration(#enumeration)

### Similar Problems
- Find Array Given Subset Sums(find-array-given-subset-sums) (Hard)
- Find Original Array From Doubled Array(find-original-array-from-doubled-array) (Medium)