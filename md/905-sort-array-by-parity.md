### Leetcode 905 (Easy): Sort Array By Parity [Practice](https://leetcode.com/problems/sort-array-by-parity)

### Description  
Given an integer array `nums`, arrange the array so that all **even** numbers appear first, followed by all **odd** numbers. The relative order within the even and odd groups is not important – any such arrangement is valid.  
You should return any array that satisfies this condition.  

Example:  
- Input: `nums = [3,1,2,4]`
- Output: `[2,4,3,1]`  
  (any output where all even numbers come before any odd numbers is acceptable, e.g., `[4,2,3,1]`, `[2,4,1,3]`, etc.)

### Examples  

**Example 1:**  
Input: `[3,1,2,4]`  
Output: `[2,4,3,1]`  
*Explanation: 2 and 4 are even and should come before 3 and 1 (odd). Many valid outputs exist as long as all evens precede all odds.*

**Example 2:**  
Input: ``  
Output: ``  
*Explanation: 0 is even, so the array remains the same.*

**Example 3:**  
Input: `[1,3,5]`  
Output: `[1,3,5]`  
*Explanation: All numbers are odd; so all numbers remain as they are. Order doesn't matter.*

### Thought Process (as if you’re the interviewee)  
First, I’d clarify that “by parity” means grouping by evenness: all even numbers first, then all odd numbers. The relative order within each group doesn’t matter.

**Brute-force:**  
I could create a new array. First, loop through `nums`, adding all even numbers to the result, then through `nums` again to add all odd numbers. This uses O(n) extra space.

**In-place solution:**  
We can use a two-pointer approach:  
- Start one pointer at the left (for evens), and one at the right (for odds).  
- If the left pointer is at an odd number and the right is at an even, swap them.  
- Move pointers accordingly.  
This sorts the array in-place, O(1) space, O(n) time.  

**Why this?**  
The two-pointer method is efficient and meets constraints without requiring extra space.

### Corner cases to consider  
- Empty array (`[]`)
- Array with all evens (`[2,4,6]`)
- Array with all odds (`[1,3,5]`)
- One element (``, `[1]`)
- Duplicates (`[2,2,3,3]`)
- Already sorted arrays  
- Large array or extreme input values

### Solution

```python
def sortArrayByParity(nums):
    # Two pointers: left for even, right for odd
    left, right = 0, len(nums) - 1
    while left < right:
        # Move left pointer if current is even
        if nums[left] % 2 == 0:
            left += 1
        # Move right pointer if current is odd
        elif nums[right] % 2 == 1:
            right -= 1
        # Swap if left is odd and right is even
        else:
            nums[left], nums[right] = nums[right], nums[left]
            left += 1
            right -= 1
    return nums
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) – we examine each element at most once, as each pointer moves inward.
- **Space Complexity:** O(1) – done in-place, no extra arrays or significant storage is needed beyond a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you maintain the *relative order* of evens and odds?
  *Hint: Is a stable partition possible with O(1) space?*
- Can you generalize this to partition by any property, not just parity?
  *Hint: What if you wanted all numbers ≤ k first, then greater?*
- How would this change if the input was a linked list?
  *Hint: Remember pointer manipulation is different than array indexing.*

### Summary
This is a classic **two-pointer partitioning problem**, similar to the partition step in QuickSort, but on a simple property (parity). The pattern is **in-place partitioning** and comes up in problems where you need to group elements based on a simple predicate. The solution is efficient and easy to implement. This pattern applies to grouping numbers, colors, or objects by a binary property in an array.