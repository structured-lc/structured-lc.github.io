### Leetcode 1640 (Easy): Check Array Formation Through Concatenation [Practice](https://leetcode.com/problems/check-array-formation-through-concatenation)

### Description  
Given an integer array `arr` and an array `pieces`, where each `pieces[i]` is a unique subarray, check if you can form `arr` by concatenating the arrays in `pieces` (in any order), but you cannot reorder elements within any `pieces[i]`.

### Examples  
**Example 1:**  
Input: `arr = , pieces = []`  
Output: `True`  
*Explanation: Only one piece; trivially forms arr.*

**Example 2:**  
Input: `arr = [91,4,64,78], pieces = [,[4,64],]`  
Output: `True`  
*Explanation: Ordered as , [4,64],  gives arr.*

**Example 3:**  
Input: `arr = [49,18,16], pieces = [[16,18,49]]`  
Output: `False`  
*Explanation: Elements' order in arr can't be reproduced from the piece as-is.*

### Thought Process (as if you’re the interviewee)  
Since the order inside each piece can't be changed, but pieces themselves may be concatenated in any order, try to "match" each piece greedily as you scan arr left to right. To make lookups O(1), map the first element of each piece to the piece itself.

If at any index in arr, you find an element that's not the start of any piece, return False. If it matches, check the entire piece matches as a contiguous segment in arr.

### Corner cases to consider  
- arr and pieces both empty
- Some numbers in arr missing from pieces
- Duplicates in arr or pieces
- arr contains elements in wrong order

### Solution

```python
def canFormArray(arr, pieces):
    first_elem_map = {piece[0]: piece for piece in pieces}
    i = 0
    while i < len(arr):
        if arr[i] not in first_elem_map:
            return False
        piece = first_elem_map[arr[i]]
        if arr[i:i+len(piece)] != piece:
            return False
        i += len(piece)
    return True
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), n = length of arr, each element processed at most once
- **Space Complexity:** O(m), m = total elements in all pieces (dict for pieces)

### Potential follow-up questions (as if you’re the interviewer)  
- What if pieces can overlap?
  *Hint: Allow elements to be in multiple pieces, or pieces with repeated subarrays—how do you track usage?*

- Can you allow partial matches (not all arr used)?
  *Hint: Change greedy match to check subsequences, not entire arr.*

- Can you form arr if you can reorder elements within pieces?
  *Hint: Relax in-piece order restriction, try sorting or hashing.*

### Summary
This is a hash-map matching problem—a greedy walk with O(1) piece lookup, commonly seen in segment assembling and array-building-type questions.


### Flashcard
Match pieces of an array greedily to check if it can be formed by concatenation.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
