### Leetcode 3347 (Hard): Maximum Frequency of an Element After Performing Operations II [Practice](https://leetcode.com/problems/maximum-frequency-of-an-element-after-performing-operations-ii)

### Description  
You are given an integer array nums and two integers, k and numOperations.  
You must perform numOperations operations on nums, where in each operation:
- Select an index \(i\) **not** previously selected.
- Add any integer in range [-k, k] to nums[i].

Your goal is to **maximize** the frequency of any element in the array after all operations.  
Return the maximum possible frequency that can be achieved.

**Key:**  
You can use at most numOperations elements and change each by at most k in either direction. Each index can be changed at most once.

### Examples  

**Example 1:**  
Input: `nums = [1,4,5]`, `k = 1`, `numOperations = 2`  
Output: `2`  
Explanation:  
Choose indices 1 and 2.  
- Add 0 to nums[1] → [1, 4, 5]  
- Add -1 to nums[2] → [1, 4, 4]  
Maximum frequency achieved is 2 (number 4 appears twice).

**Example 2:**  
Input: `nums = [5,11,20,20]`, `k = 5`, `numOperations = 1`  
Output: `2`  
Explanation:  
Choose index 1.  
- Add 0 to nums[1] → [5, 11, 20, 20]  
No changes improve max frequency, but 20 already appears twice.

**Example 3:**  
Input: `nums = [2,3,3]`, `k = 1`, `numOperations = 2`  
Output: `4`  
Explanation:  
- You can convert both 3s to 2 (add -1), making the array [2,2,2].  
- Maximum frequency is 3 (for 2). However, with the constraints in the original problem, with only 2 operations the best achievable is 2 unless explained otherwise.

### Thought Process (as if you’re the interviewee)  
**Brute-force idea:**  
- Try all subsets of indices, apply an allowed change, and recompute the frequency after each operation.
- Cumbersome and not feasible, O(2ⁿ × n), where n = len(nums).

**Optimized approach:**  
- Realize you can only change numOperations values each by at most k.
- Fix a target value x. For each element, check if it can be adjusted to x within ±k.  
- The key is: for each value in nums, count itself and how many other elements (within allowable adjustment) can be changed to it — but you can't adjust more than numOperations numbers.  
- For all possible x (all nums plus their k-interval range), calculate the max frequency.

**Sliding window:**  
- Sort nums.
- Slide a window, keep track of how many in current window can be made equal (difference ≤ k), using at most numOperations changes.
- For each target in sorted nums, for elements outside the window: can they reach target with ≤k change?  
- Track window size (`original` elements) and number needing change (`outside`), never spend more than numOperations.

This tradeoff keeps it O(n log n): sorting, window, counting operations.

### Corner cases to consider  
- Empty array (but 1 ≤ n).
- numOperations = 0 (cannot modify any numbers).
- k = 0 (only exact values without any change).
- All elements already equal.
- numOperations ≥ nums.length (can change everything).
- Large k, small numOperations.

### Solution

```python
def maxFrequency(nums, k, numOperations):
    # Sort array to allow sliding window
    nums.sort()
    n = len(nums)
    max_freq = 1
    left = 0
    ops_used = 0
    
    # Start window from left, try for every right index
    for right in range(n):
        # Incrementally track the number of 'operations' required to make window all nums[right]
        # Each time right moves, need (nums[right] - nums[right-1]) * window_size
        if right > 0:
            ops_used += (nums[right] - nums[right - 1]) * (right - left)
        # If over budget, need to slide left side
        while ops_used > k * numOperations:
            # Reduce the ops_used by decreasing from left
            ops_used -= nums[right] - nums[left]
            left += 1
        # Window size = right - left + 1, up to using at most numOperations changes
        # But only up to numOperations changed numbers, rest must be original
        freq = min(numOperations + 1, right - left + 1)
        max_freq = max(max_freq, freq)
    
    return max_freq
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n). Sorting takes O(n log n), the sliding window runs in O(n) time.
- **Space Complexity:** O(1) extra if sort in-place. Otherwise O(n) for a new sorted array.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you return the value (not just the frequency) that achieves the maximum frequency?  
  *Hint: Map the sliding window index and reverse map back to the value targeted.*

- What if the number of allowed operations numOperations is much larger than array size?  
  *Hint: All numbers can be made equal if  k is big enough.*

- How would constraints change if you needed all elements to be equal, not just maximize any frequency?  
  *Hint: Check cost for all numbers and see if possible.*

### Summary
The approach uses a **sorting + sliding window pattern** to efficiently maximize frequency under range-change and limited operation constraints. The main pattern—sliding a window and accounting for adjustment cost—is widely applicable in range frequency optimization problems, such as minimum moves to equal array elements with constraints.


### Flashcard
Fix target value x; for each element in nums, determine if it can be adjusted to x within ±k; count how many elements can reach x, track maximum frequency.

### Tags
Array(#array), Binary Search(#binary-search), Sliding Window(#sliding-window), Sorting(#sorting), Prefix Sum(#prefix-sum)

### Similar Problems
- Frequency of the Most Frequent Element(frequency-of-the-most-frequent-element) (Medium)
- Count Elements With Maximum Frequency(count-elements-with-maximum-frequency) (Easy)