### Leetcode 3369 (Hard): Design an Array Statistics Tracker  [Practice](https://leetcode.com/problems/design-an-array-statistics-tracker)

### Description  
Design a `StatisticsTracker` class to efficiently support a dynamically-changing stream of integers. You must be able to:
- Add a number.
- Remove the very first number that was added (FIFO queue logic).
- Get the current **mean** (sum divided by count, rounded down).
- Get the **median** (middle value in the sorted array; if even elements, return the larger of the two middles).
- Get the **mode** (most frequent element; if a tie, return the smallest value).

All operations should be efficient, considering large input streams and frequent queries.

### Examples  

**Example 1:**  
Input:  
addNumber(5)  
addNumber(3)  
addNumber(5)  
getMode()  
Output:  
5  
*Explanation: 5 appears twice (more than any other).*

**Example 2:**  
Input:  
addNumber(1)  
addNumber(2)  
addNumber(3)  
removeFirstAddedNumber()  
getMean()  
Output:  
2  
*Explanation: 1 is removed. Remaining: [2,3]. Mean = (2+3)//2 = 2.*

**Example 3:**  
Input:  
addNumber(1)  
addNumber(2)  
addNumber(3)  
getMedian()  
Output:  
2  
*Explanation: Sorted: [1,2,3], median is 2 (middle value).*

### Thought Process (as if you’re the interviewee)  
First, consider brute-force:  
- Keep a list; add/remove is O(1), but queries (mean, median, mode) would require O(n) traversal or sorting each time.

Optimize:  
- To remove first-added efficiently and keep query speed, use:
  - A queue/list for insertion/removal order.
  - Hashmaps/Counters for fast frequency counts (mode).
  - A running sum for mean.
  - For median, maintain two heaps (max-heap for lower half, min-heap for upper half), which allows quick median calculation and supports removal with some extra work.

Trade-offs:  
- Heap-based median: tricky to remove arbitrary elements (not standard heap support), but track popped elements with a delayed deletion map to efficiently ignore invalid heap roots.
- Mode: use a Counter plus a reverse map `{freq: set of numbers}` to track current max frequency efficiently.

Choosing the final approach:  
- Heaps + Counter + queue is robust. All operations can be O(log n) or better, but code complexity is moderate.

### Corner cases to consider  
- Removing from an empty tracker (should be safe or raise error).
- Requesting stats from empty collection.
- All numbers are the same (test mode).
- Multiple numbers with same max frequency (mode tie).
- Even/odd number of elements (median, including "larger middle").
- Handling overflow for sum (practically large numbers).

### Solution

```python
import heapq
from collections import deque, Counter, defaultdict

class StatisticsTracker:
    def __init__(self):
        # Maintain insertion order for removals
        self.queue = deque()
        # For mean
        self.total = 0
        self.count = 0
        # For mode
        self.freq = Counter()
        self.freq_to_vals = defaultdict(set)
        self.max_freq = 0
        # For median: two heaps and delayed deletions
        self.low = []  # max-heap (invert values)
        self.high = [] # min-heap
        self.delayed = Counter()
    
    def _balance_heaps(self):
        # Maintain len(self.low) == len(self.high) or +1 (low can have 1 more)
        while len(self.low) > len(self.high) + 1:
            val = -heapq.heappop(self.low)
            heapq.heappush(self.high, val)
        while len(self.low) < len(self.high):
            val = heapq.heappop(self.high)
            heapq.heappush(self.low, -val)

    def _prune(self, heap):
        # Remove elements lazily marked as deleted
        while heap:
            num = -heap[0] if heap is self.low else heap[0]
            if self.delayed[num] > 0:
                heapq.heappop(heap)
                self.delayed[num] -= 1
            else:
                break

    def addNumber(self, number: int) -> None:
        self.queue.append(number)
        self.total += number
        self.count += 1

        # Mode logic
        prev_freq = self.freq[number]
        self.freq[number] += 1
        curr_freq = self.freq[number]
        if prev_freq > 0:
            self.freq_to_vals[prev_freq].discard(number)
            if not self.freq_to_vals[prev_freq]:
                del self.freq_to_vals[prev_freq]
        self.freq_to_vals[curr_freq].add(number)
        self.max_freq = max(self.max_freq, curr_freq)

        # Median logic: push to heaps
        if not self.low or number <= -self.low[0]:
            heapq.heappush(self.low, -number)
        else:
            heapq.heappush(self.high, number)
        self._balance_heaps()

    def removeFirstAddedNumber(self) -> None:
        if not self.queue:
            return
        number = self.queue.popleft()
        self.total -= number
        self.count -= 1

        # Mode logic
        freq_here = self.freq[number]
        self.freq[number] -= 1
        self.freq_to_vals[freq_here].discard(number)
        if not self.freq_to_vals[freq_here]:
            del self.freq_to_vals[freq_here]
        if self.freq[number] > 0:
            self.freq_to_vals[self.freq[number]].add(number)
        else:
            del self.freq[number]
        if not self.freq_to_vals.get(self.max_freq):
            self.max_freq -= 1

        # Median logic: mark as to-be-removed (lazy, prune when extracting)
        self.delayed[number] += 1
        # Clean roots
        self._prune(self.low)
        self._prune(self.high)
        self._balance_heaps()

    def getMean(self) -> int:
        if self.count == 0: return 0
        return self.total // self.count

    def getMedian(self) -> int:
        if self.count == 0: return 0
        self._prune(self.low)
        self._prune(self.high)
        # If odd, take from low; if even, per problem, take larger of two
        if self.count % 2 == 1:
            return -self.low[0]
        else:
            return max(-self.low[0], self.high[0])

    def getMode(self) -> int:
        if self.count == 0: return 0
        # Return smallest number with highest frequency
        return min(self.freq_to_vals[self.max_freq])
```

### Time and Space complexity Analysis  

- **Time Complexity:**
  - `addNumber`: O(log n) (heap push)
  - `removeFirstAddedNumber`: O(log n) (heap/queue pop and pruning)
  - `getMean`, `getMedian`, `getMode`: O(1) (pruning at root is amortized, map/heap access)
- **Space Complexity:**
  - O(n) for all data structures: queue, heaps, counters, delayed deletions.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to remove *any* element, not just the first?
  *Hint: Add mapping from value to list of indices or heap positions, but increase complexity.*

- Can we support duplicates and custom tie-breaking for mode?
  *Hint: Replace `min()` logic with a list of current modes, or change mode tracking.*

- Suppose the numbers are floats, not ints: how does it change the design?
  *Hint: Heapq and division must be adapted, and equality/frequency handling needs care.*

### Summary
This problem combines several advanced data structures: double-ended queue for order, two heaps for median-finding, counters and reverse mapping for efficient mode, and delayed-deletion marks for supporting removal from heaps. These patterns (e.g., two heaps for median, counter+set for mode) are common in design of streaming statistics, and can be applied in online median, sliding window, and other stream-processing systems.

### Tags
Hash Table(#hash-table), Binary Search(#binary-search), Design(#design), Queue(#queue), Heap (Priority Queue)(#heap-priority-queue), Data Stream(#data-stream), Ordered Set(#ordered-set)

### Similar Problems
