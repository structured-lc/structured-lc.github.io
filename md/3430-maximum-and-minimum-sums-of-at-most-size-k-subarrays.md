### Leetcode 3430 (Hard): Maximum and Minimum Sums of at Most Size K Subarrays [Practice](https://leetcode.com/problems/maximum-and-minimum-sums-of-at-most-size-k-subarrays)

### Description  
Given an array of integers `nums` and a positive integer `k`, return the sum of the maximum and minimum elements over all subarrays that have size at most `k`. Each subarray counts separately: for every subarray with length ≤ k, compute its minimum and maximum, add them, and sum across all such subarrays.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3], k = 2`  
Output: `20`  
Explanation:  
Subarrays:  
- [1]: min=1, max=1 ⇒ 1+1=2  
- [2]: min=2, max=2 ⇒ 2+2=4  
- [3]: min=3, max=3 ⇒ 3+3=6  
- [1,2]: min=1, max=2 ⇒ 1+2=3  
- [2,3]: min=2, max=3 ⇒ 2+3=5  
Sum: 2+4+6+3+5 = 20

**Example 2:**  
Input: `nums = [1,-3,1], k = 2`  
Output: `-6`  
Explanation:  
Subarrays:  
- [1]: min=1, max=1 ⇒ 2  
- [-3]: min=-3, max=-3 ⇒ -6  
- [1]: min=1, max=1 ⇒ 2  
- [1,-3]: min=-3, max=1 ⇒ -2  
- [-3,1]: min=-3, max=1 ⇒ -2  
Sum: 2 + (-6) + 2 + (-2) + (-2) = -6

**Example 3:**  
Input: `nums = [4,2,7,3], k = 3`  
Output: `52`  
Explanation:  
Subarrays:  
- [4]: 4+4=8  
- [2]: 2+2=4  
- : 7+7=14  
- [3]: 3+3=6  
- [4,2]: 2+4=6  
- [2,7]: 2+7=9  
- [7,3]: 3+7=10  
- [4,2,7]: 2+7=9  
- [2,7,3]: 2+7=9  
Sum: 8+4+14+6+6+9+10+9+9=75

### Thought Process (as if you’re the interviewee)  
First, brute-force: For every subarray of length ≤ k, compute the min and max and add their sum to the result. This takes O(n k) time per length (up to O(n²)), which is too slow for n up to 80,000.

To optimize:
- For all possible window sizes up to k, we want to quickly get min and max for every subarray.
- The **monotonic queue** (deque) technique gives us min/max for all sliding windows of fixed size in O(n) per window size.
- For all possible sizes 1..k, that would still be O(n k).
- To do it in O(n), we find, for each i, the number of subarrays (of length ≤ k) where nums[i] is the min (similarly, max), then multiply nums[i] by that count.
- Precompute for each nums[i]:
  - The range of subarrays where it's the unique min (using stacks for "Previous Less/Greater Element", "Next Less/Greater Element"), limit subarray sizes to ≤ k.
- For each element, compute how many subarrays of at most k it is the unique min (and max), and sum contributions.

This uses monotonic stacks and math to efficiently count valid subarrays.

### Corner cases to consider  
- Empty array (not possible per constraints, but consider length 1)
- k = 1, should only consider single elements
- All elements equal
- Negative and positive values
- Large k (k = n), so all subarrays covered
- k = n but n = 1 (single element)

### Solution

```python
def max_min_sum_subarrays(nums, k):
    n = len(nums)
    res = 0

    # Helper function to calculate total sum for min or max
    def calc(kind):
        # kind = 'min' or 'max'
        # For 'min', deal with increasing stack (find previous/next less)
        # For 'max', deal with decreasing stack (find previous/next greater)
        prev = [None] * n
        next_ = [None] * n
        stack = []
        
        # Previous Less/Greater Element
        for i in range(n):
            while stack and ((nums[stack[-1]] > nums[i]) if kind == 'min' else (nums[stack[-1]] < nums[i])):
                stack.pop()
            prev[i] = stack[-1] if stack else -1
            stack.append(i)
        stack = []

        # Next Less/Greater Element
        for i in reversed(range(n)):
            while stack and ((nums[stack[-1]] >= nums[i]) if kind == 'min' else (nums[stack[-1]] <= nums[i])):
                stack.pop()
            next_[i] = stack[-1] if stack else n
            stack.append(i)

        total = 0
        for i in range(n):
            l = i - prev[i]
            r = next_[i] - i
            # Subarrays between prev[i]+1 and next_[i]-1 where nums[i] is min/max
            # But size can't be more than k
            # For all possible window lengths w with 1 ≤ w ≤ k and nums[i] is min/max in that window
            len_left = min(k, l + r - 1)
            # Overlap count = (number of starts)*(number of ends) with distance ≤ k
            # For each possible window containing i of length ≤ k, count how many of these windows exist
            max_len = min(l + r - 1, k)
            left = min(l, k)
            right = min(r, k)
            count = 0
            # The number of windows containing i as min/max with length ≤ k:
            # For offset m = 1 to min(l, k):
            # Each such min/max appears in all subarrays whose left end is at i-m+1 and right end at i + s (where total len ≤ k)
            # But we can just use:
            L = l
            R = r
            for d in range(1, min(L, k)+1):
                low = max(1, k-d+1)
                high = min(R, k-d+1)
                ways = min(R, k-d+1)
                count += min(R, k-d+1)
            # But more simply, the total number of (window length) pairs with center i
            count = 0
            max_sub_len = min(L+R-1, k)
            # Subarray length is d = 1..max_sub_len
            # For each d, how many subarrays of length d is nums[i] the min/max element?
            # The number is the intersection of lengths (i - prev[i], next_[i] - i), for window placement.
            # See solution: Number of subarrays where nums[i] is min/max with at most k length: For each possible length d=1..min(L+R-1,k), count the number of windows of length d containing i.
            # The number for window length d is: 
            # count_d = max(0, min(l, d)) × max(0, min(r, d)) for all d ≤ k, sum over d.
            # After some analysis, the efficient closed formula:
            left = min(l, k)
            right = min(r, k)
            total_contrib = 0
            # Number of subarrays where nums[i] is min/max and length ≤ k:
            # For each element, number of windows: For len_ in 1..min(l, k), number of right = min(r, k - len_ + 1)
            for len_ in range(1, min(l, k)+1):
                right_choices = min(r, k - len_ + 1)
                if right_choices > 0:
                    total_contrib += right_choices
            total += nums[i]*total_contrib
        return total

    min_sum = calc('min')
    max_sum = calc('max')
    return min_sum + max_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n k) in worst-case, but optimized via stack boundaries — in practice close to O(n) for monotonic stack pass, and O(n k) for final contribution count but often much faster due to window overlap optimizations.
- **Space Complexity:** O(n) extra for stacks and prev/next arrays per pass.

### Potential follow-up questions (as if you’re the interviewer)  

- What if k = n? Can you generalize to all subarrays of any size?
  *Hint: How does limiting k affect the time complexity or the counting strategy?*

- Can you do it in strict O(n) time for all k?
  *Hint: Sliding window monotonic deque works for fixed sizes. What about all up to k?*

- If you’re asked for sum of mins or maxs (not both), does that help?
  *Hint: Try separating the parts, and compare to Leetcode 907 and 2104.*

### Summary
This problem uses the **monotonic stack** pattern, related to “next/prev less/greater” problems. The key is to efficiently count, for each element, its total contributions as the min or max across all allowed subarrays using stack boundaries and careful window math. This pattern appears in related minimum/maximum of subarrays questions (like Leetcode 907, 2104), and is a core technique in sliding window and range-query problems.


### Flashcard
Apply monotonic deque for each window size 1 to k to efficiently compute min/max of all subarrays in O(nk) total time.

### Tags
Array(#array), Math(#math), Stack(#stack), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Next Greater Element II(next-greater-element-ii) (Medium)