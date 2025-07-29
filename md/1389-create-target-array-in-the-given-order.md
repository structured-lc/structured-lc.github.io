### Leetcode 1389 (Easy): Create Target Array in the Given Order [Practice](https://leetcode.com/problems/create-target-array-in-the-given-order)

### Description  
Given two lists, `nums` and `index`, insert each nums[i] at index[i] in a new array, shifting other elements as needed. Return the final array after all insertions.

### Examples  
**Example 1:**  
Input: `nums=[0,1,2,3,4]`, `index=[0,1,2,2,1]`  
Output: `[0,4,1,3,2]`  
*Explanation: Stepwise insertion - 0 at 0: ; 1 at 1: [0,1]; 2 at 2: [0,1,2]; 3 at 2: [0,1,3,2]; 4 at 1: [0,4,1,3,2]*

**Example 2:**  
Input: `nums=[1,2,3,4,0]`, `index=[0,1,2,3,0]`  
Output: `[0,1,2,3,4]`  
*Explanation: Follows stepwise insertions; always insert nums[i] at index[i].*

**Example 3:**  
Input: `nums=[1]`, `index=`  
Output: `[1]`  
*Explanation: Only one insertion.*

### Thought Process (as if you’re the interviewee)  
Just follow the problem's instructions step-by-step: start with empty list, iterate through nums and insert each number at the given position. Python's list insert does this natively, but in an interview, mention that list insertion is O(n) per operation (worst-case), and thus O(n²) in total for n insertions.

### Corner cases to consider  
- All indices are 0 (insertions at start)
- Indices are in increasing sequential order (append at end)
- Only one element
- Duplicates in nums

### Solution

```python
def createTargetArray(nums, index):
    target = []
    for n, i in zip(nums, index):
        target.insert(i, n)
    return target
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n²) in worst case (due to shifting on insert)
- **Space Complexity:** O(n) for final array

### Potential follow-up questions (as if you’re the interviewer)  
- Can you achieve better than O(n²) time complexity?
  *Hint: With batch processing or advanced data structures (segment tree / BIT)*

- What if you had to do in-place in a fixed-size array?
  *Hint: Might need multiple passes, shifting manually*

- How does your answer change if duplicates in index are allowed?
  *Hint: Problem constraints disallow, but clarify behavior*

### Summary
Direct simulation problem, follows the instructions deterministically. The pattern is stepwise array manipulation using index-based insertions, often seen in constructive problems and sometimes in data structure challenges.