### Leetcode 1505 (Hard): Minimum Possible Integer After at Most K Adjacent Swaps On Digits [Practice](https://leetcode.com/problems/minimum-possible-integer-after-at-most-k-adjacent-swaps-on-digits)

### Description  
Given a string `num` representing the digits of a large integer, and an integer k, you are allowed to swap any two *adjacent* digits *at most* k times. Return the minimum integer you can obtain (as a string) after performing at most k adjacent swaps.

### Examples  

**Example 1:**  
Input: `num = "4321", k = 4`  
Output: `1342`  
*Explanation: You can swap as follows: swap 3 & 2 (1), then 2 & 1 (2), swap 4 & 3 (3), then 3 & 1 (4). Final result is 1342.*

**Example 2:**  
Input: `num = "100", k = 1`  
Output: `010`  
*Explanation: Only one adjacent swap is possible (swap 1 & 0). It's okay for output to have leading zeros.*

**Example 3:**  
Input: `num = "36789", k = 1000`  
Output: `36789`  
*Explanation: k exceeds possible number of swaps, so the original is already the smallest.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible swaps, but this exponentially explodes and is infeasible for num length up to 3×10⁴ and k up to 10⁹.
- **Greedy approach:** Always try to bring the smallest possible digit within reach (distance ≤ k) to the current position via adjacent swaps. Each movement of a digit costs swaps equal to the distance from the target position.
- **Efficient tracking:** To efficiently keep track of how many swaps each move costs, use a Binary Indexed Tree (Fenwick Tree) or Segment Tree to handle frequent insertions/removals and prefix sum queries (to count occupied indices).
- Iterate across `num`'s positions; for each, try to place the smallest usable digit, move it to the front, subtract the swaps used, and repeat with the remaining substring and updated k.

### Corner cases to consider  
- k = 0, no swaps allowed
- All digits already sorted
- All digits identical
- Leading zeros allowed in result
- k larger than necessary (no swaps needed)
- num of size 1

### Solution

```python
# Greedy + Fenwick Tree solution
# The function returns the minimum integer string after at most k swaps.

class FenwickTree:
    def __init__(self, n):
        self.n = n
        self.data = [0] * (n+2)
        
    def add(self, i, v):
        # 1-based indexing
        i += 1
        while i <= self.n+1:
            self.data[i] += v
            i += i & -i
    
    def query(self, i):
        # returns the prefix sum [0, i]
        i += 1
        res = 0
        while i > 0:
            res += self.data[i]
            i -= i & -i
        return res

from collections import deque

def minInteger(num: str, k: int) -> str:
    n = len(num)
    pos = [deque() for _ in range(10)]
    for i, ch in enumerate(num):
        pos[int(ch)].append(i)
    bit = FenwickTree(n)
    result = []
    for _ in range(n):
        # Try to put the smallest digit at the current position
        for d in range(10):
            if pos[d]:
                idx = pos[d][0]
                # Swaps needed = idx - number of used indices before idx
                swaps = idx - bit.query(idx-1)
                if swaps <= k:
                    k -= swaps
                    result.append(str(d))
                    bit.add(idx, 1)
                    pos[d].popleft()
                    break
    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is num's length. For each digit placement (n times), we check 10 digits and use Fenwick Tree for O(log n) updates/queries.
- **Space Complexity:** O(n). We store digit positions and a Fenwick tree of size n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if swaps can be made anywhere, not just adjacent?  
  *Hint: You could simply sort the digits if there’s no adjacency restriction.*

- Can you reconstruct the actual sequence of swaps used for the solution?  
  *Hint: Keep track of the indices moved, or reconstruct moves by simulating the swaps.*

- What if digits are given as a linked list, not an array or string?  
  *Hint: You may still apply a similar logic, but might need a different data structure for efficient index movements.*

### Summary
This problem is a good illustration of the **greedy pattern** paired with an efficient data structure (Fenwick Tree) to keep certain queries fast. The greedy decision picks the smallest digit available within reach and moves it to its ideal place, gradually building up the minimal number.

### Tags
String(#string), Greedy(#greedy), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree)

### Similar Problems
