### Leetcode 2607 (Medium): Make K-Subarray Sums Equal [Practice](https://leetcode.com/problems/make-k-subarray-sums-equal)

### Description  
You are given an integer array `arr` and an integer `k`. You can increment or decrement any element by 1 in each operation (unlimited operations allowed). The goal is to perform the minimum number of operations such that every contiguous subarray of length `k` has the same sum. Return the minimum number of operations needed.

### Examples  

**Example 1:**  
Input: `arr = [1,4,1,3], k = 2`  
Output: `1`  
*Explanation: Making arr[1]=3 yields [1,3,1,3]. All subarrays of length 2: [1,3], [3,1], [1,3] have sum 4. Only 1 operation needed.*

**Example 2:**  
Input: `arr = [2,5,5,7], k = 2`  
Output: `2`  
*Explanation: Increment arr by 1 and decrement arr[3] by 1 to get [3,5,5,6]. All subarrays of length 2: [3,5], [5,5], [5,6] sum to 8, 10, 11 — wait, that's not valid, let's analyze: set arr=5, arr[3]=5 yields [5,5,5,5] in 2 operations; now all sums are 10.*

**Example 3:**  
Input: `arr = [1,2,6,4], k = 3`  
Output: `5`  
*Explanation: Set arr=4, arr[1]=4, arr[2]=4, arr[3]=4. All length-3 subarrays ([4,4,4], [4,4,4]) sum to 12. Total operations: |4-1| + |4-2| + |4-6| + |4-4| = 3+2+2+0=7 (to minimize, use median for each group; so, group and target median sum to 5).*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:** Try all targets for each window, simulate making the sum equal, and take the min total operations. This is too slow for large arrays.
- **Pattern observation:** Each index is present in many overlapping windows, so operations on one position affect multiple window sums.  
- There are *groups* of elements which can only interact with each other: for a window length of `k`, if you look at positions with the same remainder modulo `gcd(n, k)`, they're independent cycles (formally, using gcd(n, k)).
- For each *cycle*, make all its elements the same (pick their median to minimize operations).
- Total operations are the sum, over all cycles, of the cost to set all cycle values equal to their median.
- **Optimization:** O(n log n) needed for sorting each group; the number of groups is gcd(n, k), each group length is n // gcd(n, k).
- This approach is optimal and much faster than brute-force.

### Corner cases to consider  
- n = 1 (array of one element, any k).
- k = n (cycles reduce to just one, so the whole array is one group).
- k = 1 (every element alone, so no operations needed).
- All elements already equal.
- k and n not coprime: cycles split the array.
- Large arrays with repeated or wildly different numbers.
- Negative numbers.

### Solution

```python
from typing import List
from math import gcd

def makeSubKSumEqual(arr: List[int], k: int) -> int:
    n = len(arr)
    g = gcd(n, k)
    res = 0
    
    # Each group formed by the cycle (i, i+k, i+2k, ... mod n) is independent
    for i in range(g):
        group = []
        j = i
        while True:
            group.append(arr[j])
            j = (j + k) % n
            if j == i:
                break
        group.sort()
        # Median minimizes sum of abs differences
        median = group[len(group) // 2]
        res += sum(abs(x - median) for x in group)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log (n/g)), where n = len(arr), g = gcd(n, k). Sorting each of the g groups whose total length over all groups is n.
- **Space Complexity:** O(n) for storing partitioned groups.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could only increment (not decrement) elements?
  *Hint: Think about converting all to the maximum, not the median.*

- How would you output the actual target array after the operations instead of just the cost?
  *Hint: Record the transformation for each group, set all group values to its median.*

- What changes if you could only operate on windows (not single elements)?
  *Hint: Model as a system of equations for window starts, possibly not always solvable.*

### Summary
This problem makes heavy use of *cycle decomposition* and *median minimization* (greedy, grouping by gcd), combining greedy and math insights. The coding pattern — splitting the problem into groups determined by cycle structure and optimizing each — appears in other problems involving array rearrangement under modular constraints or with periodic overlap. Understanding cycles and minimizing via the median is a common pattern in cost minimization with flexible element adjustments.

### Tags
Array(#array), Math(#math), Greedy(#greedy), Sorting(#sorting), Number Theory(#number-theory)

### Similar Problems
- Rotate Array(rotate-array) (Medium)