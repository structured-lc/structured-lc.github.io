### Leetcode 2439 (Medium): Minimize Maximum of Array [Practice](https://leetcode.com/problems/minimize-maximum-of-array)

### Description  
Given an array of non-negative integers, you can repeatedly choose any value at index i (1 ≤ i < n) where nums[i] > 0, decrease nums[i] by 1 and increase nums[i-1] by 1. Perform any number of such moves. Your goal is to minimize the largest element in the array after any sequence of such operations. Output the minimum possible value of the maximal element.

### Examples  

**Example 1:**  
Input: `nums = [3,7,1,6]`  
Output: `5`  
*Explanation:*
- Reduce nums[1] (7→6), nums (3→4): [4,6,1,6]
- Reduce nums[3] (6→5), nums[2] (1→2): [4,6,2,5]
- Reduce nums[1] (6→5), nums (4→5): [5,5,2,5]
Now, max is 5 and you can't do better by any sequence of allowed operations.

**Example 2:**  
Input: `nums = [10,1]`  
Output: `10`  
*Explanation:*
- If you try to push numbers left, 1 at index 1 can't decrease the much larger 10 at index 0. So, 10 is the answer.

**Example 3:**  
Input: `nums = [1,2,3,4,5]`  
Output: `3`  
*Explanation:*
- Repeatedly push rightmost numbers leftward until elements even out: [1,2,3,4,5] → [1,2,3,5,4] → [1,2,4,4,4] → ... eventually, every element becomes 3 or less. The minimal maximal value is 3.

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:**  
  Try all possible valid moves to spread out big numbers to the left until the array is “levelled” as much as possible (similar to redistributing “water in buckets”). But, this causes an exponential explosion; not feasible for n up to 10⁵.

- **Key observation:**  
  We are only allowed to shift numbers left (not right) and only by transferring 1 at a time. So, the only way to minimize the max is to "move excess" left as much as possible, evening out. The optimal configuration is always one with the smallest maximum possible, given the allowed operations.

- **Prefix sum approach:**  
  At every position k, the left k+1 numbers' sum is sum(nums...nums[k]). If we want the maximum after redistribution to be at most x, then  
  sum of first k+1 numbers ≤ x×(k+1) ⇒ x ≥ ⌈(nums+...+nums[k])/(k+1)⌉ for all k.  
  The minimum x satisfying this for all k is the answer.

- **Implementation plan:**  
  - Iterate from left to right, at each step compute the prefix sum so far and take the ceiling of (prefix_sum / (k+1)) and update the answer accordingly.
  - This is O(n) time and O(1) space.

- **Binary search approach:**  
  Alternatively, you can binary search on the possible maximal value and validate using a greedy distribution check, but the prefix sum approach is much simpler and direct.

### Corner cases to consider  
- Single element array: [x] ⇒ must return x.
- All zeros: [0,0,0,0] ⇒ answer is 0, since array can't change.
- Large values at the end: [0,0,10⁹] ⇒ must be able to spread it only as far left as allowed by moves.
- Can't reduce the max below average: [5,3,4], can't redistribute to lower than average after integer division.
- Already uniform: [2,2,2,2] ⇒ answer is 2.

### Solution

```python
def minimizeArrayValue(nums):
    # Running prefix sum and track maximum required average rounded up
    prefix_sum = 0
    res = 0
    for i, x in enumerate(nums):
        prefix_sum += x
        # (prefix_sum + i) // (i+1) = ceil(prefix_sum / (i+1))
        max_allowed = (prefix_sum + i) // (i + 1)
        res = max(res, max_allowed)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of nums. We scan each element once, doing O(1) work per iteration.
- **Space Complexity:** O(1), not counting input. Only constant extra variables (prefix sum and result).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could move any value to any index (not just to i-1)?
  *Hint: Would the answer just be the average of the array?*

- How would you modify your code if elements could be negative?
  *Hint: Think about redistributing deficits and surpluses.*

- Could you solve this with only binary search? How?
  *Hint: Try to reconstruct an isValid function that greedily “pushes” excess left and checks if possible.*

### Summary
This uses the classic prefix sum and greedy “min-max leveling” pattern, common in redistribution and “minimize maximum” type problems. The main insight is that the minimal maximal value possible is the maximum of ⌈(nums+...+nums[k])/(k+1)⌉ for all k. This approach applies to similar problems about distributing resources or leveling arrays under operation constraints.

### Tags
Array(#array), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Greedy(#greedy), Prefix Sum(#prefix-sum)

### Similar Problems
- Maximum Candies Allocated to K Children(maximum-candies-allocated-to-k-children) (Medium)
- Minimum Speed to Arrive on Time(minimum-speed-to-arrive-on-time) (Medium)
- Minimum Time to Complete Trips(minimum-time-to-complete-trips) (Medium)