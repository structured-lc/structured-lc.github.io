### Leetcode 2968 (Hard): Apply Operations to Maximize Frequency Score [Practice](https://leetcode.com/problems/apply-operations-to-maximize-frequency-score)

### Description  
You are given an integer array `nums` and an integer `k`. You can perform up to `k` operations, where each operation lets you pick any element in `nums` and increment or decrement it by 1. The goal is to maximize the "frequency score" of the resulting array — the **highest frequency** of any element after these operations.  
Put simply: by changing numbers via at most `k` total +1/-1 adjustments, what’s the maximum number of identical values you can create in the array?

### Examples  

**Example 1:**  
Input: `nums = [1,2,4], k = 5`  
Output: `3`  
*Explanation: We can add 1 to 1 (×2 times) and subtract 1 from 4 (×3 times), making all three elements 3. 1→3, 2→3, 4→3 requires exactly 5 operations. All elements are now 3, so max frequency is 3.*

**Example 2:**  
Input: `nums = [1,4,8,13], k = 5`  
Output: `2`  
*Explanation: We can make two numbers the same. E.g., turn 4→8 (spend 4 ops), 1→8 needs 7 ops (not enough). The best is to focus on numbers close to each other: e.g., make 4,8 into 4: 8→4 (4 ops), 1→4 (3 ops). But only two can be made the same within 5 ops.*

**Example 3:**  
Input: `nums = [3,9,6], k = 2`  
Output: `1`  
*Explanation: Not enough operations to make any two numbers the same, since minimum ops to match two numbers is 3. Highest frequency is 1.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Try every possible target value (in the range of nums), for each possible target compute how many elements can be converted to that value using ≤k total operations. For each target, check how many numbers can be targeted within the operation limit. This is O(n²) and quite slow for large arrays.

- **Optimization:**  
  Realize that for sorted nums, making several consecutive elements equal to the median minimizes operation count.  
  We want to maximize the length of a subarray whose elements can all be brought to the same value with ≤k operations:
    - For each possible subarray window, calculate how many ops to bring all inside window to one value (typically the median).
    - Prefix sums speed up calculation of operation cost for sliding window.
  Use **sliding window + prefix sum** to efficiently compute minimum needed steps for any possible group.

- **Binary Search:**  
  Alternatively, binary search for largest frequency score F such that it is possible to make F elements equal with ≤k ops.

- **Why final approach:**  
  The sliding window on sorted nums is both optimal and performant — it’s O(n log n) due to sorting, and the prefix sum allows for quick calculation of ops for any given window.

### Corner cases to consider  
- Empty array (`[]`): Output 0.
- All values already equal: No ops needed, frequency is n.
- Only one element: Frequency is 1.
- `k = 0`: No changes allowed, so frequency equals the most repeated value in nums.
- nums with wide range, k too small for any changes.
- Multiple options to reach same max frequency.

### Solution

```python
def maxFrequency(nums, k):
    # Sort so we can use sliding window to check consecutive values.
    nums.sort()
    n = len(nums)
    # Prefix sum for nums
    prefix = [0] * (n+1)
    for i in range(n):
        prefix[i+1] = prefix[i] + nums[i]

    # maxLen is answer
    maxLen = 1
    left = 0  # left of window
    for right in range(1, n):
        # Total ops needed to bring all [left, right] to nums[right]
        # = nums[right] * window size - sum of window
        window_size = right - left + 1
        cost = nums[right] * window_size - (prefix[right+1] - prefix[left])

        # If too costly, move left forward
        while cost > k:
            left += 1
            window_size = right - left + 1
            cost = nums[right] * window_size - (prefix[right+1] - prefix[left])

        maxLen = max(maxLen, window_size)

    return maxLen
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Sorting is O(n log n), the sliding window runs in O(n). Prefix sum pre-processing is O(n).

- **Space Complexity:** O(n)  
  For the prefix sum array. Sorting is in-place.

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of ±1, you could add/subtract any integer up to m each operation?  
  *Hint: How does variable step-size affect minimum cost calculations?*

- What if you had to return the value(s) with the max frequency instead of just the frequency?  
  *Hint: Track which window achieves maxFreq, not just the size.*

- What if you must minimize the sum of values after reaching max frequency?  
  *Hint: Choosing the smallest possible target value among all optimal options.*

### Summary
This problem uses the **sliding window** and **prefix sum** patterns on a **sorted** array to efficiently determine how many elements can be unified with limited changes, maximizing their frequency, under operation constraints. This is a classic greedy + windowing technique, also seen in "Min moves to equal array elements," "Max Consecutive Ones after k Flips," etc.

### Tags
Array(#array), Binary Search(#binary-search), Sliding Window(#sliding-window), Sorting(#sorting), Prefix Sum(#prefix-sum)

### Similar Problems
- Frequency of the Most Frequent Element(frequency-of-the-most-frequent-element) (Medium)