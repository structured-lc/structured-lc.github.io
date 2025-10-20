### Leetcode 1426 (Easy): Counting Elements [Practice](https://leetcode.com/problems/counting-elements)

### Description  
Given an integer array, count how many elements x exist such that x + 1 is also present in the array. Each occurrence is counted separately, so duplicates in the array should be counted each time they satisfy the condition.  
For example, if an element 2 appears three times, and 3 is present somewhere in the array, each 2 counts towards the answer.

### Examples  

**Example 1:**  
Input: `[1,2,3]`  
Output: `2`  
*Explanation: 1 and 2 are both counted because 2 and 3 exist in the array.*

**Example 2:**  
Input: `[1,1,3,3,5,5,7,7]`  
Output: `0`  
*Explanation: No number is counted, because for each x, x + 1 is not present in arr.*

**Example 3:**  
Input: `[1,3,2,3,5,0]`  
Output: `3`  
*Explanation: 1 → 2 in arr, 2 → 3 in arr, 3 → 4 is not in arr (ignore), 5 → 6 is not in arr, 0 → 1 in arr. So count 1, 2 and 0 (total 3).*

### Thought Process (as if you’re the interviewee)  
Start with a brute-force approach:  
- For every element x in arr, search the entire array for x + 1.
- Count each x for which x + 1 is found.

Brute-force would mean nested loops, checking for each number if x + 1 is in arr, leading to O(n²) time. This is not efficient for longer arrays.

**Optimization:**  
- The main cost is lookup for x + 1.  
- If we can check if x + 1 is present in constant time, we can simply iterate and count.
- Convert arr to a set for O(1) lookups.
- Then, for each element x in arr, check if x + 1 is in the set. If yes, increment the counter.

**Trade-offs:**  
- This uses extra space for the set, but brings time down to O(n).

### Corner cases to consider  
- Empty array → Output should be 0.
- All elements are the same (e.g. `[2,2,2]`), and x + 1 is not present → Output is 0.
- All elements are sequential (e.g. `[3,4,5]`) → Each element except the last has its increment present.
- Single element array → Output is 0.
- Array with negative numbers (if allowed by constraints, which here is not the case since arr[i] ≥ 0).

### Solution

```python
def countElements(arr):
    # Convert to set for O(1) lookup
    s = set(arr)
    count = 0
    # For each element, check if x+1 exists in arr
    for x in arr:
        if x + 1 in s:
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n), where n is the length of arr.  
  - Creating the set costs O(n).
  - Iterating over arr and checking x + 1 in set is another O(n).

- **Space Complexity:**  
  O(n) for storing arr in the set for fast lookup.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could not use extra space?  
  *Hint: Can you do it in-place if the range is small and you can modify the array?*

- What if the array could be extremely large (such as streaming input)?  
  *Hint: Can you process the stream on the fly, possibly using other data structures?*

- How would you handle the case if arr could be sorted first or the range of integers is limited?  
  *Hint: What advantages might sorting or a frequency array provide?*

### Summary
This problem uses the *counting with set lookup* pattern. By utilizing a set, we achieve quick O(1) lookups for existence checks. The approach is a common and practical technique for efficiently answering "is x present in a collection?" queries. This pattern is widely applicable in problems involving quick existence checks and duplicate element counting.


### Flashcard
Convert the array to a set for O(1) lookups to efficiently count elements with x+1 present.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
