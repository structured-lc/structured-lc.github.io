### Leetcode 3034 (Medium): Number of Subarrays That Match a Pattern I [Practice](https://leetcode.com/problems/number-of-subarrays-that-match-a-pattern-i)

### Description  
You're given two arrays:  
- **nums** (length n): a list of integers  
- **pattern** (length m): a list of integers, each either -1, 0, or 1

A subarray of nums of size m + 1 **matches** the pattern if for every k in 0..m-1:  
- If pattern[k] == 1: nums[i+k+1] > nums[i+k]  
- If pattern[k] == 0: nums[i+k+1] == nums[i+k]  
- If pattern[k] == -1: nums[i+k+1] < nums[i+k]

Your task: **Count how many subarrays of nums of length m+1 exactly match the pattern.**  
You must check every window of size m+1 and validate if the relationships between each consecutive pair matches pattern.

---

### Examples  

**Example 1:**  
Input: `nums = [1,4,4,1,3,5,5,3], pattern = [1,0,-1]`  
Output: `2`  
*Explanation: The two subarrays are [1,4,4,1] (1<4, 4=4, 4>1) and [3,5,5,3] (3<5, 5=5, 5>3).*

**Example 2:**  
Input: `nums = [1,2,3,4,5], pattern = [1,1,1,1]`  
Output: `1`  
*Explanation: Only [1,2,3,4,5] (1<2, 2<3, 3<4, 4<5) matches pattern [1,1,1,1].*

**Example 3:**  
Input: `nums = [4,3,2,1], pattern = [-1,-1,-1]`  
Output: `1`  
*Explanation: Only [4,3,2,1] (4>3, 3>2, 2>1) matches pattern [-1,-1,-1].*

---

### Thought Process (as if you’re the interviewee)  
Let’s break down the problem:

- For every possible subarray of length m+1, compare each pair in the subarray as described by pattern.
- Brute-force: Check all such subarrays, for each validate all m comparisons according to pattern. Increment answer if all checks pass.
- Optimize?:  
  - The input constraints are small enough that brute-force is acceptable.
  - If constraints were larger, we might try to preprocess relationships, or use KMP/Z-algorithm for repeated pattern checking, but that is not required here.
- Trade-off: The brute-force checks n-m subarrays × m checks/subarray. O(n⋅m) total.

---

### Corner cases to consider  
- Empty nums or pattern (should return 0).
- pattern longer than or equal to nums (no subarray of size m+1).
- All numbers equal, with pattern of zeros.
- All increasing/decreasing, with pattern of all 1s or all -1s.
- pattern contains only one comparison.
- Multiple overlapping valid subarrays.

---

### Solution

```python
def countMatchingSubarrays(nums, pattern):
    n = len(nums)
    m = len(pattern)
    count = 0

    # Loop over every possible subarray of length m+1 in nums
    for i in range(n - m):
        matches = True
        # For each index in the pattern, check the relationship
        for k in range(m):
            if pattern[k] == 1:
                if nums[i + k + 1] <= nums[i + k]:
                    matches = False
                    break
            elif pattern[k] == 0:
                if nums[i + k + 1] != nums[i + k]:
                    matches = False
                    break
            elif pattern[k] == -1:
                if nums[i + k + 1] >= nums[i + k]:
                    matches = False
                    break
        if matches:
            count += 1
    return count
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n·m), where n = len(nums), m = len(pattern). For each starting index i (from 0 to n-m-1), we check m pairs.
- **Space Complexity:** O(1) (no extra space apart from constant variables; no recursion or auxiliary data structures).

---

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if nums and pattern were both much larger (e.g. n, m up to 10⁵)?
  *Hint: Think about pattern preprocessing, rolling hash, or algorithms like KMP/Z-algorithm.*

- Can you handle a pattern with wildcards (e.g. '*' meaning "any relation allowed")?
  *Hint: Loosen the matching condition in your comparison loop for wildcard positions.*

- What if pattern elements could be arbitrary relational operators (e.g. >=, <=, !=)?
  *Hint: Design a mapping from operator representation to function, or parse the operator and apply it directly.*

---

### Summary
This problem is a classic **sliding window + match pattern** variant: for each subarray window, check all pairwise constraints given by pattern. The main coding pattern is a double for-loop, where the inner loop checks validity efficiently and uses early termination for speed. This approach generalizes well to a variety of pattern-matching questions where pairwise relationships are tested across windows of an array.


### Flashcard
Brute-force all subarrays of length m+1; for each, validate all m pairwise comparisons against pattern.

### Tags
Array(#array), Rolling Hash(#rolling-hash), String Matching(#string-matching), Hash Function(#hash-function)

### Similar Problems
- Count the Number of Incremovable Subarrays I(count-the-number-of-incremovable-subarrays-i) (Easy)