### Leetcode 1346 (Easy): Check If N and Its Double Exist [Practice](https://leetcode.com/problems/check-if-n-and-its-double-exist)

### Description  
Given an integer array, determine if there exist **two distinct indices** i and j such that arr[i] == 2 × arr[j]. 
You need to return **true** if there is at least one such pair, otherwise return **false**. 
Pay special attention to the case where zero appears more than once (since 0 × 2 = 0).

### Examples  

**Example 1:**  
Input: `[10, 2, 5, 3]`  
Output: `true`  
*Explanation: 5 × 2 = 10. So, arr[i]=10 and arr[j]=5 with i≠j.*

**Example 2:**  
Input: `[7, 1, 14, 11]`  
Output: `true`  
*Explanation: 7 × 2 = 14.*

**Example 3:**  
Input: `[3, 1, 7, 11]`  
Output: `false`  
*Explanation: No such pair exists.*

### Thought Process (as if you’re the interviewee)  
First, I’d brute-force the problem: check every pair (i, j) with i ≠ j, and see if arr[i] == 2 × arr[j]. This would be O(n²), slow for larger arrays. To optimize, I'll use a set to store seen elements; as I loop through the array, for each number num, check if 2×num is already seen or if num is even and num//2 is seen. If either is true, I've found my pair. This brings us to O(n) time with O(n) space.

### Corner cases to consider  
- Array contains multiple zeros (should return true if at least 2 zeros exist)  
- Negative numbers (– e.g., -2 and -4)  
- No valid pairs at all  
- Only one element in the array  
- Elements with value 0 interleaved with non-double numbers

### Solution

```python
# O(n) time, O(n) space
# We keep a set of numbers we've seen. For each num, check if 2×num or num//2 is in the set (the latter only if num is even).
def checkIfExist(arr):
    seen = set()
    for num in arr:
        # Check if double already exists (i.e., we saw num//2 earlier)
        if 2 * num in seen or (num % 2 == 0 and num // 2 in seen):
            return True
        seen.add(num)
    return False
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) – single pass through array, set operations are O(1).
- **Space Complexity:** O(n) for the extra set to store seen numbers.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need the actual indices of N and 2×N?    
  *Hint: Store index along with value or use map from value to index.*

- Can you solve this in O(1) space assuming input bounds?   
  *Hint: Possible if you use input constraints, e.g., fixed range arrays.*

- How to handle float numbers, or avoid integer division issues?   
  *Hint: Be careful with precision and check divisibility before division.*

### Summary
We used the Hashing (set) finding pattern to check for complements in O(n) time. This is common for pair-checking problems, such as "Two Sum" and similar array membership detections.

### Tags
Array(#array), Hash Table(#hash-table), Two Pointers(#two-pointers), Binary Search(#binary-search), Sorting(#sorting)

### Similar Problems
- Keep Multiplying Found Values by Two(keep-multiplying-found-values-by-two) (Easy)