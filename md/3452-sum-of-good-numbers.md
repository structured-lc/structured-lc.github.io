### Leetcode 3452 (Easy): Sum of Good Numbers [Practice](https://leetcode.com/problems/sum-of-good-numbers)

### Description  
Given an integer array **nums** and an integer **k**, an element at index **i** (*nums[i]*) is called **good** if it is **strictly greater** than the elements at indices **i - k** and **i + k** (if those indices exist). If an index does not exist (out of bounds), that check passes automatically.  
Return the **sum** of all the good elements in the array.

### Examples  

**Example 1:**  
Input: `nums = [1,3,2,1,5,4]`, `k = 2`  
Output: `12`  
*Explanation: Good numbers are nums[1]=3 (3 > 1 at index -1, 3 > 1 at index 3), nums[4]=5 (5 > 2 at index 2, 5 > 4 at index 6 does not exist), nums[5]=4 (4 > 1 at index 3, 4 at index 7 does not exist). Their sum: 3 + 5 + 4 = 12.*

**Example 2:**  
Input: `nums = [2,1]`, `k = 1`  
Output: `2`  
*Explanation: Good number is nums=2 (index -1 does not exist, 2 > 1 at index 1).*

**Example 3:**  
Input: `nums = [3,1,4,1,5], k = 2`  
Output: `9`  
*Explanation: Good numbers: nums=3 (no left neighbor, 3 > 4 at index 2 is false), nums[2]=4 (4 > 3 at index 0, 4 > 5 at index 4 is false), nums[4]=5 (5 > 4 at index 2, no right neighbor). Only nums[4]=5 is good. Output: 5.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  For each element nums[i], check if **both** nums[i - k] and nums[i + k] exist.  
    - If yes, nums[i] is good if it is strictly greater than both.  
    - If the index is out of bounds, ignore that check (it automatically passes).  
    - Sum up all good nums[i].

- **Why this works:**  
  Since **n** is small (≤100), a simple scan checking at most two neighbors for each index runs in O(n) time. No need to optimize further.

- **Trade-offs:**  
  - Readability and correctness are prioritized.  
  - No extra space needed, as only a running sum is required.

### Corner cases to consider  
- k is large (e.g., k = ⌊n/2⌋), so some indices may go out of bounds frequently.
- nums has all elements equal (none will be good except possibly at the ends).
- nums length is minimum (2), k = 1.
- Only one element passes the criteria.
- Negative indices and indices beyond array length.
- nums contains strictly increasing, strictly decreasing, or random values.

### Solution

```python
def sumOfGoodNumbers(nums, k):
    n = len(nums)
    total = 0

    for i in range(n):
        is_good = True

        # Check left neighbor at i - k
        left = i - k
        if left >= 0 and nums[i] <= nums[left]:
            is_good = False

        # Check right neighbor at i + k (only if still good so far)
        right = i + k
        if is_good and right < n and nums[i] <= nums[right]:
            is_good = False

        if is_good:
            total += nums[i]

    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  For each element, at most two comparisons (left and right), so total work scales linearly with n.
- **Space Complexity:** O(1).  
  Only uses a few integer variables (total, loop index), no auxiliary data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify this to return the indices of all good numbers instead of their sum?  
  *Hint: Instead of adding nums[i] to total, store i in a result list.*

- How would you count the number of good numbers, not their sum?  
  *Hint: Increment a counter instead of summing values.*

- If you need to handle updates to the array and answer queries online, how could you approach this?  
  *Hint: Segment trees or preprocessing for fewer repeated checks, if n is much larger.*

### Summary
This is a classic **linear scan** pattern where each element does at most two bounded neighbor checks. The approach generalizes to problems involving neighbors in arrays and can be applied to other "local comparison" problems, such as finding local maxima/minima or peaks in sequences.

### Tags
Array(#array)

### Similar Problems
