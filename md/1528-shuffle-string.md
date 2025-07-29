### Leetcode 1528 (Easy): Shuffle String [Practice](https://leetcode.com/problems/shuffle-string)

### Description  
Given a string **s** and an integer array **indices** of the same length, shuffle the characters in **s** so that the character at the iᵗʰ position goes to **indices[i]** in the new string. Return the shuffled string.

### Examples  

**Example 1:**  
Input: `s = "codeleet", indices = [4,5,6,7,0,2,1,3]`  
Output: `"leetcode"`  
*Explanation: 'c' goes to position 4, 'o' to 5, 'd' to 6, 'e' to 7, 'l' to 0, 'e' to 2, 'e' to 1, and 't' to 3. The result is "leetcode".*

**Example 2:**  
Input: `s = "abc", indices = [1,2,0]`  
Output: `"cab"`  
*Explanation: 'a' moves to index 1, 'b' to 2, 'c' to 0. The shuffled string is 'cab'.*

**Example 3:**  
Input: `s = "aiohn", indices = [3,1,4,2,0]`  
Output: `"nihao"`  
*Explanation: 'a'→3, 'i'→1, 'o'→4, 'h'→2, 'n'→0; so result is 'nihao'.*

### Thought Process (as if you’re the interviewee)  
First, I need to move each character of the string **s** to a position specified by **indices**.  
A straightforward approach is to create an array to represent the result. For each i from 0 to n-1, assign **s[i]** to **result[indices[i]]**.  
Once all characters are placed, join the result array to form the output string.

- Brute-force would be repeatedly searching for correct positions, but the above "placement" method is more efficient—single pass, direct mapping.
- No complex data structures are needed.  
- The final approach is chosen for its simplicity, O(n) time, and O(n) space.

### Corner cases to consider  
- Input string or indices is empty.
- All indices are in order (no change needed).
- Indices are reversed.
- s length is 1.
- indices has duplicate elements (should never happen according to constraints).

### Solution

```python
def restoreString(s, indices):
    # Create a list to hold the shuffled characters
    res = [''] * len(s)
    # Place each character in the its new position
    for i in range(len(s)):
        res[indices[i]] = s[i]
    # Join the list into a string and return
    return ''.join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string. We iterate through s once to assign each character to its correct place.
- **Space Complexity:** O(n), as we use an auxiliary list of size equal to the input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the indices array contains repeated elements?
  *Hint: Think about validation of input—should we check for invalid inputs or throw an exception?*

- Can you do it in-place, without using an extra array?
  *Hint: Consider the properties of index permutations and possible in-place swap cycles.*

- What if the string is very large and memory usage is critical?
  *Hint: Could you process the string as a generator or stream, or swap in-place with less extra space?*

### Summary
This problem is straightforward array element placement using index mapping, a very common coding pattern. It leverages O(n) space to achieve O(n) time. Similar patterns occur in:
- Reordering arrays or linked lists given a permutation.
- Mapping values or objects to new positions based on keys.
The clean, direct index assignment technique is very useful in array and string manipulation questions.