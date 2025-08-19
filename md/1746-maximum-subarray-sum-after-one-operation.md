### Leetcode 1746 (Medium): Maximum Subarray Sum After One Operation [Practice](https://leetcode.com/problems/maximum-subarray-sum-after-one-operation)

### Description  
Given an integer array **nums**, you must perform **exactly one operation**: choose any index \(i\) and replace **nums[i]** with **nums[i] × nums[i]** (i.e., square a single element, exactly once). Return the **maximum possible sum of a non-empty subarray** that can be achieved **after performing this operation**.  
A subarray is a contiguous sequence of elements from the array.

### Examples  

**Example 1:**  
Input: `nums = [2, -1, -4, -3]`  
Output: `17`  
*Explanation: Perform the operation on index 2 ⇒ [2, -1, 16, -3]. Maximum subarray is [2, -1, 16]: 2 + (-1) + 16 = 17.*

**Example 2:**  
Input: `nums = [1, -1, 1, 1, -1, -1, 1]`  
Output: `4`  
*Explanation: Perform the operation on index 1 ⇒ [1, 1, 1, 1, -1, -1, 1]. The maximum subarray [1, 1, 1, 1] sums to 4.*

**Example 3:**  
Input: `nums = [-2, -5, 3, 1, -4]`  
Output: `17`  
*Explanation: Perform the operation on index 2 ⇒ [-2, -5, 9, 1, -4]. The maximum subarray [9, 1, -4] sums to 6, but [9, 1] gives 10. Or squaring -5: [-2, 25, 3, 1, -4] — [25, 3, 1] gives 29. Actually, squaring -5 gives the best: max sum is 29.*

### Thought Process (as if you’re the interviewee)  
First, brute force: try squaring every element, recalculate the maximum subarray sum for each, and pick the largest. But this would be O(n²), as for each element, you check all subarrays.

Optimizing:  
Notice that this is like Kadane’s algorithm for max subarray sum, but with the twist that you can “activate” a squaring once, anywhere in your subarray.  
At each position, keep two states:
- **Without squaring** (ordinary Kadane’s),
- **With squaring** (where you have already done the operation at or before this position).

You can decide to square at the current index (starting a new sequence with square), or continue a previous sequence where the operation was already done.

So, define:
- `dp_no_op[i]` — max subarray ending at i, without using the operation yet
- `dp_op[i]` — max subarray ending at i, with operation used

Recurrence:
- `dp_no_op[i] = max(dp_no_op[i-1] + nums[i], nums[i])`
- When you do square at i:  
  `dp_op[i] = max(dp_no_op[i-1] + nums[i]×nums[i], nums[i]×nums[i])`
- Continue from an earlier op:  
  `dp_op[i] = max(dp_op[i-1] + nums[i], dp_op[i])`

Combine these.

Trade-offs:  
This method is O(n) time, O(1) space (can reuse variables).  
Brute-force is much slower.

### Corner cases to consider  
- Array has only 1 element
- All elements positive or all negative
- Squaring negatives can turn them highly positive (e.g., -10000\*\*-10000 = 10⁸)
- The optimal result comes from squaring an element not in the maximal subarray, but whose square enables a longer positive subarray
- Array of length 1: must square that item

### Solution

```python
def maxSumAfterOperation(nums):
    # Initialize states
    max_no_op = 0       # max subarray sum ending here, before operation
    max_with_op = 0     # max subarray sum ending here, after operation
    ans = float('-inf') # global max answer
    
    for num in nums:
        # Max subarray sum ending here, before operation (ordinary Kadane's)
        prev_no_op = max_no_op
        max_no_op = max(max_no_op + num, num)

        # Max subarray sum ending here, after operation
        # Option 1: Square at current index (maybe start a new subarray or extend previous no-op)
        sq = num * num
        max_with_op = max(
            prev_no_op + sq,  # Square current, possibly extend previous no-op
            sq,               # Start new subarray, square only
            max_with_op + num # Extend subarray that already used operation
        )

        # Track answer: we must have used the operation exactly once
        ans = max(ans, max_with_op)
        
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(nums). Each element is processed in O(1) time.
- **Space Complexity:** O(1), only a few variables for current and previous states.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could perform the squaring operation **at most once** (i.e., zero or one time)?
  *Hint: Would your algorithm change if 'operation used' wasn't mandatory?*

- What if you could perform the operation on **a subarray** (square all elements in a chosen subarray instead of just one)?
  *Hint: Can you adapt the state tracking?*

- Can this approach be modified if the operation was, say, "add any positive integer to a single element"?
  *Hint: How does the dynamic programming transition change?*

### Summary
This problem uses a **dynamic programming extension of Kadane’s algorithm** with two running states ("used operation" and "not yet used"). It's a great example of how to handle "one modification" variants of subarray problems. This "split state DP" technique is broadly useful for max/min subarrays with a single edit (delete, replace, skip), often seen in competitive programming and interviews.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Maximum Subarray(maximum-subarray) (Medium)