### Leetcode 3255 (Medium): Find the Power of K-Size Subarrays II [Practice](https://leetcode.com/problems/find-the-power-of-k-size-subarrays-ii)

### Description  
You are given an integer array `nums` of length n, and an integer k. For every subarray of size k, calculate its "power":
- If all k elements in the subarray are **consecutive numbers in strictly ascending order** (for example, [2,3,4,5,6]), then its power is the **maximum** element of that subarray.
- Otherwise, the power is -1.
Return a list of length n-k+1 where the iᵗʰ value is the power of the subarray nums[i ... i+k-1].

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,5,6,7], k = 3`  
Output: `[3,-1,-1,7]`  
*Explanation:*
- nums[0:2] = [1,2,3] → ascending, consecutive → power = 3  
- nums[1:3] = [2,3,5] → ascending, but not consecutive (gap between 3 and 5) → power = -1  
- nums[2:4] = [3,5,6] → not consecutive → power = -1  
- nums[3:5] = [5,6,7] → ascending, consecutive → power = 7

**Example 2:**  
Input: `nums = [4,5,6,7], k = 2`  
Output: `[5,6,7]`  
*Explanation:*
- Each window: [4,5], [5,6], [6,7] → all are 2 consecutive ascending integers → powers: 5,6,7

**Example 3:**  
Input: `nums = [1,3,5,7], k = 2`  
Output: `[-1,-1,-1]`  
*Explanation:*
- Each window: [1,3] not consecutive, [3,5] not consecutive, [5,7] not consecutive → all -1

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For every window of length k, check if the numbers are consecutive and strictly ascending. If so, output the max (which for strictly ascending is always the last element). Otherwise, -1.
  - To check consecutive and ascending: for all 0 ≤ j < k-1, must have nums[i+j+1] == nums[i+j] + 1.
  - This brute-force method is O(nk).
- **Optimization:** Since n can be up to 10⁵, O(nk) is too slow. But we only need to check k-1 adjacent pairs per window, which can be processed in O(nk) worst case, but we can further optimize using sliding window:
  - For each k-sized window, precompute the differences between each adjacent pair (nums[i+1] - nums[i]), and check if they're all 1.
  - Maintain a count of non-1 differences for the current window. As the window slides, update this count in O(1) time by adding the effect of the entering pair and removing the effect of the leaving pair.
- **Final approach:** Precompute the differences; then, using a sliding window on these differences, quickly check if all are 1.

### Corner cases to consider  
- Array length < k (should return an empty list)
- k = 1 (every single element is trivially sorted and "consecutive" → power = nums[i])
- Duplicates in subarray (makes not strictly ascending, must output -1)
- Negative numbers
- Large range or sparse numbers (e.g. [10,100,1000])
- Already sorted but not consecutive (e.g. [1,3,5])

### Solution

```python
def find_power_k_subarray(nums, k):
    n = len(nums)
    if n < k:
        return []

    # Special case: k = 1, every single number is valid subsequence
    if k == 1:
        return nums[:]

    # Precompute adjacent differences: diffs[i] = nums[i + 1] - nums[i]
    diffs = [nums[i+1] - nums[i] for i in range(n - 1)]
    result = []

    # Sliding window: maintain count of bad diffs (not 1) in window of size k-1
    bad = 0   # Number of differences in the window that are not 1

    # First window (diffs[0: k-1])
    for j in range(k-1):
        if diffs[j] != 1:
            bad += 1
    # i ranges from 0 to n-k
    for i in range(n - k + 1):
        if bad == 0:
            # All differences are 1, ascending consecutive
            result.append(nums[i + k - 1])
        else:
            result.append(-1)

        # Update window: remove diffs[i], add diffs[i + k - 1]
        if i + k - 1 < n - 1:
            # diffs[i] leaves window
            if diffs[i] != 1:
                bad -= 1
            # diffs[i + k - 1] enters window
            if diffs[i + k - 1] != 1:
                bad += 1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Computing adjacent differences: O(n). Sliding window: each subarray in O(1), total O(n).
- **Space Complexity:** O(n): storing the differences array and result.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we need to output the starting index of all valid subarrays instead of their maximum value?  
  *Hint: Instead of storing `nums[i+k-1]`, store `i` whenever the window is valid.*

- What if the "consecutive order" can be either ascending or descending?  
  *Hint: Adjust the differences check to allow -1 (for descending) as well as +1.*

- How would you handle duplicate values in the definition of "consecutive"?  
  *Hint: Refine the definition―do duplicates count as valid or must strictly be unique and consecutive? Implementation may change accordingly.*

### Summary
This problem is an application of the sliding window technique, with a twist—checking for consecutive, strictly increasing integers within windows. The key optimization comes from translating the subarray check into a constant-time update as the window slides, by tracking the count of "bad" differences. The pattern is widely applicable for problems involving checking global/local conditions in contiguous subarrays, with similar techniques useful for monotonicity, strictness, and difference-based checks.


### Flashcard
Sliding window with early termination—track if current window has consecutive ascending values; if any pair breaks the pattern, mark that window as -1.

### Tags
Array(#array), Sliding Window(#sliding-window)

### Similar Problems
- Maximum Sum of Distinct Subarrays With Length K(maximum-sum-of-distinct-subarrays-with-length-k) (Medium)