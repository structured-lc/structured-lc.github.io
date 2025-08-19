### Leetcode 713 (Medium): Subarray Product Less Than K [Practice](https://leetcode.com/problems/subarray-product-less-than-k)

### Description  
You're given an array of positive integers `nums` and an integer `k`.  
Your task is to count and return the number of contiguous subarrays where the product of all elements in the subarray is **strictly less than** `k`.  
Think of this as:  
- Return the number of ways you can choose a start and end (with start ≤ end) such that multiplying everything from start to end in `nums` gives a value < `k`.

### Examples  

**Example 1:**  
Input: `nums = [10, 5, 2, 6], k = 100`  
Output: `8`  
Explanation:  
Possible subarrays: , [5], [2], , [10, 5], [5, 2], [2, 6], [5, 2, 6].  
Each has product < 100.

**Example 2:**  
Input: `nums = [1, 2, 3], k = 0`  
Output: `0`  
Explanation:  
No subarray can have a strictly positive product less than 0.

**Example 3:**  
Input: `nums = [1, 1, 1], k = 2`  
Output: `6`  
Explanation:  
All possible subarrays have a product of 1 (which is < 2):  
[1], [1], [1], [1,1], [1,1], [1,1,1].  

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach:  
- For every possible subarray, calculate the product and check if it's less than k.
- For each start index, for each end index ≥ start, multiply and count if product < k.
- This would be O(n²): not efficient for large arrays.

Can we do better?  
- Since all numbers are positive, as we extend the subarray to the right, the product only increases or stays the same.
- Use a **sliding window** approach:
  - Keep a window [left, right] where the product of numbers is < k.
  - As you move `right`, multiply in the new value.
  - If the product exceeds or equals `k`, increment `left` (and divide out nums[left]) until product < k again.
  - For each `right`, the number of valid subarrays ending at `right` is (right - left + 1).

This uses two pointers and works in O(n) time.

### Corner cases to consider  
- k ≤ 1 (since all nums > 0, it's impossible for product < k)
- nums contains 1's ― long stretches of 1's should be handled efficiently
- Very large or very small k values
- Empty array (should return 0)
- All elements same

### Solution

```python
def numSubarrayProductLessThanK(nums, k):
    if k <= 1:
        return 0
    
    product = 1
    left = 0
    result = 0
    
    for right in range(len(nums)):
        product *= nums[right]
        # Shrink window until product < k
        while product >= k and left <= right:
            product //= nums[left]
            left += 1
        # All subarrays ending at right with left ≤ i ≤ right are valid
        result += right - left + 1
    
    return result

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We scan each element at most twice (once as `right` and at most once as `left` during window shrink).
- **Space Complexity:** O(1) — Only a few integer variables, no additional storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your solution if the array can contain zeros or negative numbers?  
  *Hint: Sliding window does not work if product can decrease unpredictably; more advanced interval handling is needed.*

- How would you list all the actual subarrays, not just count them?  
  *Hint: For each right/left window, enumerate subarrays in O(window size).*

- Can you solve a similar problem for sum instead of product?  
  *Hint: Classic sliding window works for sums of positive numbers.*

### Summary
The **sliding window / two pointer** technique solves this problem efficiently, leveraging the monotonic nature of product across positive integers. This approach generalizes to count subarray sums, maximum/minimum windows, and is a common pattern for handling continuous subarray constraints. It avoids wasteful recomputation required by brute-force, turning a naive O(n²) problem into O(n).

### Tags
Array(#array), Binary Search(#binary-search), Sliding Window(#sliding-window), Prefix Sum(#prefix-sum)

### Similar Problems
- Maximum Product Subarray(maximum-product-subarray) (Medium)
- Maximum Size Subarray Sum Equals k(maximum-size-subarray-sum-equals-k) (Medium)
- Subarray Sum Equals K(subarray-sum-equals-k) (Medium)
- Two Sum Less Than K(two-sum-less-than-k) (Easy)
- Number of Smooth Descent Periods of a Stock(number-of-smooth-descent-periods-of-a-stock) (Medium)
- Count Subarrays With Score Less Than K(count-subarrays-with-score-less-than-k) (Hard)