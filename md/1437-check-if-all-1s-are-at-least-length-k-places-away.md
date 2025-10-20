### Leetcode 1437 (Easy): Check If All 1's Are at Least Length K Places Away [Practice](https://leetcode.com/problems/check-if-all-1s-are-at-least-length-k-places-away)

### Description  
Given a binary array (list of 0s and 1s) and integer k, check whether all 1’s are at least k indices apart (i.e., for every two 1’s, their index difference > k).

### Examples  

**Example 1:**  
Input: `nums = [1,0,0,0,1,0,0,1], k = 2`  
Output: `True`  
*Explanation: The 1’s at positions 0 & 4: 4-0=4 > 2. Next 1 at index 7: 7-4=3 > 2.*

**Example 2:**  
Input: `nums = [1,0,0,1,0,1], k = 2`  
Output: `False`  
*Explanation: 1's at positions 0 & 3: 3-0=3 > 2. Next 1 at 5: 5-3=2 not > 2. Hence, False.*

**Example 3:**  
Input: `nums = [1,1,1,1,1], k = 0`  
Output: `True`  
*Explanation: k=0 allows 1’s to be at adjacent positions.*

### Thought Process (as if you’re the interviewee)  
Walk through the array, tracking the position of the previous 1. For each 1, check if the gap to the previous 1 is > k. If not, return False. First 1 is always valid. Single pass, constant space — optimal for this scenario.

### Corner cases to consider  
- Array with no 1’s (always True)
- k = 0 (should allow consecutive 1’s)
- Only one 1 in the array
- 1’s at start & end only

### Solution

```python
def kLengthApart(nums, k):
    prev = -1
    for i, val in enumerate(nums):
        if val == 1:
            if prev != -1 and i - prev - 1 < k:
                return False
            prev = i
    return True
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) — traverse the array once.
- **Space Complexity:** O(1) — only a few integer variables needed.

### Potential follow-up questions (as if you’re the interviewer)  

- How to solve if 1’s must be *exactly* k apart?  
  *Hint: Change condition to i - prev - 1 == k.*

- What if array is very large and streamed?  
  *Hint: Keep only last 1’s position, can work on streaming data.*

- How about generalizing to 2’s and 3’s (or any digit)?  
  *Hint: Parameterize the target digit.*

### Summary
This is a linear scan/logical pointer (last-seen) problem; the template works for off-by-k checks in sequences, e.g., checking gaps or windows in bit masks.


### Flashcard
Track previous 1’s index; for each 1, check if gap to previous 1 is ≥ k, else return False.

### Tags
Array(#array)

### Similar Problems
- Task Scheduler II(task-scheduler-ii) (Medium)