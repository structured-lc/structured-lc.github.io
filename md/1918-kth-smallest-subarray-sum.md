### Leetcode 1918 (Medium): Kth Smallest Subarray Sum [Practice](https://leetcode.com/problems/kth-smallest-subarray-sum)

### Description  
Given an integer array `nums` of length n and an integer k, find the kᵗʰ smallest sum among all possible non-empty contiguous subarrays of `nums`.  
A subarray is any continuous sequence of elements in the array. For example, given `[2, 1, 3]`, valid subarrays are `[2]`, `[2,1]`, `[2,1,3]`, `[1]`, `[1,3]`, and `[3]`.  
The sum of a subarray is simply the sum of all its elements.

Your task is: *Return the kᵗʰ smallest subarray sum*.

### Examples  

**Example 1:**  
Input: `nums = [2, 1, 3], k = 4`  
Output: `3`  
*Explanation: The subarray sums are: 2, 2+1=3, 2+1+3=6, 1, 1+3=4, 3. Sorted: [1,2,2,3,4,6]. The 4ᵗʰ smallest is 3.*

**Example 2:**  
Input: `nums = [1, 2, 3, 4], k = 6`  
Output: `6`  
*Explanation: Subarray sums: 1, 1+2=3, 1+2+3=6, 1+2+3+4=10, 2, 2+3=5, 2+3+4=9, 3, 3+4=7, 4. Sorted: [1,2,3,3,4,5,6,7,9,10]. The 6ᵗʰ smallest: 6.*

**Example 3:**  
Input: `nums = [5], k = 1`  
Output: `5`  
*Explanation: Only possible subarray is [5], sum is 5.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - Generate all subarrays (O(n²)), compute their sums, put in a list, sort the list, and return the kᵗʰ smallest.  
  - Not feasible for n ≈ 2×10⁴ (memory and speed).

- **Optimization Insight:**  
  - There’s an order/statistics question over a huge sorted list of subarray sums, but we don’t need the whole list.
  - Instead, use **binary search** on possible subarray sums (min = min(nums), max = sum(nums)):
    - For a guess T: how many subarrays have sum ≤ T? 
    - If the count ≥ k, try smaller; if count < k, try larger.

- **Counting subarrays with sum ≤ T:**  
  - Use prefix sums and two pointers (sliding window).
  - For every start position, move the end pointer while sum ≤ T, count how many subarrays start at index.
  - Time per check: O(n).

- **Final approach:**  
  - Binary search on sum values, and for each mid, count the number of subarrays sum ≤ mid.
  - First T where count ≥ k is the answer.

### Corner cases to consider  
- k = 1 (smallest subarray sum)
- nums has all equal elements
- nums of length 1
- Very large nums or very large n (stress test)
- k equals total number of subarrays (n(n+1)/2)

### Solution

```python
def kthSmallestSubarraySum(nums, k):
    n = len(nums)
    # Helper: Count subarrays with sum ≤ target
    def count_subarrays_leq(target):
        count = 0
        left = 0
        curr_sum = 0
        for right in range(n):
            curr_sum += nums[right]
            # Shrink window until sum ≤ target
            while curr_sum > target and left <= right:
                curr_sum -= nums[left]
                left += 1
            # All subarrays ending at right and starting from left..right are valid
            count += (right - left + 1)
        return count

    low = min(nums)
    high = sum(nums)

    # Binary search: smallest sum s.t. count ≥ k
    while low < high:
        mid = (low + high) // 2
        if count_subarrays_leq(mid) >= k:
            high = mid
        else:
            low = mid + 1
    return low
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log(S)),  
   where S is sum(nums).  
   - The binary search does at most log(S) iterations; each iteration counts subarrays in O(n).
- **Space Complexity:** O(1) extra space  
   (No extra arrays except inputs, just variables.)

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if nums can have negative numbers?  
  *Hint: Does the sliding window/subarray sum ≤ target always work? What edge case breaks this?*

- Can you output the actual subarray with the kᵗʰ smallest sum instead of just its value?  
  *Hint: Can you reconstruct it after knowing the sum? How?*

- What if k is huge (up to n²)? Can you do this faster if only small k?  
  *Hint: Is there a way to accelerate the search or preprocess for many queries?*

### Summary
This problem employs a *binary search on the answer* (parametric search), paired with a sliding window (two pointers) subarray sum counting. This is a classic technique for problems asking for the kᵗʰ smallest/largest value over many possibilities, especially when brute-force enumeration is too slow or infeasible. The "count of subarrays ≤ target sum" is a useful subroutine and generalizes to several similar array and subarray order-statistics problems.

### Tags
Array(#array), Binary Search(#binary-search), Sliding Window(#sliding-window)

### Similar Problems
