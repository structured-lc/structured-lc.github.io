### Leetcode 16 (Medium): 3Sum Closest [Practice](https://leetcode.com/problems/3sum-closest)

### Description  
Given an array of integers `nums` and an integer `target`, find three integers in `nums` such that the sum is closest to `target`. Return the sum of those three integers. It is guaranteed that exactly one solution exists.  
You do not need to return the actual triplet, just their sum.  
For example, if the array is `[-1, 2, 1, -4]` and the target is `1`, your result should be the sum of the three numbers closest to `1` (which is `2` because (-1 + 2 + 1 = 2) is closest to 1) [1][2][3].


### Examples  

**Example 1:**  
Input: `nums = [-1, 2, 1, -4]`, `target = 1`  
Output: `2`  
*Explanation: Possible sums for 3 elements: -1+2+1=2, -1+2+(-4)=-3, …; 2 is closest to 1.*

**Example 2:**  
Input: `nums = [0, 0, 0]`, `target = 1`  
Output: `0`  
*Explanation: Only possible sum is 0+0+0=0, which is closest to 1.*

**Example 3:**  
Input: `nums = [1, 1, -1, -1, 3]`, `target = -1`  
Output: `-1`  
*Explanation: Triplet (-1, -1, 1) sums to -1; that matches the target exactly.*


### Thought Process (as if you’re the interviewee)  
Start with brute force:  
- Generate all triplets (i, j, k) with i < j < k, compute the sum, track the sum closest to target.
- O(n³) due to three nested loops.  
- Can definitely do better.

Optimized approach:  
- **Sort** the array first. This helps with efficient traversal and avoids duplicates [1][3].
- For each index `i`, use **two pointers** (`left`, `right`) to find the best pair that, along with nums[i], gets as close as possible to the target.
- If the current sum matches the target exactly, return immediately (can't get any closer).
- Otherwise, update the best sum as needed and move pointers:
  - If sum < target, increment left (to increase the sum).
  - If sum > target, decrement right (to decrease the sum).
- This reduces complexity to O(n²).
- Sorting helps the two-pointer step reach closer or farther sums in a controlled way by moving just one pointer at a time [1][3].

**Trade-offs:**
- This approach finds only the closest sum — not all possible triplets tied for closest.

### Corner cases to consider  
- Array of exactly 3 elements (must return their sum).
- Negative numbers and zeros.
- All elements same.
- Large positive/negative targets.
- Array with duplicate numbers.
- Large/small integers where sum overflows (if in a language without big int safety).
- Array length less than 3 (should not happen given constraints, but to guard).


### Solution

```python
def threeSumClosest(nums, target):
    # Sort for two-pointer search
    nums.sort()
    n = len(nums)
    # Initialize result with the first possible sum
    closest_sum = nums[0] + nums[1] + nums[2]
    
    # Fix one element and use two pointers for the rest
    for i in range(n - 2):
        left = i + 1
        right = n - 1
        while left < right:
            cur_sum = nums[i] + nums[left] + nums[right]
            # If exact match, return immediately
            if cur_sum == target:
                return cur_sum
            # Update closest_sum if this one is closer
            if abs(cur_sum - target) < abs(closest_sum - target):
                closest_sum = cur_sum
            # Move pointers to get closer to target
            if cur_sum < target:
                left += 1
            else:
                right -= 1
    return closest_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)
  - Sorting: O(n log n)
  - For each i, two-pointer loop is O(n); total outer iterations ≈ n, so O(n²).
- **Space Complexity:** O(1) extra space (excluding output and input array; sorting can be in-place).


### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to return all triplets that tie for the closest sum?  
  *Hint: Consider how to collect or store triplets as you process, while checking for ties.*

- How would your solution change if the array could be very large and doesn't fit in memory?  
  *Hint: Think about streaming algorithms or multi-pass approaches.*

- Can you extend your solution to 4Sum Closest or kSum Closest?  
  *Hint: Recursion with early stopping if the sum can't get any closer; generalize the two-pointer part.*

### Summary
This problem uses the **two-pointer** technique, often combined with sorting, which is a classic approach for subset-sum search problems involving arrays. The coding pattern is prevalent in problems like 2Sum, 3Sum, 4Sum, and their "closest" variants. The two-pointer pattern provides a big efficiency boost over brute force for problems with sorted data and fixed-size subset searching.