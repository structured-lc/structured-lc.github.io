### Leetcode 2302 (Hard): Count Subarrays With Score Less Than K [Practice](https://leetcode.com/problems/count-subarrays-with-score-less-than-k)

### Description  
Given a list of positive integers `nums` and an integer `k`, count how many **non-empty** contiguous subarrays of `nums` have a *score* **strictly less than** `k`.  
The *score* of a subarray is defined as:  
 sum_of_elements_in_subarray × length_of_subarray  
  
For every possible subarray, calculate its score and only count it if score < k.

### Examples  

**Example 1:**  
Input: `nums = [2,1,4,3,5], k = 10`  
Output: `6`  
*Explanation: The valid subarrays with scores less than 10 are: [2], [1], [4], [3], [5], [2,1].*

**Example 2:**  
Input: `nums = [1,1,1], k = 5`  
Output: `5`  
*Explanation: All single-element and two-element subarrays are valid as their scores are 1×1=1, 1×1=1, 1×1=1,  (1+1)×2=4, (1+1)×2=4. [1,1,1] has 3×3=9 which is not valid.*

**Example 3:**  
Input: `nums = [3,3,3], k = 10`  
Output: `3`  
*Explanation: Only [3], [3], [3] (each 3×1=3) are valid, longer subarrays make score ≥10.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Start with every possible subarray, calculate its sum and length, check if score < k, and count.  
  - This would take O(n²) time: for every start index, try all end indices, which is not efficient for large n.

- **Optimization / Sliding Window:**  
  The score formula is: (sum of nums[l..r]) × (r - l + 1).  
  The values are positive, so as you extend right, the sum and length both increase or stay the same, so the score can only increase.  
  Use two pointers (left and right):  
  - Expand right and track window sum and length.
  - If the window score ≥ k, increase left to shrink window until score < k.
  - At each right, the number of valid subarrays ending at `right` is (right - left + 1).
  - Add this count to the answer.
  
- **Reason for Sliding Window:**  
  - We avoid recomputing repeated work, and since all elements are positive, the window never needs to jump backwards.
  - This gives O(n) total time as each index is visited at most twice.

### Corner cases to consider  
- Empty array (should return 0 as there are no subarrays)
- All numbers too large to form any score < k (should return 0)
- Single element, k=1 (if each element ≥1, no subarray is valid)
- Large k (all subarrays are valid)
- Input length 1 (edge, single subarray)
- k == 0 (impossible, always return 0)

### Solution

```python
def countSubarrays(nums, k):
    n = len(nums)
    ans = 0
    window_sum = 0
    left = 0
    
    for right in range(n):
        window_sum += nums[right]
        
        # Keep shrinking from left while score >= k
        while window_sum * (right - left + 1) >= k and left <= right:
            window_sum -= nums[left]
            left += 1
        
        # For current right, subarrays [left, right], [left+1, right], ..., [right, right] are all valid
        ans += (right - left + 1)
    
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each index is visited at most twice (once as right, once as left). Window sum is maintained in O(1) per operation.

- **Space Complexity:** O(1)  
  Only a handful of variables for pointers and sum; no extra storage scaling with input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array contained negative numbers?  
  *Hint: How does sliding window behave if values can be negative? Are monotonic increases still guaranteed?*

- Can you compute, for each k in an array of queries, the answer efficiently?  
  *Hint: Could preprocessing or a clever monotonic queue help for multiple k values?*

- Could you return not just the count but also enumerate all valid subarrays for k?  
  *Hint: Traverse windows, but be careful about time complexity and output size.*

### Summary
This problem uses the **sliding window** (two-pointer) pattern, vital for contiguous subarray problems where certain monotonic properties hold (e.g. all positive numbers). Whenever both sum and length grow as the window expands, sliding window can avoid redundant computation and give efficient O(n) solutions. The pattern is broadly applicable to problems about subarrays with constraints on sum, average, or custom scoring.


### Flashcard
Use sliding window to count subarrays where (sum × length) < k, expanding right and shrinking left as needed.

### Tags
Array(#array), Binary Search(#binary-search), Sliding Window(#sliding-window), Prefix Sum(#prefix-sum)

### Similar Problems
- Maximum Subarray(maximum-subarray) (Medium)
- Subarray Product Less Than K(subarray-product-less-than-k) (Medium)
- Binary Subarrays With Sum(binary-subarrays-with-sum) (Medium)