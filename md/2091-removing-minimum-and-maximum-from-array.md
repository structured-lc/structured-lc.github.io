### Leetcode 2091 (Medium): Removing Minimum and Maximum From Array [Practice](https://leetcode.com/problems/removing-minimum-and-maximum-from-array)

### Description  
Given an integer array `nums`, you can only remove elements either from the **front** or **back** of the array (not the middle). Each removal operation deletes the front or back element. Your goal is to remove **both** the minimum and maximum elements using the smallest number of such operations. Return the minimum number of deletions required to remove both the smallest and largest elements from the array.

### Examples  

**Example 1:**  
Input: `nums = [2,10,7,5,4,1,8,6]`  
Output: `5`  
*Explanation: Minimum is 1 (index 5), maximum is 10 (index 1).  
Options:  
- Remove from the front: Remove elements up to index 5 (need 6 deletions, not minimum).  
- Remove from the back: Remove elements up to index 1 from the end (need 7 deletions, not minimum).  
- **Optimal**: Remove 2 from front (indices 0,1) and 3 from back (indices 7,6,5), total = 5.*

**Example 2:**  
Input: `nums = [0,-4,19,1,8,-2,-3,5]`  
Output: `3`  
*Explanation: Minimum is -4 (index 1), maximum is 19 (index 2).  
- Both are close to the front. Remove the first 3 elements (indices 0,1,2).*

**Example 3:**  
Input: `nums = `  
Output: `1`  
*Explanation: There's only one element, which is both min and max. Only 1 operation is needed.*

### Thought Process (as if you’re the interviewee)  
First, it's tempting to consider trying all possible removal orders, but that would be very inefficient for larger arrays.  
Observing the problem, each removal is possible only from the ends, so for any element, it can only be removed from the left or right.  
We need to remove *both* min and max.  
- Find the indices of the min and max values – call them `min_idx` and `max_idx`.
- There are **3 possible strategies**:  
  1. Remove both from the front (delete up to the farthest index among min and max, i.e. max(min_idx, max_idx) + 1 operations).
  2. Remove both from the back (delete up to the farthest from the back, i.e. n - min(min_idx, max_idx) operations).
  3. Remove one from each end: remove elements up to the smaller index from the front, and up to the other from the back (split). That is, (min_idx + 1) + (n - max_idx) or (max_idx + 1) + (n - min_idx).
- The answer is the minimum of all these 3 options.  
This simple O(n) scan guarantees optimality, as deleting only from ends forbids anything fancier.

### Corner cases to consider  
- Array of length 1 (already both min and max)
- Array of length 2 (they are both ends)
- min_idx == max_idx (all elements equal, or singleton)
- min and max at the same end
- min at front, max at end  
- min at end, max at front  
- Negative and positive numbers

### Solution

```python
def minimumDeletions(nums):
    n = len(nums)
    # Find indices of min and max elements
    min_idx = max_idx = 0
    for i in range(n):
        if nums[i] < nums[min_idx]:
            min_idx = i
        if nums[i] > nums[max_idx]:
            max_idx = i
    # Sorting not needed; just determine order
    left = min(min_idx, max_idx)
    right = max(min_idx, max_idx)
    # 1. Both from front
    option1 = right + 1
    # 2. Both from back
    option2 = n - left
    # 3. One from each end
    option3 = (left + 1) + (n - right)
    return min(option1, option2, option3)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we scan the array once to find min and max indices, and all other logic is O(1).
- **Space Complexity:** O(1), uses only variables for indices and counts, no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can remove elements from **anywhere** in the array?  
  *Hint: The problem becomes trivial — always 2 steps, unless min and max are the same.*

- What if you had to **return the actual sequence** of operations (indices/values removed)?  
  *Hint: Track the indices chosen, based on the minimum strategy computed.*

- How would your solution change if elements were **not unique**?  
  *Hint: The computation is the same, but you need to remove the first occurrence of min and max.*

### Summary
This approach uses the classic **two pointers or scanning** pattern, and leverages the fact that deletions can only happen from the ends. It reduces the problem to checking three scenarios and picking the minimum, which is efficient and easy to generalize. This pattern applies to any "delete from ends" optimal reduction problem, commonly seen in greedy algorithms and array manipulation interview questions.