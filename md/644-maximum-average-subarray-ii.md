### Leetcode 644 (Hard): Maximum Average Subarray II [Practice](https://leetcode.com/problems/maximum-average-subarray-ii)

### Description  
Given an integer array, find the **contiguous subarray** with length **at least k** that has the **maximum average value**.  
Return that maximum average (a double), and ensure the calculation error is less than 1e-5.  
The array can have both negative and positive numbers, and you may pick any subarray of length ≥ k.

### Examples  

**Example 1:**  
Input: `nums = [1,12,-5,-6,50,3]`, `k = 4`  
Output: `12.75`  
*Explanation: The subarray `[12,-5,-6,50]` has an average of (12-5-6+50)/4 = 51/4 = 12.75, which is the maximum possible for any subarray of length ≥ 4.*

**Example 2:**  
Input: `nums = [5]`, `k = 1`  
Output: `5.0`  
*Explanation: There is only one subarray, which is the full array itself.*

**Example 3:**  
Input: `nums = [-10000, -10000, -10000, -10000]`, `k = 2`  
Output: `-10000.0`  
*Explanation: All elements are the same, so any subarray of length ≥ 2 will have average -10000.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  - Try all possible subarrays with length ≥ k.  
  - For each subarray, compute its average and keep track of the largest one.
  - However, this would have O(n²) time complexity (since there are ~n² subarrays), which is too slow for n up to 10,000.

- **Optimization:**  
  - O(nlogM) approach is possible by using **binary search** on the average value:
    - The answer (maximum average) must be between the smallest and largest numbers in the array.
    - For a candidate average `mid`, check if there exists at least one subarray of length ≥ k whose average is at least `mid`.
    - Do this by transforming the array to `nums[i] - mid` and checking if a subarray of length ≥ k has **sum ≥ 0**.
  - To efficiently check this, use **prefix sums** and keep track of the minimum prefix sum up to index i - k. If `prefix_sum[i] - min_prefix_sum ≥ 0` for some i ≥ k, then such a subarray exists.
  - Use this check as the condition in binary search, shrinking the search range each time.
  - Binary search is repeated with precision set to 1e-5.

- **Why final approach:**  
  - It is efficient (O(n log(max-min)/precision)), avoids timeouts, and leverages classic binary search with prefix sums.

### Corner cases to consider  
- All numbers are equal (average will be that number)  
- Array contains both negative and positive numbers  
- k = 1 (any single element is a valid subarray)  
- Array has minimum or maximum integer values  
- Floating point accuracy/precision (check result has error < 1e-5)  

### Solution

```python
def findMaxAverage(nums, k):
    # Helper function: Check if a subarray of length ≥ k has average ≥ target
    def can_find(target):
        n = len(nums)
        pre_sum = [0.0] * (n + 1)
        for i in range(n):
            pre_sum[i + 1] = pre_sum[i] + nums[i] - target
        min_pre = 0.0
        for i in range(k, n + 1):
            if pre_sum[i] - min_pre >= 0:
                return True
            min_pre = min(min_pre, pre_sum[i - k + 1])
        return False

    l, r = min(nums), max(nums)
    precision = 1e-5
    while r - l > precision:
        mid = (l + r) / 2.0
        if can_find(mid):
            l = mid
        else:
            r = mid
    return l
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n × log((max_num - min_num) / precision))  
  - Each binary search step is O(n), and number of steps is O(log((max-min)/1e-5))
- **Space Complexity:**  
  - O(n) for the prefix sum array.  
  - O(1) extra variables (besides input and prefix sum)

### Potential follow-up questions (as if you’re the interviewer)  

- What if k is much larger (close to n)?  
  *Hint: Would the binary search and prefix sum check still scale?*  

- Can you modify this to return the actual subarray, not just the average?  
  *Hint: Track the subarray indices during the prefix sum check where max average is attained.*

- What would you change if you were allowed to approximate the average with even lower precision?  
  *Hint: Reducing required precision speeds up the binary search.*

### Summary
This problem uses the **binary search on the answer** (real numbers) pattern with **prefix sum** technique for feasibility testing.  
This is a common pattern for problems asking for an optimal value under a continuous parameter, where the feasibility check can be done in linear time.  
Other examples include the "Split Array Largest Sum", "Koko Eating Bananas", and "Maximize Distance to Closest Person" problems on LeetCode.