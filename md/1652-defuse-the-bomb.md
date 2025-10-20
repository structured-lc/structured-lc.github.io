### Leetcode 1652 (Easy): Defuse the Bomb [Practice](https://leetcode.com/problems/defuse-the-bomb)

### Description  
Given a circular array `code` and an integer `k`, you need to create a new array where each element at index i is replaced by:
- the sum of the next k elements, if k > 0
- the sum of the previous k elements, if k < 0
- 0, if k == 0
The array is **circular**, so wrap around as needed.

### Examples  

**Example 1:**  
Input: `code = [5,7,1,4]`, `k = 3`  
Output: `[12,10,16,13]`  
*Explanation: For i = 0, sum next 3 -> 7 + 1 + 4 = 12; for i = 1, sum next 3 -> 1 + 4 + 5 = 10; and so on.*

**Example 2:**  
Input: `code = [1,2,3,4]`, `k = 0`  
Output: `[0,0,0,0]`  
*Explanation: Every element is replaced by 0 since k = 0.*

**Example 3:**  
Input: `code = [2,4,9,3]`, `k = -2`  
Output: `[12,5,6,13]`  
*Explanation: For i = 0, sum previous 2 -> 3 + 9 = 12; for i = 1, sum previous 2 -> 2 + 3 = 5; and so on.*


### Thought Process (as if you’re the interviewee)  
- The circular aspect means index arithmetic must wrap around.
- For each element, sum k next or previous values, skipping self.
- For k = 0, output 0 directly.
- Brute-force works for small n, optimize with prefix sums for large n.


### Corner cases to consider  
- k = 0 (output all zeros)
- k negative (sum previous k)
- k > n or k < -n
- code length = 1


### Solution

```python
from typing import List

def decrypt(code: List[int], k: int) -> List[int]:
    n = len(code)
    if k == 0:
        return [0]*n
    res = [0]*n
    for i in range(n):
        total = 0
        if k > 0:
            for j in range(1, k+1):
                total += code[(i + j) % n]
        else:
            for j in range(1, -k+1):
                total += code[(i - j) % n]
        res[i] = total
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n*|k|), for each element summing up |k| neighbors.
- **Space Complexity:** O(n), result array.


### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize for large n and large k?  
  *Hint: Precompute prefix sums and use sliding window.*

- What if the code array is extremely large but k is always small?  
  *Hint: Brute force is fine as |k| small keeps work per element small.*

- How would you do this in-place (O(1) extra space)?  
  *Hint: Careful, as you'll overwrite elements you still need. Consider extra pass or storing needed sums in advance.*

### Summary
This solution demonstrates handling of circular arrays and sliding window sums, a common coding pattern for ring-buffer or cyclic data manipulations.


### Flashcard
For each element, sum the next k (or previous k) values in the circular array, handling wrap-around with modulo arithmetic.

### Tags
Array(#array), Sliding Window(#sliding-window)

### Similar Problems
- Circular Sentence(circular-sentence) (Easy)
- Shortest Distance to Target String in a Circular Array(shortest-distance-to-target-string-in-a-circular-array) (Easy)
- Take K of Each Character From Left and Right(take-k-of-each-character-from-left-and-right) (Medium)