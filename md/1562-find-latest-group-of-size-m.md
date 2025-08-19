### Leetcode 1562 (Medium): Find Latest Group of Size M [Practice](https://leetcode.com/problems/find-latest-group-of-size-m)

### Description  
Given an array `arr` of length `n`, which represents a permutation of numbers from 1 to n. Each position in an initially zeroed binary string of length n turns to 1 in the order given by arr[i]. After each step, groups of consecutive 1s may be formed. A group of length m is a sequence of m consecutive 1s. Return the latest step at which there existed a group of length exactly m. If no such group exists, return -1.

### Examples  

**Example 1:**  
Input: `arr = [3,5,1,2,4], m = 1`  
Output: `4`  
*Explanation: Steps: [0,0,0,0,0] → [0,0,1,0,0] → [0,0,1,0,1] → [1,0,1,0,1] → [1,1,1,0,1] → [1,1,1,1,1]. There are groups of size 1 at step 4.*

**Example 2:**  
Input: `arr = [3,1,5,4,2], m = 2`  
Output: `-1`  
*Explanation: No step yields a group of size exactly 2.*

**Example 3:**  
Input: `arr = [1], m = 1`  
Output: `1`  
*Explanation: At first and only step, a group of size 1 exists.*


### Thought Process (as if you’re the interviewee)  
For each step as arr[i] fills in, we want to efficiently track intervals of consecutive 1s, and know when there's at least one group of size m. We need quick union and split of groups, as well as knowing group lengths. We can use a length array to record the length of group at endpoints, and a count tracker for group sizes of m. At every addition, update endpoints and the count — if after this step, a group of size m exists, record this as possible answer.

Brute-force would be to simulate after every step, but that's O(n^2). Optimized approach tracks boundaries and counts in O(n) per step.


### Corner cases to consider  
- m = 1 (single element groups)
- arr with size 1
- No group of size m ever forms (return -1)
- Group of size m exists at the last possible step


### Solution

```python
def findLatestStep(arr, m):
    n = len(arr)
    if m == n: return n
    length = [0] * (n + 2)  # Group sizes per endpoint
    count = [0] * (n + 2)   # Counts of groups of given size
    res = -1
    for step, i in enumerate(arr):
        left = length[i - 1]
        right = length[i + 1]
        total = left + right + 1
        length[i - left] = length[i + right] = total
        count[left] -= (left > 0)
        count[right] -= (right > 0)
        count[total] += 1
        if count[m]:
            res = step + 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as each update of endpoints is O(1), and there's one pass
- **Space Complexity:** O(n), for tracking intervals


### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if you needed all step numbers where at least one group of m exists?
  *Hint: Keep a list of such steps instead of latest.*

- Can you optimize for very large n?
  *Hint: Try to use range or segment data structures.*

- What if filling operations are not in permutation order?
  *Hint: Simulation still works, but make sure boundaries are managed correctly.*

### Summary
This is a greedy union-find interval simulation, often used to track dynamic groupings. The length array at endpoints and counts for group-sizes allow O(1) updates, and is a general pattern for similar interval merge/split challenges.

### Tags
Array(#array), Hash Table(#hash-table), Binary Search(#binary-search), Simulation(#simulation)

### Similar Problems
