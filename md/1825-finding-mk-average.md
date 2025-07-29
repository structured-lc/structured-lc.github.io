### Leetcode 1825 (Hard): Finding MK Average [Practice](https://leetcode.com/problems/finding-mk-average)

### Description  
You are to design a data structure that maintains the last **m** elements from a stream of integers, supporting two operations:
- **addElement(num)**: Add a new integer to the data stream.
- **calculateMKAverage()**: If there are fewer than **m** elements in the stream, return -1. Otherwise, consider only the most recent **m** elements, remove the smallest **k** and the largest **k** elements, and return the average of the remaining elements, rounded down (i.e., take the floor of the division).

Efficient support for both operations is necessary, as both **m** and the number of calls can be large.

### Examples  

**Example 1:**  
Input:  
`MKAverage(3, 1)`  
`addElement(3)`  
`addElement(1)`  
`calculateMKAverage()`  
`addElement(10)`  
`calculateMKAverage()`  
`addElement(5)`  
`addElement(5)`  
`calculateMKAverage()`  
Output:  
`-1`  
`3`  
`5`  
Explanation:  
- After adding [3], then [3,1]: fewer than 3 elements, so output is -1.  
- Add 10: window is [3,1,10]. Remove min (1) and max (10), remaining is [3], so MKAverage = 3.  
- Add 5: window slides to [1,10,5]. Remove min (1) and max (10), remaining is [5], so MKAverage = 5.  
- Add another 5: window slides to [10,5,5]. Remove min (5) and max (10), remaining is [5], so MKAverage = 5.

**Example 2:**  
Input:  
`MKAverage(4, 1)`  
`addElement(4)`  
`addElement(2)`  
`addElement(8)`  
`addElement(6)`  
`calculateMKAverage()`  
Output:  
`5`  
Explanation:  
- The last 4 are [4,2,8,6]. Remove min (2) and max (8), remaining: [4,6]. Their average is floor((4+6)/2) = 5.

**Example 3:**  
Input:  
`MKAverage(8, 2)`  
`addElement(3)`  
`addElement(1)`  
`addElement(12)`  
`addElement(5)`  
`addElement(3)`  
`addElement(4)`  
`addElement(7)`  
`addElement(8)`  
`calculateMKAverage()`  
Output:  
`4`  
Explanation:  
- Stream after 8 elements: [3,1,12,5,3,4,7,8]  
- Remove 2 smallest (1,3) and 2 largest (8,12) → [5,3,4,7]  
- Average is floor((5+3+4+7)/4) = 19//4 = 4

### Thought Process (as if you’re the interviewee)  
The brute-force approach is:
- For each call to calculateMKAverage, get the last **m** elements, sort, remove the smallest **k** and largest **k** elements, compute average.

This works for small **m**, but sorting for each query is too slow: O(m log m) per query, unacceptable when **m** and queries are large.

A better idea is to maintain three multisets/ordered structures:
- One for the smallest **k** elements of the window (**lo**)
- One for the middle **m-2k** elements (**mid**)
- One for the largest **k** elements (**hi**)

When a new element arrives:
- Insert it into the correct segment, possibly displacing another.
- If the window exceeds size **m**, remove the oldest entry, and rebalance among the three sets.
- Maintain **sum_mid** for efficient MKAverage calculation.

Key challenges are:
- Efficient balancing and updates as elements enter/leave the window.
- Maintaining sum_mid and sizes of each part.

The most scalable approach would use custom sorted structures (e.g., Balanced BST or SortedList) or, in Python, a sorted list wrapper, handling insertion/removal by index.

### Corner cases to consider  
- Less than **m** elements → must return -1.
- All numbers in the window are equal.
- **k** = 0 (no extremes removed).
- **k** so large that no numbers remain (**2k ≥ m**; but constraints say this won’t happen).
- Removing values when there are duplicates.
- Handling window slides when the oldest element is a duplicate.

### Solution

```python
from collections import deque
import bisect

class MKAverage:
    def __init__(self, m: int, k: int):
        self.m = m
        self.k = k
        self.window = deque()    # Stores last m elements
        self.sorted = []         # Stores the current window sorted
        self.sum_mid = 0         # Sum of the mid segment (for quick average)

    def addElement(self, num: int) -> None:
        # Add to window and sorted list
        self.window.append(num)
        bisect.insort(self.sorted, num)

        if len(self.window) > self.m:
            oldest = self.window.popleft()
            pos = bisect.bisect_left(self.sorted, oldest)
            self.sorted.pop(pos)

    def calculateMKAverage(self) -> int:
        if len(self.window) < self.m:
            return -1

        # remove k smallest and k largest: use slicing
        left = self.k
        right = self.m - self.k
        total = sum(self.sorted[left:right])
        return total // (self.m - 2 * self.k)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - addElement: O(log m) for insertion and O(log m) for deletion (bisect).
  - calculateMKAverage: O(m) for sum (since sum of a slice).  
    This could be optimized using extra structures for O(1) sum update at the cost of added complexity.
- **Space Complexity:**  
  - O(m) for storing the window and the sorted list.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize the sum calculation to improve calculateMKAverage’s time complexity?  
  *Hint: Can you maintain running sums of each partition, so the sum is available instantly?*

- What if m is very large and you have memory limits?  
  *Hint: Is it possible to stream the result without keeping all elements? What’s the best way to store only what’s needed?*

- How would you handle if elements are allowed to be repeated, and you need to quickly remove the oldest element (knowing its value, not its index)?  
  *Hint: Duplicate-safe multiset structures, possibly with counters or indexes?*

### Summary
This problem follows the **maintain sliding window with efficient order-statistics** pattern, frequently appearing in "rolling median" or "sliding percentile" problems. The key data structure is a balanced multiset or sorted list, supporting efficient in-window insertion, deletion, partitioning, and sum maintenance. The technique generalizes to problems that require order-based statistics or dynamic summary over a rolling window.