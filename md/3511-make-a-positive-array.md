### Leetcode 3511 (Medium): Make a Positive Array [Practice](https://leetcode.com/problems/make-a-positive-array)

### Description  
Given an array of integers nums, an array is called **positive** if **every subarray with more than two elements** has a strictly positive sum.  
You are allowed to replace **one** element at a time in nums with any integer in \([-10^{18}, 10^{18}]\), as many times as you want.  
Return the **minimum number of replacements** needed to make nums positive.

*In simpler terms*:  
Our job is to make the minimum changes so that every subarray of length at least 3 has a positive sum.  
We can change any array element to any value (even very large positive or negative numbers).

### Examples  

**Example 1:**  
Input: `nums = [1, -3, 1, -3, 1]`  
Output: `2`  
*Explanation:  
Consider the first subarray of length 3: [1, -3, 1] → sum = -1 (negative).  
We can change the middle -3 to a large positive (e.g., 10), get [1, 10, 1].  
Next, the window [10, 1, -3] sum = 8 (positive), but [1, -3, 1] further ahead is also problematic.  
After two changes, all length-3 (or more) subarrays become positive. The minimum number of ops needed is 2.*

**Example 2:**  
Input: `nums = [5, 6, 7]`  
Output: `0`  
*Explanation:  
Every subarray with more than 2 elements is just [5,6,7], sum = 18, which is already positive. No change needed.*

**Example 3:**  
Input: `nums = [-1, -2, -3]`  
Output: `1`  
*Explanation:  
The only subarray with more than 2 elements is [-1,-2,-3], sum = -6.  
Just change any one element (e.g., -3 to 7), so sum = -1 + -2 + 7 = 4 (positive). Need at least one operation.*

### Thought Process (as if you’re the interviewee)  

To make the array positive, for every subarray where length ≥ 3, its sum must be > 0.  
Brute-force: Try all possible replacements for all elements and check every subarray sum, but this is exponential and infeasible for large arrays.

**Observations:**
- Since we can replace an element with ANY integer, we can always "fix" non-positive sums by changing one element of that subarray to a very large positive number.
- But we want to minimize the number of changes.

**Optimized approach:**  
- Use a **sliding window** and **prefix sums**.
- Move a window of size ≥ 3 across the array, keep track of the sum as we go.
- If, for a window, the sum is non-positive (≤ 0), then we must "break" the problem at this point and fix it by changing one of the elements in this window.
- After fixing, we reset our window tracking (since the replaced element can be any value).
- Track the previous maximum prefix sum to check for the overlaps.
- Greedy: Always fix at the earliest possible place, then start sliding from after this point.

**Why this is greedy**: We correct the first violation immediately, which splits the array into independent parts and guarantees global optimality (no violation is left "behind" unfixed).

### Corner cases to consider  
- Array length < 3: No subarray of size ≥ 3, so answer is 0.
- All positive numbers: Already positive.
- All large negatives: Each window triggers a replacement.
- Array with alternating large positive and negative values.
- Input contains extreme values (very large or small).

### Solution

```python
def makeArrayPositive(nums):
    # l keeps the start of the last segment we've fixed
    l = -1
    ans = 0
    pre_max = 0  # Maximum sum before current window
    s = 0        # Running sum
    
    for r, x in enumerate(nums):
        s += x
        
        # If window size > 2 and sum becomes ≤ pre_max, we must "fix" here
        if r - l > 2 and s <= pre_max:
            ans += 1
            l = r
            pre_max = 0
            s = 0
        # Otherwise, if window size ≥ 2, update pre_max for future checks
        elif r - l >= 2:
            pre_max = max(pre_max, s - x - nums[r - 1])
    
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Every array element is processed once in the loop; all window calculations and updates are constant time.

- **Space Complexity:** O(1)  
  No extra data structures used, just a handful of scalar variables for running sums, indices, and the count.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could only increase elements (no arbitrary integer replacement)?
  *Hint: Now you can't fix with a large negative, so the problem is different; subarrays may require multiple increases.*

- Can you output the indices of elements you chose to replace?
  *Hint: Store the index when you increment ans and reset pointers.*

- How would you adapt the code for k-length violation windows instead of length ≥ 3?
  *Hint: Generalize the window size check from 2 to k - 1.*

### Summary
This problem uses a **greedy sliding window** and **prefix sum** approach to minimize changes needed to enforce positive sums over all windows of size ≥ 3.  
This pattern of breaking the problem at the earliest violation is common in optimizations involving windows or ranges—such as "Partition Array", "Subarray Sums", or "Minimize Operations" types of problems.  
No fancy data structures are needed; reasoning about prefix sums and careful window movement is sufficient. The overall pattern is frequently seen in competitive programming and algorithmic interviews.