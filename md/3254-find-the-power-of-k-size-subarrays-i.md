### Leetcode 3254 (Medium): Find the Power of K-Size Subarrays I [Practice](https://leetcode.com/problems/find-the-power-of-k-size-subarrays-i)

### Description  
Given an integer array **nums** and a positive integer **k**, compute, for every subarray of size **k**:
- If the subarray elements are **strictly consecutive** integers and **sorted in ascending order**, its "power" is its **maximum** element.
- Otherwise, its power is **-1**.
Return an array of these "power" values for all possible (contiguous) subarrays of length **k** within **nums**.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4,3,2,5]`, `k = 3`  
Output: `[3, 4, -1, -1, -1]`  
*Explanation:*
- Subarray [1,2,3] → strictly consecutive ascending, max is 3.
- Subarray [2,3,4] → consecutive, max is 4.
- Subarray [3,4,3] → not strictly ascending.
- Subarray [4,3,2] → not ascending.
- Subarray [3,2,5] → not consecutive ascending.

**Example 2:**  
Input: `nums = [2,3,4,5,6]`, `k = 2`  
Output: `[3, 4, 5, 6]`  
*Explanation:*
- [2,3] → consecutive, max is 3.
- [3,4] → consecutive, max is 4.
- [4,5] → consecutive, max is 5.
- [5,6] → consecutive, max is 6.

**Example 3:**  
Input: `nums = [1,5,9,13]`, `k = 2`  
Output: `[-1, -1, -1]`  
*Explanation:*
- None of the subarrays [1,5], [5,9], [9,13] are consecutive.

### Thought Process (as if you’re the interviewee)  
First, I’d consider a brute-force approach:
- For every subarray of size **k**, check if it's ascending and its values are consecutive.
- For each subarray, iterate to check if each nums[j+1] == nums[j]+1.

To optimize:
- Since **n ≤ 500**, the brute-force O(n × k) solution is acceptable.
- However, a simple sliding window can help: as the window moves, for each window, compare adjacent values. If at any position nums[j+1] != nums[j]+1, break early.

Tradeoff: Using extra data structures (set, etc.) is unnecessary here, as the consecutive check is direct.

### Corner cases to consider  
- k = 1 (any single element is trivially consecutive ascending; max is the element itself).
- Numbers with duplicates (never consecutive strict ascending).
- Large k, or k > n (no subarrays).
- nums with negative or mixed values (but always need consecutive integers and ascending).
- Arrays with strictly descending order.
- Empty array (no output).
- Arrays with exactly k elements.

### Solution

```python
def find_power_of_k_subarrays(nums, k):
    n = len(nums)
    results = []
    
    # For each window of size k
    for i in range(n - k + 1):
        is_consecutive = True
        # Check if current window is strictly consecutive ascending
        for j in range(i + 1, i + k):
            if nums[j] != nums[j - 1] + 1:
                is_consecutive = False
                break
        if is_consecutive:
            results.append(nums[i + k - 1])  # Last element is the max in a sorted ascending window
        else:
            results.append(-1)
    return results
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k), where n is the length of nums. For each of n - k + 1 windows, we may have to check up to k-1 consecutive pairs.
- **Space Complexity:** O(1) extra space (excluding the output). No additional structures are used.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle larger arrays with n up to 10⁵?
  *Hint: Can you reduce the per-window check to O(1) by leveraging previous window information?*

- What if the “consecutive” condition is allowed to be unordered (i.e., any order, but all numbers consecutive)?
  *Hint: Try using a set and min/max for subarray range.*

- What if you need to return *both* the min and max element for valid windows?
  *Hint: You can store both when the window is valid.*

### Summary
The approach uses a **sliding window** to validate strict consecutive ascending sequences in O(n × k) time, suitable for moderate n. This "window with per-step validation" is a classic pattern for subarray problems and can be further optimized using auxiliary data structures for advanced scenarios. This solution is typical in checking "windowed" properties like consecutive elements, sortedness, or uniqueness, and the same pattern is used for problems such as "Longest Increasing Subarray" or "Subarrays with K-distinct values".


### Flashcard
Sliding window of size k; for each window, check if all adjacent pairs satisfy nums[j+1] == nums[j]+1 for consecutive ascending values.

### Tags
Array(#array), Sliding Window(#sliding-window)

### Similar Problems
- Maximum Sum of Distinct Subarrays With Length K(maximum-sum-of-distinct-subarrays-with-length-k) (Medium)